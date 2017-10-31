import AppDispatcher from '../../dispatcher';
import { RECEIVE_LINKS } from '../../constants';
import { EventEmitter } from 'events';

let _links = [];

class LinkStore extends EventEmitter {
    constructor(props) {
        super(props);

        AppDispatcher.register(action => {
            switch (action.actionType) {
                case RECEIVE_LINKS:
                    _links = action.links;
                    this.emit('change');

                    break;
                default:
            }
        });
    }

    getAll() {
        return _links;
    }
}

export default new LinkStore();
