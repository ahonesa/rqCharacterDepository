import { CTHULHU_POST_MESSAGE, CTHULHU_FETCH_MESSAGES, CTHULHU_CLEAR_MESSAGES } from '../actions/types';

export default function(state = null, action) {
    switch (action.type) {
        case CTHULHU_POST_MESSAGE:
            return action.payload || false;
        case CTHULHU_FETCH_MESSAGES:
            return action.payload.room || false;
        case CTHULHU_CLEAR_MESSAGES:
            return action.payload.room || false;
        default:
            return state;
    }
}