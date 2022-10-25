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

export const logIn = (formData) => API.post("/auth/login", formData);
export const resetPassword = (password, userEmail, id, token) =>
  API.post(`/auth/resetPassword/${userEmail}/${id}/${token}`, {
    password: password,
  });
export const forgotPassword = (email) =>
  API.post("/auth/forgotPassword", { email: email });
export const signUp = (formData) => API.post("/auth/register", formData);
export const signUpByAdmin = (formData) =>
  API.post("/auth/register-by-admin", formData);
export const activeCodeSender = (username) =>
  API.post("/auth/sendCode", { email: username });
export const verifySender = (username, code) =>
  API.post("/auth/verifyCode", { username: username, receiveCode: code });
export const loginOutsideUser = (
  userId,
  username,
  firstname,
  lastname,
  avatar
) =>
  API.post("/auth/loginOutside", {
    userId: userId,
    username: username,
    firstname: firstname,
    lastname: lastname,
    avatar: avatar,
  });
export const outsideLogIn = () => API.get("/auth/login/success");
