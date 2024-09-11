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

const initialState = {
  user: null,
  loading: false,
  error: null,
  jwt: localStorage.getItem("jwt") || null,
  message: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
    case GET_USER_REQUEST:
    case DELETE_USER_REQUEST:
    case EDIT_USER_REQUEST:
      return { ...state, loading: true, error: null };

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
    case EDIT_USER_SUCCESS:
      return { ...state, loading: false, error: null, jwt: action.payload.jwt };

    case GET_USER_SUCCESS:
      return { ...state, loading: false, error: null, user: action.payload };

    case DELETE_USER_SUCCESS:
      return { ...initialState, message: action.payload.message };

    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
