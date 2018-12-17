import axios from "axios";
import {reset} from "redux-form";
import {
    LOGOUT,
    FETCH_USER,
    GET_ALL_CHARS,
    GET_ONE_CHAR,
    UPDATE_USER,
    CREATE_CHAR,
    SKILL_XP_ROLL,
    SKILL_XP_AWARD,
    WEAPON_XP_ROLL,
    WEAPON_XP_AWARD,
    POW_XP_ROLL,
    POW_XP_AWARD,
    FETCH_PARAMS,
    TOGGLE_XP_ROLLS_ALLOWED,
    HP_UPDATE,
    RP_UPDATE,
    POST_MESSAGE,
    FETCH_MESSAGES,
    CLEAR_MESSAGES
} from "./types";

export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchParams = () => async dispatch => {
    const res = await axios.get("/api/params");
    dispatch({ type: FETCH_PARAMS, payload: res.data });
};

export const toggleXpRollsAllowed = () => async dispatch => {
    const res = await axios.post("/api/params/xpRollsAllowed/toggle");
    await dispatch({ type: TOGGLE_XP_ROLLS_ALLOWED, payload: res.data });
};

export const updateUser = (userName) => async dispatch => {
  const user = await axios.get("/api/current_user");
  const payload = {
    userName: userName,
    googleId: user.data.googleId
  }

  const res = await axios.post("/api/user", payload);

  dispatch({ type: UPDATE_USER, payload: res.data });
};

export const fetchMessages = () => async dispatch => {
    const res = await axios.get("/api/room");
    dispatch({ type: FETCH_MESSAGES, payload: res.data });
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
    dispatch({ type: CLEAR_MESSAGES, payload: res.data });
};

export const createChar = (character) => async dispatch => {
  const res = await axios.post("/api/chars", character);
  const a = await dispatch({ type: CREATE_CHAR, payload: res.data });
  dispatch(reset("characterForm"));
};

export const skillXpRoll = (characterId, skill) => async dispatch => {
  const res = await axios.post("/api/chars/" + characterId + "/xp_skill/" + skill);
  await dispatch({ type: SKILL_XP_ROLL, payload: res.data });
};

export const skillXpAward = (characterId, skill) => async dispatch => {
    const res = await axios.post("/api/chars/" + characterId + "/xp_skill_award/" + skill);
    await dispatch({ type: SKILL_XP_AWARD, payload: res.data });
};

export const powXpRoll = (characterId) => async dispatch => {
  const res = await axios.post("/api/chars/" + characterId + "/pow_gain");
  await dispatch({ type: POW_XP_ROLL, payload: res.data });
};

export const hpUpdate = (characterId, loc, adj) => async dispatch => {
  const res = await axios.post("/api/chars/" + characterId + "/hp", { loc: loc, adj: adj });
  await dispatch({ type: HP_UPDATE, payload: res.data });
};

export const rpUpdate = (characterId, pool, adj) => async dispatch => {
    const res = await axios.post("/api/chars/" + characterId + "/rp", { pool: pool, adj: adj });
    await dispatch({ type: RP_UPDATE, payload: res.data });
};

export const powXpAward = (characterId) => async dispatch => {
    const res = await axios.post("/api/chars/" + characterId + "/pow_award");
    await dispatch({ type: POW_XP_AWARD, payload: res.data });
};

export const weaponXpRoll = (characterId, skill) => async dispatch => {
  const res = await axios.post("/api/chars/" + characterId + "/xp_weapon/" + skill );
  await dispatch({ type: WEAPON_XP_ROLL, payload: res.data });
};

export const weaponXpAward = (characterId, skill) => async dispatch => {
    const res = await axios.post("/api/chars/" + characterId + "/xp_weapon_award/" + skill );
    await dispatch({ type: WEAPON_XP_AWARD, payload: res.data });
};

export const getAllChars = () => async dispatch => {
  const res = await axios.get("/api/chars");
  dispatch({ type: GET_ALL_CHARS, payload: res.data });
};

export const getOneChar = (characterId) => async dispatch => {
  const res = await axios.get("/api/chars/" + characterId);
  dispatch({ type: GET_ONE_CHAR, payload: res.data });
};

export const logout = () => async dispatch => {
    const res = await axios.get("/api/logout");
    dispatch({ type: LOGOUT, payload: res.data });
};