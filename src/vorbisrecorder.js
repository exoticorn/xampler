class VorbisRecorderImpl {
    constructor(vorbis) {
        this._nextId = 1;
        this._instances = {};
        this._vorbis = vorbis;
        vorbis.addEventListener('message', event => {
            if(typeof event.data === 'object') {
                let response = event.data;
                let inst = this._instances[response.id];
                if(inst) {
                    inst.resolve(response.data);
                    this._instances[response.id] = undefined;
                }
            } else {
                console.log(event.data);
            }
        });
    }

    startRecording(track, channelConfig, quality) {
        let id = this._nextId++;
        if(channelConfig === undefined) {
            channelConfig = VorbisRecorder.MONO;
        }
        let numChannels = channelConfig === VorbisRecorder.STEREO ? 2 : 1;
        this._vorbis.postMessage({cmd: 'startRecording', id: id, track: track, numChannels: numChannels, sourceChannel: channelConfig, quality: quality});
        let inst = {
            stop: () => {
                this._vorbis.postMessage({cmd: 'stopRecording', id: id});
                return inst.data;
            }
        };
        inst.data = new Promise(function(resolve, reject) {
            inst.resolve = resolve;
            inst.reject = reject;
        });
        this._instances[id] = inst;
        return inst;
    }
    startEncoding(channelConfig, quality) {
        let id = nextId++;
        if(channelConfig === undefined) {
            channelConfig = VorbisRecorder.MONO;
        }
        let numChannels = channelConfig === VorbisRecorder.STEREO ? 2 : 1;
        this._vorbis.postMessage({cmd: 'startEncoding', id: id, numChannels: numChannels, sourceChannel: channelConfig, quality: quality});
        let inst = {
            encodeData: (data, numChannels) => {
                this._vorbis.postMessage({cmd: 'encodeData', id: id, data: data.buffer ? data.buffer : data, numChannels: numChannels});
            },
            stop: () => {
                this._vorbis.postMessage({cmd: 'stopEncoding', id: id});
                return inst.data;
            }
        };
        inst.data = new Promise(function(resolve, reject) {
            inst.resolve = resolve;
            inst.reject = reject;
        });
        instances[id] = inst;
        return inst;
    }
};

export default function VorbisRecorder() {
    return new Promise(function(resolve, reject) {
        let vorbis = document.createElement('embed');
        vorbis.addEventListener('load', function() {
            console.log('Vorbis encoder loaded');
            resolve(new VorbisRecorderImpl(vorbis));
        });
        vorbis.setAttribute('width', '0');
        vorbis.setAttribute('height', '0');
        vorbis.setAttribute('src', 'vorbis.nmf');
        vorbis.setAttribute('type', 'application/x-pnacl');
        vorbis.setAttribute('style', 'position: fixed');
        document.body.appendChild(vorbis);
    });
}

VorbisRecorder.STEREO = -2;
VorbisRecorder.MONO = -1;
VorbisRecorder.MONO_LEFT = 0;
VorbisRecorder.MONO_RIGHT = 1;
