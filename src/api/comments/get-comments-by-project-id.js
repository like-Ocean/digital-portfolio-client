import { api } from '../index.js';

export const getCommentsByProjectIdAPI = (project_id) => {
    return api.get(`/comments/projects/project/${project_id}`)
}
