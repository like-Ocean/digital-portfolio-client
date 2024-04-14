import { api } from '../index.js';

export const getCategoriesApi = () => {
    return api.get('/projects/categories');
};
