import axios from 'axios';

// Create an Axios instance with only the base URL
const axiosInstance = axios.create({
  baseURL:'http://localhost:3000', // Replace with your backend URL
});

export default axiosInstance;