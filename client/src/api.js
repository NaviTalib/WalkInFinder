import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // Needed if you are using cookies/sessions/Google auth
});

export default API;