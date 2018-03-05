import axios from "axios";
import { FETCH_USER, GET_ALL_CHARS, GET_ONE_CHAR, UPDATE_USER } from "./types";

export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const updateUser = (userName) => async dispatch => {
  const user = await axios.get("/api/current_user");

  console.log(userName)

  const payload = {
    userName: userName,
    googleId: user.data.googleId
  }

  const res = await axios.post("/api/user", payload);

  dispatch({ type: UPDATE_USER, payload: res.data });
};

export const getAllChars = () => async dispatch => {
  const res = await axios.get("/api/chars");
  dispatch({ type: GET_ALL_CHARS, payload: res.data });
};

export const getOneChar = (characterId) => async dispatch => {
  const res = await axios.get("/api/chars/" + characterId);
  dispatch({ type: GET_ONE_CHAR, payload: res.data });
};
