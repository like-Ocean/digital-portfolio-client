import { api } from '../index.js';

export const DeleteFileApi = (file_id, project_id) => {
    return api.delete('/projects/project/file/delete', {
        data: {
            file_id,
            project_id,
        },
    });
};
