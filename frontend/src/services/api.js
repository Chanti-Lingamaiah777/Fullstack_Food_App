import axios from 'axios';

// Create axios instance
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

// API endpoints
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  signup: (userData) => api.post('/auth/signup', userData),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (userData) => api.put('/auth/profile', userData)
};

export const restaurantAPI = {
  getAll: () => api.get('/restaurants'),
  getById: (id) => api.get(`/restaurants/${id}`),
  getByCuisine: (cuisine) => api.get(`/restaurants/cuisine/${cuisine}`),
  search: (query) => api.get(`/restaurants/search?q=${encodeURIComponent(query)}`),
  getWithFilters: (filters) => api.get('/restaurants/filter', { params: filters })
};

export const menuAPI = {
  getByRestaurant: (restaurantId, filters = {}) => 
    api.get(`/menu/restaurant/${restaurantId}`, { params: filters }),
  getById: (id) => api.get(`/menu/${id}`),
  search: (query, filters = {}) => 
    api.get('/menu/search', { params: { q: query, ...filters } })
};

export const orderAPI = {
  create: (orderData) => api.post('/orders', orderData),
  getUserOrders: () => api.get('/orders/me'),
  getById: (id) => api.get(`/orders/${id}`),
  updateStatus: (id, status) => api.put(`/orders/${id}/status`, { status })
};

export default api;
