import React, { Component } from 'react';
import Relay, { createContainer, QL } from 'react-relay/classic';
import { debounce } from 'lodash';

import Link from '../Link';
import CreateLinkMutation from '../../mutations/CreateLinkMutation';

class Main extends Component {
    constructor(props) {
        super(props);

        this.handleSearch = debounce(this.handleSearch, 300);
    }

    state = {
        title: '',
        url: '',
    };

    handleSearch = event => {
        event.persist();
        const query = event.target.value;
        this.props.relay.setVariables({ query });
    };

    handleTitleChange = ({ target: { value } }) =>
        this.setState(() => ({
            title: value,
        }));

    handleUrlChange = ({ target: { value } }) => this.setState(() => ({ url: value }));

    handleSubmit = e => {
        e.preventDefault();
        const { title, url } = this.state;

        if (!title || !url) {
            return;
        }

        Relay.Store.applyUpdate(
            new CreateLinkMutation({
                title,
                url,
                store: this.props.store,
            }),
        );

        this.setState(() => ({
            title: '',
            url: '',
        }));
    };

    setLimit = ({ target: { value } }) => this.props.relay.setVariables({ limit: Number(value) });
    render() {
        const { title, url } = this.state;
        const content = this.props.store.linkConnection.edges.map(edge => (
            <Link key={edge.node.id} link={edge.node} />
        ));

        return (
            <div>
                <h3>Links</h3>
                <form onSubmit={this.handleSubmit}>
                    <input
                        onChange={this.handleTitleChange}
                        type="text"
                        placeholder="Title"
                        value={title}
                    />
                    <input
                        onChange={this.handleUrlChange}
                        type="text"
                        placeholder="Url"
                        value={url}
                    />
                    <button type="submit">Submit</button>
                </form>
                <br />
                <input type="text" placeholder="Filter links..." onChange={this.handleSearch} />
                <br />
                <br />
                <span>Show recent link: </span>
                <select onChange={this.setLimit} defaultValue={this.props.relay.variables.limit}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    10
                </select>
                <ul>{content} </ul>
            </div>
        );
    }
}

export default (Main = createContainer(Main, {
    initialVariables: {
        limit: 10,
        query: '',
    },
    fragments: {
        store: () => Relay.QL`
            fragment on Store {
                id,
                linkConnection(first: $limit, query: $query) {
                    edges {
                        node {
                            id,
                            ${Link.getFragment('link')}
                        }
                    }
                }
            }
        `,
    },
}));
