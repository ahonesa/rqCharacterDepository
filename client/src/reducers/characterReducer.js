import {
    CTHULHU_GET_ALL_CHARS,
    CTHULHU_GET_ONE_CHAR,
    CTHULHU_SKILL_XP_AWARD,
    CTHULHU_SKILL_XP_ROLL,
    GET_ALL_CHARS,
    GET_ONE_CHAR,
    HP_UPDATE,
    POW_XP_AWARD,
    POW_XP_ROLL,
    RP_UPDATE,
    SKILL_XP_AWARD,
    SKILL_XP_ROLL,
    WEAPON_XP_AWARD,
    WEAPON_XP_ROLL
} from '../actions/types'

export function allCharsReducer(state = null, action) {
    switch (action.type) {
        case CTHULHU_GET_ALL_CHARS:
            return action.payload || false
        case GET_ALL_CHARS:
            return action.payload || false
        default:
            return state
    }
}

export function oneCharReducer(state = null, action) {
    switch (action.type) {
        case CTHULHU_GET_ONE_CHAR:
            return action.payload || false
        case CTHULHU_SKILL_XP_ROLL:
            return action.payload || false
        case CTHULHU_SKILL_XP_AWARD:
            return action.payload || false
        case GET_ONE_CHAR:
            return action.payload || false
        case SKILL_XP_ROLL:
            return action.payload || false
        case SKILL_XP_AWARD:
            return action.payload || false
        case WEAPON_XP_ROLL:
            return action.payload || false
        case WEAPON_XP_AWARD:
            return action.payload || false
        case POW_XP_ROLL:
            return action.payload || false
        case POW_XP_AWARD:
            return action.payload || false
        case HP_UPDATE:
            return action.payload || false
        case RP_UPDATE:
            return action.payload || false
        default:
            return state
    }
}