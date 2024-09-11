import api from "../../config/api";
import {
  DELETE_IMAGE_REQUEST,
  DELETE_IMAGE_SUCCESS,
  GENERATE_IMAGE_REQUEST,
  GENERATE_IMAGE_SUCCESS,
  POST_IMAGE_REQUEST,
  POST_IMAGE_SUCCESS,
} from "./ActionType";
import { b64toBlob } from "../../service/base64toBlob";

export const generateImages = (prompt) => async (dispatch) => {
  dispatch({ type: GENERATE_IMAGE_REQUEST });
  try {
    const { data } = await api.post(`/api/image/generate`, prompt, {
      headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
    });
    dispatch({ type: GENERATE_IMAGE_SUCCESS, payload: data });
  } catch (e) {
    console.log(e);
  }
};

export const postImage =
  ({ file, prompt }) =>
  async (dispatch) => {
    dispatch({ type: POST_IMAGE_REQUEST });
    try {
      file = b64toBlob(file, "image/png");
      const formData = new FormData();
      formData.append("file", file);
      formData.append("prompt", prompt);
      const { data } = await api.post(`/api/image/post`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      dispatch({ type: POST_IMAGE_SUCCESS, payload: data });
    } catch (e) {
      console.log(e);
    }
  };

export const deleteImage = (imageId) => async (dispatch) => {
  dispatch({ type: DELETE_IMAGE_REQUEST });
  try {
    const { data } = await api.post(`/api/image/delete/${imageId}`);

    dispatch({ type: DELETE_IMAGE_SUCCESS, payload: data });
  } catch (e) {
    console.log(e);
  }
};
