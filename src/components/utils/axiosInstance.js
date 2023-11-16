import axios from 'axios';

const baseURL = 'http://localhost:8000/api/';

const Instance = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json',
  },
});

Instance.interceptors.request.use(
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

Instance.interceptors.response.use(
  async (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refresh_token = localStorage.getItem('refresh_token');

      if (refresh_token) {
        try {
          const response = await Instance.post('/token/refresh/', { refresh: refresh_token });
          const { access } = response.data;

          localStorage.setItem('access_token', access);

          // Retry the original request with the new access token
          originalRequest.headers['Authorization'] = `Bearer ${access}`;

          try {
            const retryResponse = await Instance(originalRequest);
            return retryResponse;
          } catch (retryError) {
            console.error('Error retrying original request:', retryError);
          }
        } catch (refreshError) {
          console.error('Error refreshing token:', refreshError);
        }
      }
    }

    return Promise.reject(error);
  }
);

export default Instance;
