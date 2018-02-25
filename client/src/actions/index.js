import axios from "axios";
import { FETCH_USER, GET_ALL_CHARS } from "./types";

export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const getAllChars = () => async dispatch => {
  const res = await axios.get("/api/chars");
  dispatch({ type: GET_ALL_CHARS, payload: res.data });
};
