import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '@/lib/api-client';
import type { Lead, PaginatedResponse, LeadFilters, CreateLeadInput } from '@/types';

// ── Queries ──

export function useLeads(filters: LeadFilters) {
  return useQuery<PaginatedResponse<Lead>>({
    queryKey: ['leads', filters],
    queryFn: () => apiClient.get('/leads', { params: filters }).then((r) => r.data),
  });
}

export function useLead(id: string) {
  return useQuery<{ data: Lead }>({
    queryKey: ['leads', id],
    queryFn: () => apiClient.get(`/leads/${id}`).then((r) => r.data),
    enabled: !!id,
  });
}

// ── Mutations ──

export function useCreateLead() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateLeadInput) =>
      apiClient.post('/leads', data).then((r) => r.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['leads'] }),
  });
}

export function useUpdateLead() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateLeadInput> }) =>
      apiClient.put(`/leads/${id}`, data).then((r) => r.data),
    onSuccess: (_, { id }) => {
      qc.invalidateQueries({ queryKey: ['leads'] });
      qc.invalidateQueries({ queryKey: ['leads', id] });
    },
  });
}

export function useDeleteLead() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiClient.delete(`/leads/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['leads'] }),
  });
}

export function useConvertLead() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (leadId: string) =>
      apiClient.post(`/leads/${leadId}/convert`).then((r) => r.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['leads'] });
      qc.invalidateQueries({ queryKey: ['customers'] });
    },
  });
}
