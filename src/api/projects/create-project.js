import { api } from '../index.js';

export const createProjectApi = (user_id, name, description, category) => {
    return api.post('/projects/create', {user_id, name, description, category});
}
