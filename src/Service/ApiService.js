import axios from "axios";

const API_URL = import.meta.env.VITE_REACT_APP_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const ApiService = {
  post: (endpoint, data, token) =>
    axiosInstance.post(endpoint, data, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    }),
};
export default ApiService;

// get: (endpoint, params) => axiosInstance.get(endpoint, { params }),
