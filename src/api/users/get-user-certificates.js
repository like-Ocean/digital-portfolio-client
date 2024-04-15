import { api } from '../index.js';

export const getUserCertificatesApi = (user) => {
    return api.get(`/certificates/user/${user}`);
};
