import axios from 'axios';
import cookies from 'js-cookie';

// Axios instance
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, // IF you plan to use cookies in some cases
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add JWT to requests automatically
axiosInstance.interceptors.request.use(
  (config) => {
    const token = cookies.get('jwt_token') ;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle global errors (e.g., token expiry)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      cookies.remove('jwt_token'); // Remove token on unauthorized access
      window.location.href = '/login'; // Redirect to login
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
