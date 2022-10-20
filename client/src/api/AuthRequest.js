import axios from "axios";

const API = axios.create({baseURL: "http://localhost:5000"})

export const logIn = (formData)=> API.post('/auth/login', formData)
export const resetPassword = (password, userEmail, id, token) => API.post(`/auth/resetPassword/${userEmail}/${id}/${token}`, {password: password});
export const signUp = (formData)=> API.post('/auth/register', formData)
export const activeCodeSender = (username) => API.post('/auth/sendCode', {email: username})
export const verifySender = (username, code) => API.post('/auth/verifyCode', {username: username, receiveCode :code})
export const loginOutsideUser = (userId, firstname, lastname, avatar) => API.post('/auth/loginOutside', {userId: userId, firstname: firstname, lastname: lastname, avatar: avatar})
export const outsideLogIn = () => API.get('/auth/login/success')
 