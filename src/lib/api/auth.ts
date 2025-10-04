import { apiClient } from './client';
import type { LoginCredentials, RegisterCredentials, User, AuthResponse } from '../types/api';

export const authApi = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const { data } = await apiClient.post('/api/auth/login', credentials);
    return data;
  },

  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    const { data } = await apiClient.post('/api/auth/register', credentials);
    return data;
  },

  async getCurrentUser(): Promise<User> {
    const { data } = await apiClient.get('/api/auth/me');
    return data;
  },

  async logout(): Promise<void> {
    await apiClient.post('/api/auth/logout');
  },

  async refreshToken(): Promise<void> {
    await apiClient.post('/api/auth/refresh');
  },
};
