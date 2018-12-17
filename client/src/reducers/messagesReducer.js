import { POST_MESSAGE, FETCH_MESSAGES } from '../actions/types';

export default function(state = null, action) {
    switch (action.type) {
        case POST_MESSAGE:
            return action.payload || false;
        case FETCH_MESSAGES:
            return action.payload.room || false;
        default:
            return state;
    }
}