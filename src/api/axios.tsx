import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://auth-api-eb0f.onrender.com/auth',
    withCredentials: true
});

// Request interceptor to add the token
api.interceptors.request.use(config => {
    const token = localStorage.getItem('refreshToken'); // Your refresh token key
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});


// Response interceptor for error handling
api.interceptors.response.use(response => {
    return response;
}, async error => {
    if (error.response && error.response.status === 401) {
        // Attempt to refresh the token
        try {
            const { data } = await api.post('/refresh'); // Adjust the endpoint as necessary
            localStorage.setItem('refreshToken', data.token); // Store the new token

            // Retry the original request with the new token
            error.config.headers['Authorization'] = `Bearer ${data.token}`;
            return api.request(error.config);
        } catch (refreshError) {
            console.error('Failed to refresh token', refreshError);
            // Handle error (e.g., redirect to login)
        }
    }
    return Promise.reject(error);
});
