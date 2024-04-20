import { api } from '../index.js';

export const getRatingByUserAndProjectId = (user_id, project_id) => {
    return api.get(`/grades/user/${user_id}/${project_id}`);
};
