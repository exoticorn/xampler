import React from 'react';

let styles = {
    table: {
        border: 'none'
    },
    entry: {
        padding: '0px 4px',
        borderRadius: 2,
        border: '1px solid #888'
    }
};

export default class SampleList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let samples = this.props.samples.map(sample =>
            <tr>
                <td style={styles.entry} tabIndex="1">
                    {sample}
                </td>
            </tr>
        );
        return <table style={styles.table}>
                <tbody>
                    {samples}
                </tbody>
            </table>;
    }
}
