import { api } from '../index.js';

export const getProjectByIdApi = (project_id) => {
    return api.get(`/projects/project/${project_id}`)
}
