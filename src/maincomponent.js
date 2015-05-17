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
            recorder: new Recorder(props.context)
        };
    }
    
    componentDidMount() {
        document.addEventListener('keydown', this.onKeyDown.bind(this));
    }
    
    onKeyDown(e) {
        if(e.keyCode === 32) {
            e.preventDefault();
            this.state.recorder.startStop(this.state.songData.samples[0]);
        }
    }
    
    render() {
        return <div>
            <SampleView sample={this.state.songData.samples[0]} />
            <SampleList samples={this.state.songData.samples} />
        </div>;
    }
}