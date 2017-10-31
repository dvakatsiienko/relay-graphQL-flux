import ServerActions from '../actions/server';

export default {
    async fetchLinks(query) {
        const response = await fetch(`/graphql?query=${query}`, {
            method: 'POST',
        });

        const result = await response.json();

        ServerActions.receiveLinks(result.data.links);
    },
};
