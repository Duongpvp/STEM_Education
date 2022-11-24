import axios from "axios";

const API = axios.create({baseURL: `${process.env.REACT_APP_URL_SERVER_LOCAL}`})

export const getTimeLinePosts = (id) => API.get(`/post/${id}/timeline`)
export const likePost = (id, userId) => API.put(`/post/${id}/like`, {userId: userId})
export const updatePost = (id, data) => API.put(`/post/updatepost/${id}`, data)