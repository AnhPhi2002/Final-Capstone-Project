import axios from 'axios';

// export const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;
const BASE_URL: string = import.meta.env.VITE_BACKEND_URL ||  'https://api.learnup.work';
// export const BASE_URL = "http://localhost:3000/api";
// export const BASE_URL = "http://160.187.241.152:6969/api";
console.log('BASE_URL', BASE_URL);
export const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-type': 'application/json',
  },
  withCredentials: true,
});


axiosClient.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('token');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers.Accept = 'application/json';
      // config.headers['Content-Type'] = 'application/json';
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      window.location.pathname !== "/log-in"
    ) {
      // Xóa thông tin đăng nhập
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("refreshToken");

      // Redirect về trang đăng nhập
      window.location.href = "/log-in";
    }

    return Promise.reject(error);
  }
);