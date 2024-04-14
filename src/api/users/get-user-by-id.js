import { api } from '../index.js';

export const getUserByIdApi = (user_id) => {
    return api.get(`/users/user/${user_id}`);
};
