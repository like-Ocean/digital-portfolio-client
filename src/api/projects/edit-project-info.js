import { api } from '../index.js';

export const editProjectInfoApi = (project_id, name, description, category) => {
    return api.patch('/projects/change', { project_id, name, description, category });
};
