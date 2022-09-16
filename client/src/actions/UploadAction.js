import * as UploadApi from "../api/UploadRequest";

export const uploadImage = (data) => async () => {
  try {
    await UploadApi.uploadImage(data);
  } catch (error) {
    console.log(error);
  }
};

export const uploadPost = (data) => async (dispatch) => {
  dispatch({ type: "UPLOAD_START" });
  try {
    const newPost = await UploadApi.uploadPost(data);
    console.log(data);
    dispatch({ type: "UPLOAD_SUCCESS", data: newPost.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "UPLOAD_FAIL" });
  }
};

export const uploadMultiFile = (data) => async () => {
  try {
    await UploadApi.uploadMultiFile(data);
  } catch (error) {
    console.log(error);
  }
};

export const uploadExercise = (userId, submission, file, postId) => async () => {
    try {
      const {data} = await UploadApi.uploadExercise(userId, submission, file, postId);
      console.log(data)
    } catch (error) {
      console.log(error);
    }
  };

export const deleteFile = (userId, exerciseId) => async () => {
  try {
    await UploadApi.deleteFile(userId, exerciseId);
  } catch (error) {
    console.log(error);
  }
};

export const uploadClassPost = (title, desc, file, classId) => async () => {
  try {
    const {data} = await UploadApi.uploadClassPost(title, desc, file, classId);
    console.log(data)
  } catch (error) {
    console.log(error);
  }
};