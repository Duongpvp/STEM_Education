import { toast } from "react-toastify";
import * as PostApi from "../api/PostRequest";

export const getTimeLinePosts = (id) => async (dispatch) => {
  dispatch({ type: "RETREIVING_START" });
  try {
    const { data } = await PostApi.getTimeLinePosts(id);
    dispatch({ type: "RETREIVING_SUCCESS", data: data });
  } catch (error) {
    dispatch({ type: "RETREIVING_FAIL" });
    console.log(error);
  }
};

export const likePost = (id, userId) => async (dispatch) => {
  dispatch({ type: "LIKEPOST", data: id });
  PostApi.likePost(id, userId);
};

export const updatePost = (id, data, setIsEdit, setFetchAgain, fetchAgain) => async () => {
  const postData = await PostApi.updatePost(id, data);
  if (postData) {
    toast.success("Post Updated");
    setIsEdit(false);
    setFetchAgain(!fetchAgain)
  }
};
