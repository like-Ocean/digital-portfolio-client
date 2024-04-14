import { api } from '../index.js';

export const getCommentsByProjectIdApi = (project_id) => {
    return api.get(`/comments/projects/project/${project_id}`);
};
