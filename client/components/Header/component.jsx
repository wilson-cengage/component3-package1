import React from 'react';
import _ from 'lodash';

import './style.css';

export default class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            "chunkedComponent": null
        }
    }

    componentDidMount() {
        System.import('./chunkedComponent').then(chunk => {
            this.setState({
                "chunkComponent": chunk.default
            });
        });
    }

    render() {
        const value = _.take(['2a', 2, 3])[0];
        let chunkContent = null;
        if (this.state.chunkComponent != null) {
            chunkContent = <this.state.chunkComponent/>;
        }
        return (<span className="header">Component {value}  - cas-4ltr + {chunkContent}</span>);
    }
}