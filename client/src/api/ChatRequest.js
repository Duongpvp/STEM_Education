import axios from "axios";

const API = axios.create({baseURL: `${process.env.REACT_APP_URL_SERVER_LOCAL}`})

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
});

export const accessChat = (id) => API.post("/chat/", {id: id});
export const fetchChat = () => API.get("/chat/");
export const createGroupChat = (chatName, selectedUsers) => API.post("/chat/group", {name: chatName, users: selectedUsers})
export const renameGroupChat = (chatId, chatName) => API.put("/chat/rename", {chatId: chatId, chatName: chatName})
export const addUserGroup = (chatId, userId) => API.put("/chat/groupadd/", {chatId: chatId, userId: userId})
export const removeUserGroup = (chatId, userId) => API.put("/chat/groupremove", {chatId: chatId, userId: userId})
