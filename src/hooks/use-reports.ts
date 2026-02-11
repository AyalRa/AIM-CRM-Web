import { useQuery } from '@tanstack/react-query';
import apiClient from '@/lib/api-client';

interface DashboardStats {
  leadsCount: number;
  customersCount: number;
  tasksCount: number;
  openTasksCount: number;
  salesTotalThisMonth: number;
  salesCountThisMonth: number;
  retainersActive: number;
  upcomingMeetings: number;
}

interface LeadsByStatus {
  statusName: string;
  statusColor: string;
  count: number;
}

interface SalesOverTime {
  date: string;
  total: number;
  count: number;
}

interface TopSalesPerson {
  userId: string;
  userName: string;
  totalSales: number;
  salesCount: number;
}

export function useDashboardStats() {
  return useQuery<{ data: DashboardStats }>({
    queryKey: ['reports', 'dashboard'],
    queryFn: () => apiClient.get('/reports/dashboard').then((r) => r.data),
  });
}

export function useLeadsByStatus() {
  return useQuery<{ data: LeadsByStatus[] }>({
    queryKey: ['reports', 'leads-by-status'],
    queryFn: () => apiClient.get('/reports/leads/by-status').then((r) => r.data),
  });
}

export function useSalesOverTime(period: 'week' | 'month' | 'quarter' | 'year' = 'month') {
  return useQuery<{ data: SalesOverTime[] }>({
    queryKey: ['reports', 'sales-over-time', period],
    queryFn: () =>
      apiClient.get('/reports/sales/over-time', { params: { period } }).then((r) => r.data),
  });
}

export function useTopSalesPeople(limit = 5) {
  return useQuery<{ data: TopSalesPerson[] }>({
    queryKey: ['reports', 'top-sales', limit],
    queryFn: () =>
      apiClient.get('/reports/sales/top-salespeople', { params: { limit } }).then((r) => r.data),
  });
}
