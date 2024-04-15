import { api } from '../index.js';

export const addCertificateApi = (user_id, name, company, link, file_id) => {
    return api.post('/certificates/certificate/v2/add', { user_id, name, company, link, file_id });
};
