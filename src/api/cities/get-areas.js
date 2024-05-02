import axios from 'axios';

export const getAreas = () => {
    return axios.get('https://api.hh.ru/areas');
};
