import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { authReducer } from "./Auth/Reducer";
import { thunk } from "redux-thunk";
import { publicReducer } from "./Public/Reducer";
import { imageReducer } from "./Image/Reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  post: publicReducer,
  image: imageReducer,
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
