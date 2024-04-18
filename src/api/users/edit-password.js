import { api } from '../index.js';

export const editPasswordApi = (user_id, password) => {
    return api.patch('/users/user/edit/password', { user_id, password });
};
