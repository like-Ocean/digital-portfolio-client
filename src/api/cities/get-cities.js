import axios from 'axios';

export const getCities = () => {
    return axios.get('https://api.hh.ru/areas');
};
