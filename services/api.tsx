//api
import axios from 'axios';
import { getToken } from './auth';

const api = axios.create({
    baseURL: 'https://60331151a223790017acfa57.mockapi.io/wiser'
})

api.interceptors.request.use(async(config) => {
    const token = getToken();
    
    if(token) {
        config.headers['x-access-token'] = token;
    }
    
    return config;
})

export default api;