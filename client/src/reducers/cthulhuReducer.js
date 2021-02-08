import {
    CTHULHU_GET_ALL_CHARS,
    CTHULHU_GET_ONE_CHAR,
    CTHULHU_SKILL_XP_AWARD,
    CTHULHU_SKILL_XP_ROLL
} from '../actions/types'

export function allCthulhuCharsReducer(state = null, action) {
    switch (action.type) {
        case CTHULHU_GET_ALL_CHARS:
            return action.payload || false
        default:
            return state
    }
}

export function oneCthulhuCharReducer(state = null, action) {
    console.log(action)
    switch (action.type) {
        case CTHULHU_GET_ONE_CHAR:
            return action.payload || false
        case CTHULHU_SKILL_XP_ROLL:
            return action.payload || false
        case CTHULHU_SKILL_XP_AWARD:
            return action.payload || false
        default:
            return state
    }
}
