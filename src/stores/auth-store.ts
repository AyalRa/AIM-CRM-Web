import { create } from 'zustand';
import type { Permission } from '@/types';

interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  role: string;
  businessId: string;
  businessName: string;
  permissions: Permission[];
}

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
  setAuth: (accessToken: string, refreshToken: string, user: AuthUser) => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: 'mock-access-token',
  refreshToken: 'mock-refresh-token',
  user: {
    id: 'mock-user-1',
    email: 'admin@example.com',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin',
    businessId: 'business-1',
    businessName: 'My Business',
    permissions: [
      { entity: 'leads', canView: true, canCreate: true, canEdit: true, canDelete: true, ownOnly: false },
      { entity: 'customers', canView: true, canCreate: true, canEdit: true, canDelete: true, ownOnly: false },
      { entity: 'tasks', canView: true, canCreate: true, canEdit: true, canDelete: true, ownOnly: false },
      { entity: 'sales', canView: true, canCreate: true, canEdit: true, canDelete: true, ownOnly: false },
      { entity: 'products', canView: true, canCreate: true, canEdit: true, canDelete: true, ownOnly: false },
      { entity: 'settings', canView: true, canCreate: true, canEdit: true, canDelete: true, ownOnly: false },
    ],
  },
  isAuthenticated: true,

  setAuth: (accessToken, refreshToken, user) =>
    set({ accessToken, refreshToken, user, isAuthenticated: true }),

  setTokens: (accessToken, refreshToken) =>
    set({ accessToken, refreshToken }),

  logout: () => {
    // Clear auth cookie
    if (typeof document !== 'undefined') {
      document.cookie = 'aim-auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    }
    set({
      accessToken: null,
      refreshToken: null,
      user: null,
      isAuthenticated: false,
    });
  },
}));
