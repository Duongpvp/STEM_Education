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

export const fetchAllClass = () => API.get("/class/");
export const updateClass = (id, className, desc) =>
  API.put(`/class/update/${id}`, { className: className, desc: desc });
export const getAllClass = (userId) => API.get(`class/${userId}`);
export const getUserClass = (classId) =>
  API.get(`class/getuserclass/${classId}`);
export const getAPost = (postId) => API.get(`classpost/exc/${postId}`);
export const getAllPost = (classId) => API.get(`classpost/${classId}`);
export const getAllExercise = (classId) => API.get(`exercise/${classId}`);
export const createClass = (className, classAdmin, users, snippet) =>
  API.post("/class/createclass", {
    className: className,
    classAdmin: classAdmin,
    users: users,
    snippet: snippet,
  });
export const deleteClass = (id, classAdmin, isAdmin) =>
  API.put(`/class/deleteclass/${id}`, {
    classAdmin: classAdmin,
    isAdmin: isAdmin,
  });
