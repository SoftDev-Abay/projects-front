import axios from "axios";
const BASE_URL = "https://projects-backend-mldr.onrender.com";

// Public axios instance
export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

// Private axios instance
export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Adding request interceptor to the private axios instance
axiosPrivate.interceptors.request.use(
  function (config) {
    // Retrieve your access token from where it's stored
    const token = localStorage.getItem("access_token");
    // If the token exists, attach it to the Authorization header
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    console.log(token);
    console.log(config.headers["Authorization"]);

    return config;
  },
  function (error) {
    // Do something with request error

    return Promise.reject(error);
  }
);

// Optionally, you could add a response interceptor here as well
