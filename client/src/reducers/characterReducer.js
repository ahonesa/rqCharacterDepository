import { GET_ALL_CHARS } from '../actions/types';

export default function(state = null, action) {
  switch (action.type) {
    case GET_ALL_CHARS: 
      return action.payload || false;
    default:
      return state;
  }
}