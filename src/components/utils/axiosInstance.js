import axios from 'axios';

const baseURL = 'http://localhost:8000/api/';

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const access_token = localStorage.getItem('access_token');

    if (access_token) {
      config.headers['Authorization'] = `Bearer ${access_token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refresh_token = localStorage.getItem('refresh_token');

      if (refresh_token) {
        try {
          const response = await axiosInstance.post('/token/refresh/', { refresh: refresh_token });
          const { access } = response.data;

          localStorage.setItem('access_token', access);

          originalRequest.headers['Authorization'] = `Bearer ${access}`;

          return axiosInstance(originalRequest);
        } catch (error) {
          console.log(error);
        }
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;