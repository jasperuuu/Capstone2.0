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

export const loopService = {
  async getLoops(params?: any) {
    const response = await api.get('/loops', { params });
    return response.data;
  },

  async getLoop(id: string) {
    const response = await api.get(`/loops/${id}`);
    return response.data;
  },

  async createLoop(data: any) {
    const response = await api.post('/loops', data);
    return response.data;
  },

  async updateLoop(id: string, data: any) {
    const response = await api.put(`/loops/${id}`, data);
    return response.data;
  },

  async deleteLoop(id: string) {
    const response = await api.delete(`/loops/${id}`);
    return response.data;
  },

  async executeLoop(id: string, data?: any) {
    const response = await api.post(`/loops/${id}/execute`, { data });
    return response.data;
  },

  async duplicateLoop(id: string) {
    const response = await api.post(`/loops/${id}/duplicate`);
    return response.data;
  },

  async toggleLoop(id: string) {
    const response = await api.patch(`/loops/${id}/toggle`);
    return response.data;
  },

  async publishLoop(id: string) {
    const response = await api.patch(`/loops/${id}/publish`);
    return response.data;
  },

  async getExecutions(id: string) {
    const response = await api.get(`/loops/${id}/executions`);
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