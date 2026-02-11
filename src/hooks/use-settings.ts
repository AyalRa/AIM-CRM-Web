import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '@/lib/api-client';
import type { CustomFieldDefinition, Business } from '@/types';

// ── Custom Fields ──

export function useCustomFields(entity?: string) {
  return useQuery<{ data: CustomFieldDefinition[] }>({
    queryKey: ['custom-fields', entity],
    queryFn: () =>
      apiClient.get('/settings/custom-fields', { params: entity ? { entity } : {} }).then((r) => r.data),
  });
}

export function useCreateCustomField() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<CustomFieldDefinition>) =>
      apiClient.post('/settings/custom-fields', data).then((r) => r.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['custom-fields'] }),
  });
}

export function useUpdateCustomField() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CustomFieldDefinition> }) =>
      apiClient.put(`/settings/custom-fields/${id}`, data).then((r) => r.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['custom-fields'] }),
  });
}

export function useDeleteCustomField() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiClient.delete(`/settings/custom-fields/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['custom-fields'] }),
  });
}

// ── Business Settings ──

export function useBusinessSettings() {
  return useQuery<{ data: Business }>({
    queryKey: ['business-settings'],
    queryFn: () => apiClient.get('/settings/business').then((r) => r.data),
  });
}

export function useUpdateBusinessSettings() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<Business>) =>
      apiClient.put('/settings/business', data).then((r) => r.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['business-settings'] }),
  });
}
