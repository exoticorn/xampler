import React from 'react';
import S from './mergestyles';

let styles = {
    table: {
        border: 'none'
    },
    entry: {
        userSelect: 'none',
        padding: '0px 4px',
        borderRadius: 2,
        border: '1px solid #888'
    },
    selected: {
        backgroundColor: '#f00'
    }
};

class Sample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    
    onFocus() {
        this.props.onSelect(this.props.sample.key);
    }
    
    render() {
        return <td className="sample"
                style={S(styles.entry, this.props.selected && styles.selected)}
                tabIndex="1" onFocus={this.onFocus.bind(this)}>
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
            <tr key={sample.key}>
                <Sample sample={sample} selected={this.props.selected === sample.key} onSelect={this.props.onSelect}/>
            </tr>
        );
        return <table style={styles.table}>
                <tbody>
                    {samples}
                </tbody>
            </table>;
    }
}
