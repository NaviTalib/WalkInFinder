import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
  withCredentials: true,
});

// Add a response interceptor to handle/suppress expected 401 logs
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // Check if the error is a 401 on the auth check route
    const isAuthCheck = 
      error.config?.url?.includes("/auth/user") && 
      error.response?.status === 401;

    if (isAuthCheck) {
      // Silently reject so it doesn't print a red error stack in the console,
      // but your .catch() block in App.jsx will still trigger normally.
      return Promise.reject({ silent: true });
    }

    return Promise.reject(error);
  }
);

export default API;