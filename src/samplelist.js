import React from 'react';

let styles = {
    table: {
        border: 'none'
    },
    entry: {
        userSelect: 'none',
        padding: '0px 4px',
        borderRadius: 2,
        border: '1px solid #888'
    }
};

class Sample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    
    onFocus() {
        console.log(`focus: ${this.props.sample.key}`);
    }
    
    render() {
        return <td className="sample" style={styles.entry} tabIndex="1" onFocus={this.onFocus.bind(this)}>
            {String.fromCharCode(this.props.sample.key)}: {this.props.sample.name}
        </td>;
    }
}

export default class SampleList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let samples = this.props.samples.map(sample =>
            <tr>
                <Sample sample={sample} />
            </tr>
        );
        return <table style={styles.table}>
                <tbody>
                    {samples}
                </tbody>
            </table>;
    }
}
