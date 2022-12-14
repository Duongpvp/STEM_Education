// @ts-nocheck
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

export const getUser = (userId) => API.get(`/user/${userId}`);
export const deletedUser = (uid, id, isAdmin) => API.put(`/user/delete/${uid}`, {currentUserId: id, currentUserAdminStatus: isAdmin});
export const updateUser = (id, formData) => API.put(`/user/${id}`, formData);
export const getAllUser = () => API.get("/user");
export const followUser = (id, data) => API.put(`/user/${id}/follow`, data);
export const unFollowUser = (id, data) => API.put(`/user/${id}/unfollow`, data);
export const searchUser = (data) => API.get(`/user/search/find?search=${data}`);
export const editRoleUser = (id, role) => API.put(`/user/editRole/${id}`, {role: role})
