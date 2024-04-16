import { api } from '../index.js';

export const deleteCertificateApi = (user_id, certificate_id, file_id) => {
    return api.delete(`/certificates/certificate/delete/`, {
        data: {
            user_id,
            certificate_id,
            file_id,
        },
    });
};
