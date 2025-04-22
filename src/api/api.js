import axios from 'axios'

const api = axios.create({
    baseURL: 'https://localhost:7075/api',
    headers: { 'Content-Type': 'application/json' },
});

let refreshPromise = null;

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
  
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          try {
            if (refreshPromise) {
              await refreshPromise;
              originalRequest.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
              return api(originalRequest);
            }
            refreshPromise = axios.post('https://localhost:7075/api/Auth/refresh', 
              { refreshToken },
              { headers: { 'Content-Type': 'application/json' } });
            const response = await refreshPromise
            const { accessToken, refreshToken: newRefreshToken } = response.data.data;

            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', newRefreshToken);

            originalRequest.headers.Authorization = `Bearer ${accessToken}`;

            refreshPromise = null;
            return api(originalRequest);
          } catch (refreshError) {
            console.log('Refresh token error:', refreshError?.response?.data);
            
            refreshPromise = null;
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            window.location.href = '/login';
          }
        }
      }
      return Promise.reject(error);
    }
  );
  
  export default api;