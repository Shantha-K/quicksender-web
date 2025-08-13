import axios from "axios";

const API_URL = import.meta.env.VITE_REACT_APP_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const postFormData = (endpoint, data, token) => {
  return axiosInstance.post(endpoint, data, {
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
      "Content-Type": "multipart/form-data", // Let Axios handle boundary
    },
  });
};

const putFormData = (endpoint, data, token) => {
  return axiosInstance.put(endpoint, data, {
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
      "Content-Type": "multipart/form-data",
    },
  });
};

const ApiService = {
  get: (endpoint, params, token) =>
    axiosInstance.get(endpoint, {
      params,
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    }),
  post: (endpoint, data, token) =>
    axiosInstance.post(endpoint, data, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    }),
  put: (endpoint, data, token) =>
    axiosInstance.put(endpoint, data, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    }),
  postFormData,
  putFormData,
};
export default ApiService;
