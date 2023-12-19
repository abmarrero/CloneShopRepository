import axios from 'axios';

const cloneApi = axios.create({
    baseURL: '/api'
});

export default cloneApi;