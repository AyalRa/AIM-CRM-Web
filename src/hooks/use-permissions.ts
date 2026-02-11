import { useAuthStore } from '@/stores/auth-store';

export function usePermission(entity: string) {
  const permissions = useAuthStore((s) => s.user?.permissions || []);
  const perm = permissions.find((p) => p.entity === entity);

  return {
    canView: perm?.canView ?? false,
    canCreate: perm?.canCreate ?? false,
    canEdit: perm?.canEdit ?? false,
    canDelete: perm?.canDelete ?? false,
    ownOnly: perm?.ownOnly ?? false,
  };
}
