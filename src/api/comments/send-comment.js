import { api } from '../index.js';

export const sendCommentApi = (user_id, project_id, comment) => {
    return api.post('/comments/send', { user_id, project_id, comment });
};
