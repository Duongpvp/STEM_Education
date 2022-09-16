// @ts-nocheck
import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const uploadImage = (data) => API.post("/upload/", data);

export const uploadMultiFile = (data) => API.post("/uploadmultiple", data);
export const deleteFile = (userId, exerciseId) =>
  API.delete("/exercise/cancel", { userId: userId, exerciseId: exerciseId });

export const uploadExercise = (userId, submission, file, postId) =>
  API.post("/exercise/createExercise", {
    userId: userId,
    submission: submission,
    file: file,
    postId: postId,
  });

export const uploadClassPost = (title, desc, file, classId) =>
  API.post("classpost/", {
    classId: classId,
    postTitle: title,
    desc: desc,
    files: file,
  });

export const uploadPost = (data) => API.post("/post/", data);
