import axios from 'axios';
import { useAuthStore } from '@/stores/auth-store';
import { mockLeads, mockCustomers, mockTasks } from './mock-data';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 30000,
});

// Mock Interceptor (Remove when backend is ready)
// Checks if the request is for a known entity and returns mock data
apiClient.interceptors.request.use(async (config) => {
  const isMockMode = true; // Force mock mode for now

  if (isMockMode && config.method === 'get') {
    await new Promise(resolve => setTimeout(resolve, 600)); // Simulate latency

    if (config.url?.includes('/leads')) {
      config.adapter = async () => ({
        data: { data: mockLeads, pagination: { total: mockLeads.length, page: 1, limit: 20, totalPages: 1 } },
        status: 200,
        statusText: 'OK',
        headers: {},
        config,
      });
    }

    if (config.url?.includes('/customers')) {
      config.adapter = async () => ({
        data: { data: mockCustomers, pagination: { total: mockCustomers.length, page: 1, limit: 20, totalPages: 1 } },
        status: 200,
        statusText: 'OK',
        headers: {},
        config,
      });
    }

    if (config.url?.includes('/tasks')) {
      config.adapter = async () => ({
        data: { data: mockTasks, pagination: { total: mockTasks.length, page: 1, limit: 20, totalPages: 1 } },
        status: 200,
        statusText: 'OK',
        headers: {},
        config,
      });
    }
  }
  return config;
});

// Attach JWT to every request
apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 → try refresh → retry original request
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = useAuthStore.getState().refreshToken;
        if (!refreshToken) {
          throw new Error('No refresh token');
        }

        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
          { refreshToken }
        );

        useAuthStore.getState().setTokens(data.accessToken, data.refreshToken);
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return apiClient(originalRequest);
      } catch {
        useAuthStore.getState().logout();
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
