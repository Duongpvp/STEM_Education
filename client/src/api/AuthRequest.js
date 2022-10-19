import axios from "axios";

const API = axios.create({baseURL: "http://localhost:5000"})

export const logIn = (formData)=> API.post('/auth/login', formData)
export const signUp = (formData)=> API.post('/auth/register', formData)
export const loginOutsideUser = (userId, firstname, lastname, avatar) => API.post('/auth/loginOutside', {userId: userId, firstname: firstname, lastname: lastname, avatar: avatar})
export const outsideLogIn = () => API.get('/auth/login/success')
