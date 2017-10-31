import AppDispatcher from '../../dispatcher';
import { RECEIVE_LINKS } from '../../constants';

export default {
    receiveLinks(links) {
        AppDispatcher.dispatch({
            actionType: RECEIVE_LINKS,
            links,
        });
    },
};
