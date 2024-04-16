import { api } from '../index.js';

export const editCertificateApi = (user_id, certificate_id, name, company, link) => {
    return api.patch('/certificates/certificate/change', {
        user_id,
        certificate_id,
        name,
        company,
        link,
    });
};
