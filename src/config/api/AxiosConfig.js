import axios from 'axios';
import { getItem } from '@config/utils/functions';

const axiosInstance = axios.create({
  baseURL: 'https://salefox-api.woodenclouds.in/',
  timeout: 10000, // Set a timeout to handle slow network issues
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const token = await getItem('token');
      console.log('Token:', token);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        console.warn('No token found');
      }
    } catch (err) {
      console.error('Error fetching token:', err);
    }
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    const appData = response?.data?.app_data;
    if (appData && appData.StatusCode === 6000) {
      return appData;
    } else {
      console.error('Error in response app_data:', appData?.message || 'Unknown error');
      return Promise.reject(new Error(appData?.message || 'Something went wrong.'));
    }
  },
  (error) => {
    const requestUrl = error.config ? error.config.url : 'Unknown';
    console.error(`Error API Endpoint: ${requestUrl}`, error);

    if (error.response) {
      console.error('Error Status:', error.response.status);
      console.error('Error Response:', JSON.stringify(error.response.data, null, 2));
    } else if (error.code === 'ECONNABORTED') {
      console.error('Error: Request timeout');
    } else {
      console.error('Error:', error.message);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
