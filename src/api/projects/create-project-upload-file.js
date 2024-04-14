import { api } from '../index.js';

export const projectUploadFileApi = (files, project_id) => {
    return api.post('/projects/project/file/upload', files, project_id);
};
