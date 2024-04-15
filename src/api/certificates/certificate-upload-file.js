import { api } from '../index.js';

export const certificateUploadFileApi = (files) => {
    return api.post('/certificates/certificate/file/upload', files);
};
