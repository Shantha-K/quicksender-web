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
  post: (endpoint, data) => axiosInstance.post(endpoint, data),
  put: (endpoint, data) => axiosInstance.put(endpoint, data),
  delete: (endpoint) => axiosInstance.delete(endpoint),
};
export default ApiService;
