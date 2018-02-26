import { GET_ALL_CHARS, GET_ONE_CHAR } from '../actions/types';

export function allCharsReducer(state = null, action) {
  switch (action.type) {
    case GET_ALL_CHARS: 
      return action.payload || false;
    default:
      return state;
  }
}

export function oneCharReducer(state = null, action) {
  switch (action.type) {
    case GET_ONE_CHAR: 
      return action.payload || false;
    default:
      return state;
  }
}