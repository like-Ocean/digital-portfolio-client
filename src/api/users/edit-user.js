import { api } from '../index.js';

export const editUserApi = (
    user_id,
    login,
    email,
    first_name,
    surname,
    country,
    city,
    avatar,
    phone,
    about,
) => {
    return api.patch('/users/user/edit', {
        user_id,
        login,
        email,
        first_name,
        surname,
        country,
        city,
        avatar,
        phone,
        about,
    });
};
