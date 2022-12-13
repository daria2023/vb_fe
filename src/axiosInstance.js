import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://zz-vb.onrender.com/api/'
    // baseURL: 'http://localhost:5000/api'
});

export default instance