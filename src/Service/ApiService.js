import axios from "axios";

const API_URL = import.meta.env.VITE_REACT_APP_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const ApiService = {
  get: (endpoint, params) => axiosInstance.get(endpoint, { params }),
  post: (endpoint, data, token) =>
    axiosInstance.post(endpoint, data, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    }),
  put: (endpoint, data, token) =>
    axiosInstance.put(endpoint, data, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    }),
};
export default ApiService;
