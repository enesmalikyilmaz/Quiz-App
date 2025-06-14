import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});


export const register = (userData) => API.post('/auth/register', userData);
export const login = (credentials) => API.post('/auth/login', credentials);
export const createQuiz = (data, token) =>
  API.post('/quiz/create', data, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const listQuizzes = () => API.get('/quiz/list');

export default API;
