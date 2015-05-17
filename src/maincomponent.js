import React from 'react';
import SampleList from './samplelist';
import SongData from './songdata';
import Recorder from './recorder';
import SampleView from './sampleview';

export default class MainControl extends React.Component {
    constructor(props) {
        super(props);
        props.context.onStateChanged = this.forceUpdate.bind(this);
        this.state = {
            songData: new SongData(props.context),
            recorder: new Recorder(props.context),
            selected: 0
        };
    }
    
    componentDidMount() {
        document.addEventListener('keydown', this.onKeyDown.bind(this));
    }
    
    onSelectSample(key) {
        this.setState({ selected: key - 65 });
    }
    
    onKeyDown(e) {
        if(e.ctrlKey || e.altKey) {
            return;
        }
        if(e.keyCode === 32) {
            e.preventDefault();
            this.state.recorder.startStop(this.state.songData.samples[this.state.selected]);
        } else if(e.keyCode >= 65 && e.keyCode <= 65+26) {
            e.preventDefault();
            let s = this.state.songData.samples[e.keyCode - 65];
            if(s.buffer) {
                let a = this.props.context.audio;
                let n = a.createBufferSource();
                n.buffer = s.buffer;
                n.connect(a.destination);
                n.start();
            }
        }
    }
    
    render() {
        return <div>
            <SampleView sample={this.state.songData.samples[this.state.selected]} />
            <SampleList samples={this.state.songData.samples}
                        selected={this.state.songData.samples[this.state.selected].key}
                        onSelect={this.onSelectSample.bind(this)}/>
        </div>;
    }
}