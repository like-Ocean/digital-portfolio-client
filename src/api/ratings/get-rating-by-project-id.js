import { api } from '../index.js';

export const getRatingByProjectIdApi = (project_id) => {
    return api.get(`/grades/project/${project_id}`);
};
