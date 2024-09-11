import {
  DELETE_IMAGE_REQUEST,
  DELETE_IMAGE_SUCCESS,
  GENERATE_IMAGE_REQUEST,
  GENERATE_IMAGE_SUCCESS,
  POST_IMAGE_REQUEST,
  POST_IMAGE_SUCCESS,
} from "./ActionType";

const initialState = {
  posts: [],
  message: null,
  loading: false,
  error: null,
};

export const imageReducer = (state = initialState, action) => {
  switch (action.type) {
    case GENERATE_IMAGE_REQUEST:
    case POST_IMAGE_REQUEST:
    case DELETE_IMAGE_REQUEST:
      return { ...state, loading: true, error: null };

    case GENERATE_IMAGE_SUCCESS:
      return { ...state, loading: false, error: null, posts: action.payload };

    case POST_IMAGE_SUCCESS:
      return { ...state, loading: false, error: null, message: action.payload };

    case DELETE_IMAGE_SUCCESS:
      return { ...state, loading: false, error: null, message: action.payload };
    default:
      return state;
  }
};
