import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '@/lib/api-client';
import type { Sale, PaginatedResponse, SaleFilters, CreateSaleInput } from '@/types';

export function useSales(filters: SaleFilters) {
  return useQuery<PaginatedResponse<Sale>>({
    queryKey: ['sales', filters],
    queryFn: () => apiClient.get('/sales', { params: filters }).then((r) => r.data),
  });
}

export function useSale(id: string) {
  return useQuery<{ data: Sale }>({
    queryKey: ['sales', id],
    queryFn: () => apiClient.get(`/sales/${id}`).then((r) => r.data),
    enabled: !!id,
  });
}

export function useCreateSale() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateSaleInput) =>
      apiClient.post('/sales', data).then((r) => r.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['sales'] }),
  });
}

export function useUpdateSale() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateSaleInput> }) =>
      apiClient.put(`/sales/${id}`, data).then((r) => r.data),
    onSuccess: (_, { id }) => {
      qc.invalidateQueries({ queryKey: ['sales'] });
      qc.invalidateQueries({ queryKey: ['sales', id] });
    },
  });
}

export function useDeleteSale() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiClient.delete(`/sales/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['sales'] }),
  });
}
