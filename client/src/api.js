import axios from "axios";

// Automatically uses your live backend URL in production, 
// and localhost during local development
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
  withCredentials: true,
});

export default API;