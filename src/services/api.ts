import axios from 'axios';

const url = process.env.API;

const api = axios.create({
  baseURL: url,
});

export default api;
