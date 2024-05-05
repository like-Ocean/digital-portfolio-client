import { api } from '../index.js';

export const uploadAvatarApi = (file) => {
    return api.post('/users/user/avatar/upload', file);
};
