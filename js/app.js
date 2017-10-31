import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/Main';
import Relay, { Route, RootContainer } from 'react-relay/classic';

class HomeRoute extends Route {
    static routeName = 'Home';
    static queries = {
        store: Component => Relay.QL`
            query mainQuery {
                store { ${Component.getFragment('store')} }
            }
        `,
    };
}

ReactDOM.render(
    <RootContainer Component={Main} route={new HomeRoute()} />,
    document.getElementById('react'),
);
