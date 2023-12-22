import axios from 'axios';
import { API_URL } from './Constants';
// Create an instance of Axios with default settings
const api = axios.create({
    baseURL: API_URL, // Replace with your API base URL
    timeout: 5000, // Set a default timeout
    headers: {
        'Content-Type': 'application/json',
    },
});
// Add a request interceptor to include the Bearer token in each request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token'); // Replace with your actual Bearer token
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
export default api;