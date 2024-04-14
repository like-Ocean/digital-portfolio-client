import { api } from '../index.js';

export const deleteProjectApi = (project_id, user_id) => {
    return api.delete(`/projects/project/delete/${project_id}`, {
        data: {
            user_id,
        },
    });
};
