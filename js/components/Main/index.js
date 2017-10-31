import React, { Component } from 'react';
import { number } from 'prop-types';
import API from '../../API';
import LinkStore from '../../stores/Link';

const _getAppState = () => ({ links: LinkStore.getAll() });

export default class Main extends Component {
    // static propTypes = {
    //     limit: number.isRequired,
    // };

    constructor(props) {
        super(props);

        this.state = _getAppState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        API.fetchLinks('{ links {_id, title, url} }');
        LinkStore.on('change', this.onChange);
    }

    componentWillUnmount() {
        LinkStore.removeListener('change', this.onChange);
    }
    
    onChange() {
        this.setState(_getAppState());
    }

    render() {
        const content = this.state.links.splice(0, this.props.limit).map(({ _id, url, title }) => (
            <li key={_id}>
                <a href={url}>{title}</a>
            </li>
        ));

        return (
            <div>
                <h3>Links</h3>
                <ul>{content} </ul>
            </div>
        );
    }
}
