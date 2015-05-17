import React from 'react';

export default class SampleView {
    componentDidMount() {
        this.redraw();
    }
    
    componentDidUpdate() {
        this.redraw();
    }
    
    redraw() {
        let canvas = this.refs.canvas.getDOMNode();
        canvas.width = canvas.width;
        let c = canvas.getContext('2d');
        let s = this.props.sample;
        if(s && s.rendered) {
            c.drawImage(s.rendered.canvas, 0, 0);
        }
    }
    
    render() {
        return <canvas width="640" height="64" ref="canvas" />;
    }
}