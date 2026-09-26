import axios from "axios";

// API BASE URL
const API_URL =
    import.meta.env.VITE_API_URL ||
    "http://localhost:5000/api";

// AXIOS INSTANCE
const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 15000,
});

// REQUEST INTERCEPTOR
// Attach admin JWT automatically
api.interceptors.request.use(
    (config) => {
        const token =
            localStorage.getItem("adminToken");

        if (token) {
            config.headers.Authorization =
                `Bearer ${token}`;
        }

        return config;
    },

    (error) => {
        return Promise.reject(error);
    }
);

// RESPONSE INTERCEPTOR
api.interceptors.response.use(
    (response) => {
        return response;
    },

    (error) => {
        // Admin token expired / invalid
        if (error.response?.status === 401) {

            const token =
                localStorage.getItem(
                    "adminToken"
                );

            if (token) {
                localStorage.removeItem(
                    "adminToken"
                );
            }
        }

        return Promise.reject(error);
    }
);

export default api;