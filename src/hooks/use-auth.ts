import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useAuthStore } from '@/stores/auth-store';
import type { LoginRequest, LoginResponse } from '@/types';

export function useLogin() {
  const setAuth = useAuthStore((s) => s.setAuth);

  return useMutation({
    mutationFn: async (credentials: LoginRequest): Promise<LoginResponse> => {
      const { data } = await axios.post<LoginResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        credentials
      );
      return data;
    },
    onSuccess: (data) => {
      setAuth(data.accessToken, data.refreshToken, data.user);
      // Set cookie for middleware
      document.cookie = `aim-auth=true; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
    },
  });
}

export function useLogout() {
  const logout = useAuthStore((s) => s.logout);

  return () => {
    logout();
    window.location.href = '/login';
  };
}
