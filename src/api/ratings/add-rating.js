import { api } from '../index.js';

export const addRatingApi = (user_id, project_id, grade) => {
    return api.post('/grades/grade/add', { user_id, project_id, grade });
};
