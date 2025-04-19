import axios from 'axios';

// Create an Axios instance with only the base URL
const axiosInstance = axios.create({
  baseURL:'https://adjunct-backend.onrender.com', // Replace with your backend URL
});

export default axiosInstance;
