import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '@/lib/api-client';
import type { Meeting, MeetingFilters, CreateMeetingInput } from '@/types';

export function useMeetings(filters: MeetingFilters) {
  return useQuery<{ data: Meeting[] }>({
    queryKey: ['meetings', filters],
    queryFn: () => apiClient.get('/meetings', { params: filters }).then((r) => r.data),
    enabled: !!filters.startDate && !!filters.endDate,
  });
}

export function useMeeting(id: string) {
  return useQuery<{ data: Meeting }>({
    queryKey: ['meetings', id],
    queryFn: () => apiClient.get(`/meetings/${id}`).then((r) => r.data),
    enabled: !!id,
  });
}

export function useCreateMeeting() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateMeetingInput) =>
      apiClient.post('/meetings', data).then((r) => r.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['meetings'] }),
  });
}

export function useUpdateMeeting() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateMeetingInput> }) =>
      apiClient.put(`/meetings/${id}`, data).then((r) => r.data),
    onSuccess: (_, { id }) => {
      qc.invalidateQueries({ queryKey: ['meetings'] });
      qc.invalidateQueries({ queryKey: ['meetings', id] });
    },
  });
}

export function useDeleteMeeting() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiClient.delete(`/meetings/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['meetings'] }),
  });
}
