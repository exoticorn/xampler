import async from './async';
import RenderedSample from './renderedsample';

class Sample {
    constructor(context, key) {
        this._context = context;
        this.key = key;
    }
    
    get name() {
        return this._name === undefined ? '<empty>' : this._name;
    }
    set name(n) {
        this._name = n;
    }
    
    set data(d) {
        this._data = d;
        async.go(function*() {
            this._buffer = yield new Promise(resolve => this._context.audio.decodeAudioData(d, resolve));
            this.rendered = new RenderedSample(this._buffer);
            this._context.onStateChanged();
        }, this);
    }
    get buffer() {
        return this._buffer;
    }
}

function defaultSamples(context) {
    let samples = [];
    for(let i = 0; i < 26; ++i) {
        samples.push(new Sample(context, 65 + i));
    }
    return samples;
}

export default class SongData {
    constructor(context, samples = defaultSamples(context)) {
        this._context = context;
        this.samples = samples;
    }
}