import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authService = {
  async login(email: string, password: string) {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  async register(name: string, email: string, password: string, password_confirmation: string) {
    const response = await api.post('/auth/register', {
      name,
      email,
      password,
      password_confirmation,
    });
    return response.data;
  },

  async logout() {
    const response = await api.post('/auth/logout');
    return response.data;
  },

  async me() {
    const response = await api.get('/auth/me');
    return response.data;
  },
};

export const businessService = {
  async getOrders(params?: any) {
    const response = await api.get('/orders', { params });
    return response.data;
  },

  async getOrder(id: string) {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },

  async createOrder(data: any) {
    const response = await api.post('/orders', data);
    return response.data;
  },

  async updateOrder(id: string, data: any) {
    const response = await api.put(`/orders/${id}`, data);
    return response.data;
  },

  async getProducts(params?: any) {
    const response = await api.get('/products', { params });
    return response.data;
  },

  async getCustomers(params?: any) {
    const response = await api.get('/customers', { params });
    return response.data;
  },
};

export const dashboardService = {
  async getDashboard() {
    const response = await api.get('/dashboard');
    return response.data;
  },
};

export default api;