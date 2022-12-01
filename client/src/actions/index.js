import axios from "axios";
import {reset} from "redux-form";
import {
    CLEAR_MESSAGES,
    CREATE_CHAR,
    CTHULHU_CLEAR_MESSAGES,
    CTHULHU_COUNTER_UPDATE,
    CTHULHU_CREATE_CHAR,
    CTHULHU_FETCH_MESSAGES,
    CTHULHU_GET_ALL_CHARS,
    CTHULHU_GET_ONE_CHAR,
    CTHULHU_POST_MESSAGE,
    CTHULHU_SKILL_XP_AWARD,
    CTHULHU_SKILL_XP_ROLL,
    FETCH_MESSAGES,
    FETCH_PARAMS,
    FETCH_USER,
    GET_ALL_CHARS,
    GET_ONE_CHAR,
    HP_UPDATE,
    LOGOUT,
    POST_MESSAGE,
    POW_XP_AWARD,
    POW_XP_ROLL,
    RP_UPDATE,
    SKILL_XP_AWARD,
    SKILL_XP_ROLL,
    TOGGLE_XP_ROLLS_ALLOWED,
    UPDATE_USER,
    WEAPON_XP_AWARD,
    WEAPON_XP_ROLL
} from "./types";

export const fetchUser = () => async dispatch => {
    const res = await axios.get("/api/current_user");
    dispatch({type: FETCH_USER, payload: res.data});
};

export const fetchParams = () => async dispatch => {
    const res = await axios.get("/api/params");
    dispatch({type: FETCH_PARAMS, payload: res.data});
};

export const toggleXpRollsAllowed = () => async dispatch => {
    const res = await axios.post("/api/params/xpRollsAllowed/toggle");
    await dispatch({type: TOGGLE_XP_ROLLS_ALLOWED, payload: res.data});
};

export const cthulhuToggleXpRollsAllowed = () => async dispatch => {
    const res = await axios.post("/api/params/cthulhuXpRollsAllowed/toggle");
    await dispatch({type: TOGGLE_XP_ROLLS_ALLOWED, payload: res.data});
};

export const updateUser = (userName) => async dispatch => {
    const user = await axios.get("/api/current_user");
    const payload = {
        userName: userName,
        googleId: user.data.googleId
    }

    const res = await axios.post("/api/user", payload);

    dispatch({type: UPDATE_USER, payload: res.data});
};

export const fetchMessages = () => async dispatch => {
    const res = await axios.get("/api/room");
    dispatch({type: FETCH_MESSAGES, payload: res.data});
};

export const postMessage = (messageBody, diceRoll) => async dispatch => {
    const payload = {
        messageBody,
        diceRoll
    }
    const res = await axios.post("/api/message", payload)
    await dispatch({type: POST_MESSAGE, payload: res.data});
};

export const clearMessages = () => async dispatch => {
    const res = await axios.get("/api/room/clear");
    dispatch({type: CLEAR_MESSAGES, payload: res.data});
};

export const createChar = (character) => async dispatch => {
    const res = await axios.post("/api/chars", character);
    const a = await dispatch({type: CREATE_CHAR, payload: res.data});
    dispatch(reset("characterForm"));
};

export const skillXpRoll = (characterId, skill) => async dispatch => {
    const res = await axios.post("/api/chars/" + characterId + "/xp_skill/" + skill);
    await dispatch({type: SKILL_XP_ROLL, payload: res.data});
};

export const skillXpAward = (characterId, skill) => async dispatch => {
    const res = await axios.post("/api/chars/" + characterId + "/xp_skill_award/" + skill);
    await dispatch({type: SKILL_XP_AWARD, payload: res.data});
};

export const powXpRoll = (characterId) => async dispatch => {
    const res = await axios.post("/api/chars/" + characterId + "/pow_gain");
    await dispatch({type: POW_XP_ROLL, payload: res.data});
};

