import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://zz-vb.onrender.com/api/',
});

export default instance