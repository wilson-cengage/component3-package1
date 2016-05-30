import React from 'react';
import _ from 'lodash';

import './style.css';

export default class DropDown extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            "implementation": null
        }
    }

    componentDidMount() {
        System.import('./implementation').then(implementation => {
            this.setState({
                "implementation": implementation.default
            });
        });
    }

    render() {
        const value = _.take(['3-package1', 2, 3])[0];
        let implementationContent = null;
        if (this.state.implementation != null) {
            implementationContent = <this.state.implementation/>;
        }
        return (<div>
            <div className="dropdown header">Component {value}</div>
            {implementationContent}
        </div>);
    }
}