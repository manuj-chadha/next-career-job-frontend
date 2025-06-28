import axios from "axios";
import { toast } from "sonner";
import store from "../redux/store.js"; // Adjust the path to your Redux store
import { setUser } from "../redux/authSlice.js"; // Adjust path if needed
// import { useNavigate } from "react-router-dom";

const backendUrl = import.meta.env.VITE_BACKEND_API_URL;

// const navigate=useNavigate();

const API = axios.create({
  baseURL: backendUrl,
  withCredentials: true,
});

// Attach JWT to each request
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

// Handle 401 & 403 globally
API.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401 || status === 403) {
      store.dispatch(setUser(null));
      localStorage.removeItem("token");
      toast.error("Session expired or unauthorized. Please log in again.");
      // navigate("/login")
    }

    return Promise.reject(error);
  }
);

export default API;
