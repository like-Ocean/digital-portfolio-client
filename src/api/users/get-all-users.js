import { api } from '../index.js';

export const getAllUsers = () => {
    return api.get('/users/');
};
