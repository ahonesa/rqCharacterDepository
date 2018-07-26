import { GET_ALL_CHARS, GET_ONE_CHAR, SKILL_XP_ROLL, SKILL_XP_AWARD, WEAPON_XP_ROLL, WEAPON_XP_AWARD, POW_XP_ROLL, POW_XP_AWARD, HP_UPDATE } from '../actions/types';

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
    case SKILL_XP_ROLL: 
      return action.payload || false;
    case SKILL_XP_AWARD:
      return action.payload || false;
    case WEAPON_XP_ROLL:
      return action.payload || false;
    case WEAPON_XP_AWARD:
     return action.payload || false;
    case POW_XP_ROLL:
      return action.payload || false;
    case POW_XP_AWARD:
      return action.payload || false;
    case HP_UPDATE:
      return action.payload || false;
    default:
      return state;
  }
}