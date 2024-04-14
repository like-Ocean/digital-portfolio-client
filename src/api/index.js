import axios from 'axios';

export const apiUrl = 'http://localhost:8000/api';

export const api = axios.create({
    baseURL: apiUrl,
    withCredentials: true,
});
