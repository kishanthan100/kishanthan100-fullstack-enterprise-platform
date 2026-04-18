// import axios from "axios";
// import API_BASE_URL from "./api";

// const api = axios.create({
//   baseURL: "/api",
//   withCredentials: true
// });

// api.interceptors.request.use(
//   (config) => {
//     console.log('Request:', config.method.toUpperCase(), config.url);
//     console.log('With credentials:', config.withCredentials);
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// export default api;

import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      // Prevent infinite loop if already on login page
      if (window.location.pathname !== "/") {
        window.location.href = "/";
      }
    }

    return Promise.reject(error);
  }
);

export default api;