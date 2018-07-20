import { FETCH_PARAMS } from '../actions/types';

export default function(state = null, action) {
    switch (action.type) {
        case FETCH_PARAMS:
            return action.payload || false;
        default:
            return state;
    }
}