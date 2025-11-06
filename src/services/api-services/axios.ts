import axios from "axios";

const API_URL =
  window.location.hostname === "localhost"
    ? import.meta.env.VITE_API_DEV_URL
    : import.meta.env.VITE_API_PROD_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// For logging or error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(
      "axiosInstance Error:",
      error.response?.data || error.message
    );
    return Promise.reject(error);
  }
);

export default axiosInstance;
