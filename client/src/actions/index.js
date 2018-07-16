import axios from "axios";
import {reset} from "redux-form";
import { FETCH_USER, GET_ALL_CHARS, GET_ONE_CHAR, UPDATE_USER, CREATE_CHAR, SKILL_XP_ROLL, WEAPON_XP_ROLL, POW_XP_ROLL } from "./types";

export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");
  dispatch({ type: FETCH_USER, payload: res.data });
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

export const createChar = (character) => async dispatch => {
  const res = await axios.post("/api/chars", character);
  const a = await dispatch({ type: CREATE_CHAR, payload: res.data });
  dispatch(reset("characterForm"));
};

export const skillXpRoll = (characterId, skill) => async dispatch => {
  const res = await axios.post("/api/chars/" + characterId + "/xp_skill/" + skill);
  await dispatch({ type: SKILL_XP_ROLL, payload: res.data });
};

export const powXpRoll = (characterId) => async dispatch => {
  const res = await axios.post("/api/chars/" + characterId + "/pow_gain");
  await dispatch({ type: POW_XP_ROLL, payload: res.data });
};

export const weaponXpRoll = (characterId, skill) => async dispatch => {
  const res = await axios.post("/api/chars/" + characterId + "/xp_weapon/" + skill );
  await dispatch({ type: WEAPON_XP_ROLL, payload: res.data });
};

export const getAllChars = () => async dispatch => {
  const res = await axios.get("/api/chars");
  dispatch({ type: GET_ALL_CHARS, payload: res.data });
};

export const getOneChar = (characterId) => async dispatch => {
  const res = await axios.get("/api/chars/" + characterId);
  dispatch({ type: GET_ONE_CHAR, payload: res.data });
};
