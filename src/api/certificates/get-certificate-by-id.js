import { api } from '../index.js';

export const getCertificateById = (certificate_id) => {
    return api.get(`/certificates/${certificate_id}`);
};
