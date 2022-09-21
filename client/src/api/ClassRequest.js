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

export const getAllClass = (userId) => API.get(`class/${userId}`);
export const getUserClass = (classId) => API.get(`class/getuserclass/${classId}`)
export const getAPost = (postId) => API.get(`classpost/exc/${postId}`);
export const getAllPost = (classId) => API.get(`classpost/${classId}`);
export const getAllExercise = (classId) => API.get(`exercise/${classId}`);
