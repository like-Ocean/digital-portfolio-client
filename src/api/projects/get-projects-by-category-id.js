import { api } from '../index.js';

export const getProjectsByCategoryIdApi = (category_id) => {
    return api.get(`/projects/category/${category_id}`);
};
