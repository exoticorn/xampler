import async from './async';
import getUserMedia from './getusermedia';

export default class Recorder {
    constructor(context) {
        this._context = context;
    }
    
    startStop(sample) {
        if(this.recording === 'pending') {
            return;
        }
        if(!this.recording) {
            this.recording = 'pending';
            async.go(function*() {
                this.sample = sample;
                this.stream = yield getUserMedia({audio: { mandatory: { echoCancellation: false } } });
                this.recording = this._context.recorder.startRecording(this.stream.getAudioTracks()[0]);
                this.startTime = Date.now();
                this._context.onStateChanged();
            }, this);
        } else {
            let recording = this.recording;
            let stream = this.stream;
            let sample = this.sample;
            this.recording = 'pending';
            this._context.onStateChanged();
            async.go(function*() {
                sample.data = yield recording.stop();
                sample.name = 'Recording ' + new Date().toLocaleTimeString();
                stream.getAudioTracks()[0].stop();
                this.recording = undefined;
            }, this);
        }
    }
}