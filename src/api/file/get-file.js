import { apiUrl } from '../index.js';

export const getFile = (file_id) => {
    return `${apiUrl}/files/file/${file_id}`;
};
