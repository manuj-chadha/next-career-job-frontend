import axios from "axios";
const backendUrl = import.meta.env.VITE_FRONTEND_API_URL;

const API = axios.create({
    baseURL: `${backendUrl}`, // Replace with your backend URL
    withCredentials: true, // Ensure cookies (if needed)
});

// Attach JWT Token to Requests
API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);


API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "/login"; // Redirect to login on unauthorized access
        }
        return Promise.reject(error);
    }
);

export default API;
