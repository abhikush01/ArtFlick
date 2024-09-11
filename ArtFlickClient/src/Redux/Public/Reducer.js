import {
  GET_FEED_REQUEST,
  GET_FEED_SUCCESS,
  GET_USER_DETAILS_REQUEST,
  GET_USER_DETAILS_SUCCESS,
  GET_USER_FEED_REQUEST,
  GET_USER_FEED_SUCCESS,
} from "./ActionType";

const initialState = {
  user: null,
  posts: null,
  loading: false,
  error: null,
};

export const publicReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FEED_REQUEST:
    case GET_USER_FEED_REQUEST:
    case GET_USER_DETAILS_REQUEST:
      return { ...state, loading: true, error: null };

    case GET_FEED_SUCCESS:
    case GET_USER_FEED_SUCCESS:
      return { ...state, loading: false, error: null, posts: action.payload };

    case GET_USER_DETAILS_SUCCESS:
      return { ...state, loading: false, error: null, user: action.payload };
    default:
      return state;
  }
};
