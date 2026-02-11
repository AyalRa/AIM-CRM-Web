import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '@/lib/api-client';
import type { User, PaginatedResponse, UserFilters, CreateUserInput, UpdateUserInput, Status } from '@/types';

// ── Users ──

export function useUsers(filters?: UserFilters) {
  return useQuery<PaginatedResponse<User>>({
    queryKey: ['users', filters],
    queryFn: () => apiClient.get('/users', { params: filters }).then((r) => r.data),
  });
}

export function useUser(id: string) {
  return useQuery<{ data: User }>({
    queryKey: ['users', id],
    queryFn: () => apiClient.get(`/users/${id}`).then((r) => r.data),
    enabled: !!id,
  });
}

export function useCreateUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateUserInput) =>
      apiClient.post('/users', data).then((r) => r.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['users'] }),
  });
}

export function useUpdateUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateUserInput }) =>
      apiClient.put(`/users/${id}`, data).then((r) => r.data),
    onSuccess: (_, { id }) => {
      qc.invalidateQueries({ queryKey: ['users'] });
      qc.invalidateQueries({ queryKey: ['users', id] });
    },
  });
}

// ── Statuses ──

export function useStatuses(entity?: string) {
  return useQuery<{ data: Status[] }>({
    queryKey: ['statuses', entity],
    queryFn: () =>
      apiClient.get('/settings/statuses', { params: entity ? { entity } : {} }).then((r) => r.data),
  });
}

export function useCreateStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: { name: string; color?: string; entity: string }) =>
      apiClient.post('/settings/statuses', data).then((r) => r.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['statuses'] }),
  });
}

export function useUpdateStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: { name?: string; color?: string; order?: number } }) =>
      apiClient.put(`/settings/statuses/${id}`, data).then((r) => r.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['statuses'] }),
  });
}

export function useDeleteStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiClient.delete(`/settings/statuses/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['statuses'] }),
  });
}
