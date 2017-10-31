import React, { Component } from 'react';
import Relay, { createContainer, QL } from 'react-relay/classic';
import moment from 'moment';

class Link extends Component {
    dateLabel = () => {
        let { link, relay } = this.props;
        if (relay.hasOptimisticUpdate(link)) {
            return 'Saving...';
        }

        return moment(link.createdAt).format('L');
    };

    render() {
        const { link: { url, title } } = this.props;
        return (
            <li>
                <span
                    style={{
                        color: '#888',
                        fontSize: '0.7em',
                        marginRight: '0.5em',
                    }}>
                    {this.dateLabel()}
                    {' --- '}
                </span>
                <a href={url}>{title}</a>
            </li>
        );
    }
}

export default (Link = createContainer(Link, {
    fragments: {
        link: () => Relay.QL`
            fragment on Link {
                url,
                title,
                createdAt
            }
        `,
    },
}));
