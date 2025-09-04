import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const axiosClient = axios.create({
  // IMPORTANT: Replace with your backend server's IP address and port
  baseURL: 'https://snap-backend-43834655102.europe-west1.run.app/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;
      await AsyncStorage.removeItem('token');
      // In a real app, you would dispatch an action to navigate to the login screen
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
