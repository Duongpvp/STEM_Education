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

export const fetchAllExercises = (exerciseId) => API.get(`exercise/${exerciseId}`);
export const gradingExercise = (exerciseId, grade) => API.put(`/exercise/grade`, {exerciseId: exerciseId, grade: grade})