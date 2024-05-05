import { api } from '../index.js';

export const registrationApi = (login, email, first_name, surname, country, city, password) => {
    return api.post('/users/registration', {
        login,
        email,
        first_name,
        surname,
        country,
        city,
        password,
    });
};
