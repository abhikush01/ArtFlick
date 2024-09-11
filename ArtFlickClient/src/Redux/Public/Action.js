import api from "../../config/api";

import {
  GET_FEED_REQUEST,
  GET_FEED_SUCCESS,
  GET_USER_DETAILS_REQUEST,
  GET_USER_DETAILS_SUCCESS,
  GET_USER_FEED_REQUEST,
  GET_USER_FEED_SUCCESS,
} from "./ActionType";

export const getPostFeed = () => async (dispatch) => {
  dispatch({ type: GET_FEED_REQUEST });
  try {
    const { data } = await api.get("/public/feed", {
      headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
    });
    data.reverse();
    dispatch({ type: GET_FEED_SUCCESS, payload: data });
  } catch (e) {
    console.log(e);
  }
};

export const getUserPosts = (userId) => async (dispatch) => {
  dispatch({ type: GET_USER_FEED_REQUEST });
  try {
    console.log(userId);
    const { data } = await api.get("/public/feed/" + userId, {
      headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
    });
    console.log(data);
    dispatch({ type: GET_USER_FEED_SUCCESS, payload: data });
  } catch (e) {
    console.log(e);
  }
};

export const getUserDetails = (userId) => async (dispatch) => {
  dispatch({ type: GET_USER_DETAILS_REQUEST });
  try {
    const { data } = await api.get("/public/user/" + userId, {
      headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
    });

    dispatch({ type: GET_USER_DETAILS_SUCCESS, payload: data });
  } catch (e) {
    console.log(e);
  }
};
