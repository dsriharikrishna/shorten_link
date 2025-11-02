

// src/services/apiServices.js
import axios from "axios";
import { API_CONFIG } from "./apiConfig";

// Create axios instance
const apiService = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  withCredentials: false,
});

// Interceptor to add Bearer token automatically
apiService.interceptors.request.use((config) => {
  const token = localStorage.getItem("shortUrl-auth");

  const isValidToken = typeof token === "string" && token.trim().startsWith("ey");

  if (isValidToken) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Main HTTP methods
export const apiMethods = {
  get: async (url, config = {}) => {
    const response = await apiService.get(url, config);
    return response.data;
  },

  post: async (url, data, config = {}) => {
    if (!config.headers) config.headers = {};
    config.headers["Content-Type"] = "application/json";

    const jsonData = JSON.stringify(data);
    const response = await apiService.post(url, jsonData, config);

    // Save access token only on login endpoint
    if (response.data?.access_token) {
      localStorage.setItem("shortUrl-auth", response.data.access_token);
    }

    return response.data;
  },

  patch: async (url, data, config = {}) => {
    if (!config.headers) config.headers = {};
    config.headers["Content-Type"] = "application/json";
    data = JSON.stringify(data);
    const response = await apiService.patch(url, data, config);
    return response.data;
  },

  put: async (url, data, config = {}) => {
    if (!config.headers) config.headers = {};
    config.headers["Content-Type"] = "application/json";
    data = JSON.stringify(data);
    const response = await apiService.put(url, data, config);
    return response.data;
  },

  delete: async (url, config = {}) => {
    const response = await apiService.delete(url, config);
    return response.data;
  },
};

export default apiService;


