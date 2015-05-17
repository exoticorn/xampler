import React from 'react';
import VorbisRecorder from './vorbisrecorder';
import async from './async';
import MainComponent from './maincomponent';

async.go(function*() {
    let context = {
        recorder: yield new VorbisRecorder(),
        audio: new AudioContext()
    };
    
    React.render(<MainComponent context={context}/>,
        document.getElementById('container'));

    /*
    let stream = yield getUserMedia({audio: { mandatory: { echoCancellation: false } } });
    let recording = recorder.startRecording(stream.getAudioTracks()[0]);
    yield async.timeout(5000);
    let data = yield recording.stop();
    stream.getAudioTracks()[0].stop();

    let buffer = yield new Promise(resolve => audio.decodeAudioData(data, resolve));
    let source = audio.createBufferSource();
    source.buffer = buffer;
    source.connect(audio.destination);
    source.start();
    console.log(data.byteLength);
    */
});

