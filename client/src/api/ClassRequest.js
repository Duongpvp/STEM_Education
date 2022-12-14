import axios from "axios";

const API = axios.create({ baseURL: `${process.env.REACT_APP_URL_SERVER_LOCAL}` });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const getCurrentClass = (classId) => API.get(`class/getcurrentclass/${classId}`)
export const getAllClassForUser = () => API.get("class/getclassforuser/")
export const fetchAllClass = () => API.get("class/");
export const updateClass = (id, className, desc) => API.put(`class/update/${id}`, { className: className, desc: desc });
export const getAllClass = () => API.get(`class/`);
export const getUserClass = (classId) => API.get(`class/getuserclass/${classId}`);
export const getAPost = (postId) => API.get(`classpost/exc/${postId}`);
export const getAllPost = (classId) => API.get(`classpost/${classId}`);
export const getAllExercise = (classId) => API.get(`/exercise/${classId}`);
export const createClass = (className, classAdmin, users, snippet, image) => API.post("class/createclass", {className: className,classAdmin: classAdmin,users: users,image: image,snippet: snippet,});
export const deleteClass = (id, classAdmin, isAdmin) => API.put(`class/deleteclass/${id}`, { classAdmin: classAdmin, isAdmin: isAdmin});
export const joinClass = (id, code) => API.put(`class/join/${id}`, {code: code})
export const removeUserFromClass = (classId, userId, adminId) => API.put("class/classremove/removeuser", {classId: classId, userId: userId, adminId: adminId})
export const deletedClassPost = (id, postId) => API.put(`classpost/deletedpost/${id}`, {postId: postId})
