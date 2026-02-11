'use client';

import { useEffect, type ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/stores/auth-store';

const PUBLIC_PATHS = ['/login', '/booking'];

export function AuthProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  const isPublicPath = PUBLIC_PATHS.some((path) => pathname.startsWith(path));

  useEffect(() => {
    if (!isAuthenticated && !isPublicPath) {
      router.replace('/login');
    }
  }, [isAuthenticated, isPublicPath, router]);

  // Allow public pages to render always
  if (isPublicPath) {
    return <>{children}</>;
  }

  // For protected pages, show nothing while redirecting
  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
