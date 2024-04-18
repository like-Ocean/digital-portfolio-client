import { api } from '../index.js';

export const deleteAccountApi = (user_id) => {
    return api.delete('/users/user/delete', {
        data: {
            user_id,
        },
    });
};
