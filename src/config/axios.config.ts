import axios from "axios";

// Set config defaults when creating the instance
const axiosInstance = axios.create({
    baseURL: 'http://localhost:1337/api',
    timeout: 1000
});

export default axiosInstance;