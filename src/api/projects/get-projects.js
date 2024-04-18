import { api } from '../index.js';

export const getProjects = () => {
    return api.get('/projects/');
};
