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

export const sendMessage = (chatId, content, userId) => API.post("/message", { chatId: chatId, content: content, senderId: userId});
export const fetchMessage = (chatId) => API.get(`/message/${chatId}`);
