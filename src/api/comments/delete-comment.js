import { api } from '../index.js';

export const deleteCommentApi = (user_id, comment_id) => {
    return api.delete('/comments/comment/delete', {
        data: {
            user_id,
            comment_id,
        },
    });
};
