import { FETCH_PARAMS, TOGGLE_XP_ROLLS_ALLOWED } from '../actions/types';

export default function(state = null, action) {
    switch (action.type) {
        case TOGGLE_XP_ROLLS_ALLOWED:
            return action.payload || false;
        case FETCH_PARAMS:
            return action.payload || false;
        default:
            return state;
    }
}