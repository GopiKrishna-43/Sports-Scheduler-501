import axios from "axios";

const API = axios.create({
  baseURL: "/api", // proxy will forward to localhost:5000
});

// Automatically attach token from localStorage
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