export const hpUpdate = (characterId, loc, adj) => async dispatch => {
    const res = await axios.post("/api/chars/" + characterId + "/hp", {loc: loc, adj: adj});
    await dispatch({type: HP_UPDATE, payload: res.data});
};

export const rpUpdate = (characterId, pool, adj) => async dispatch => {
    const res = await axios.post("/api/chars/" + characterId + "/rp", {pool: pool, adj: adj});
    await dispatch({type: RP_UPDATE, payload: res.data});
};

export const powXpAward = (characterId) => async dispatch => {
    const res = await axios.post("/api/chars/" + characterId + "/pow_award");
    await dispatch({type: POW_XP_AWARD, payload: res.data});
};

export const weaponXpRoll = (characterId, skill) => async dispatch => {
    const res = await axios.post("/api/chars/" + characterId + "/xp_weapon/" + skill);
    await dispatch({type: WEAPON_XP_ROLL, payload: res.data});
};

export const weaponXpAward = (characterId, skill) => async dispatch => {
    const res = await axios.post("/api/chars/" + characterId + "/xp_weapon_award/" + skill);
    await dispatch({type: WEAPON_XP_AWARD, payload: res.data});
};

export const getAllChars = () => async dispatch => {
    const res = await axios.get("/api/chars");
    dispatch({type: GET_ALL_CHARS, payload: res.data});
};

export const getOneChar = (characterId) => async dispatch => {
    const res = await axios.get("/api/chars/" + characterId);
    dispatch({type: GET_ONE_CHAR, payload: res.data});
};

export const cthulhuGetAllChars = () => async dispatch => {
    const res = await axios.get("/api/cthulhu/chars");
    dispatch({type: CTHULHU_GET_ALL_CHARS, payload: res.data});
};

export const cthulhuGetOneChar = (characterId) => async dispatch => {
    const res = await axios.get("/api/cthulhu/chars/" + characterId);
    dispatch({type: CTHULHU_GET_ONE_CHAR, payload: res.data});
};

export const cthulhuCreateChar = (character) => async dispatch => {
    const res = await axios.post("/api/cthulhu/chars", character);
    const a = await dispatch({type: CTHULHU_CREATE_CHAR, payload: res.data});
    dispatch(reset("characterForm"));
};

export const cthulhuSkillXpRoll = (characterId, skill) => async dispatch => {
    const res = await axios.post("/api/cthulhu/chars/" + characterId + "/xp_skill/" + skill);
    await dispatch({type: CTHULHU_SKILL_XP_ROLL, payload: res.data});
};

export const cthulhuSkillXpAward = (characterId, skill) => async dispatch => {
    const res = await axios.post("/api/cthulhu/chars/" + characterId + "/xp_skill_award/" + skill);
    await dispatch({type: CTHULHU_SKILL_XP_AWARD, payload: res.data});
};

export const cthulhuCounterUpdate = (characterId, counter, adj) => async dispatch => {
    const res = await axios.post("/api/cthulhu/chars/" + characterId + "/" + counter, {adj: adj});
    await dispatch({type: CTHULHU_COUNTER_UPDATE, payload: res.data});
};

export const cthulhuFetchMessages = () => async dispatch => {
    const res = await axios.get("/api/cthulhu/room");
    dispatch({type: CTHULHU_FETCH_MESSAGES, payload: res.data});
};

export const cthulhuPostMessage = (messageBody, diceRoll) => async dispatch => {
    const payload = {
        messageBody,
        diceRoll
    }
    const res = await axios.post("/api/cthulhu/message", payload)
    await dispatch({type: CTHULHU_POST_MESSAGE, payload: res.data});
};

export const cthulhuClearMessages = () => async dispatch => {
    const res = await axios.get("/api/cthulhu/room/clear");
    dispatch({type: CTHULHU_CLEAR_MESSAGES, payload: res.data});
};

export const logout = () => async dispatch => {
    const res = await axios.get("/api/logout");
    dispatch({type: LOGOUT, payload: res.data});
};