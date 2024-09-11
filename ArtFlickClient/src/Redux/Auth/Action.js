import { API_BASE_URL } from "../../config/api";
import api from "../../config/api";
import axios from "axios";
import {
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  EDIT_USER_REQUEST,
  EDIT_USER_SUCCESS,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from "./ActionType";

export const register = (userData) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });
  try {
    const { data } = await axios.post(`${API_BASE_URL}/auth/signup`, userData);
    if (data.jwt) {
      localStorage.setItem("jwt", data.jwt);
      dispatch({ type: REGISTER_SUCCESS, payload: data });
    }
  } catch (e) {
    console.log(e);
  }
};

export const login = (userData) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const { data } = await axios.post(`${API_BASE_URL}/auth/login`, userData);
    if (data.jwt) {
      localStorage.setItem("jwt", data.jwt);
      dispatch({ type: LOGIN_SUCCESS, payload: data });
    }
  } catch (e) {
    console.log(e);
  }
};

export const getUser = () => async (dispatch) => {
  dispatch({ type: GET_USER_REQUEST });
  try {
    const { data } = await axios.get(`${API_BASE_URL}/api/users/profile`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
    });

    dispatch({ type: GET_USER_SUCCESS, payload: data });
  } catch (e) {
    console.log(e);
  }
};

export const deleteUser = (userId) => async (dispatch) => {
  dispatch({ type: DELETE_USER_REQUEST });
  try {
    const { data } = await api.delete(`/api/users/${userId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
    });
    if (data) {
      localStorage.clear();
      dispatch({ type: DELETE_USER_SUCCESS, payload: data });
      window.location.href = "http://localhost:5173/";
    }
  } catch (e) {
    console.log(e);
  }
};

export const editUserProfile = (userData, userId) => async (dispatch) => {
  dispatch({ type: EDIT_USER_REQUEST });
  try {
    const { data } = await api.put(`/api/users/edit/${userId}`, userData, {
      headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
    });
    if (data.jwt) {
      localStorage.setItem("jwt", data.jwt);
      dispatch({ type: EDIT_USER_SUCCESS, payload: data });
    }
  } catch (e) {
    console.log(e);
  }
};

export const logout = () => async (dispatch) => {
  dispatch({ type: LOGOUT });
  localStorage.clear();
  window.location.href = "http://localhost:5173/";
};
