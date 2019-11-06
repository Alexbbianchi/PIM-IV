import axios from 'axios';

const api = axios.create({
    baseURL: 'http://172.30.90.175:3333',
});

export default api;