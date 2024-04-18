import { api } from '../index.js';

export const logoutApi = () => {
    return api.post('/users/user/logout');
};
