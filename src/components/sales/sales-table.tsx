'use client';

import { useSales } from '@/hooks/use-sales';
import { DataTable } from '@/components/ui/data-table';
import { StatusBadge } from '@/components/shared/status-badge';
import { type ColumnDef } from '@tanstack/react-table';
import type { Sale } from '@/types';
import { formatDate, formatCurrency } from '@/lib/format';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Eye } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export function SalesTable() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const filters = {
    page: Number(searchParams.get('page')) || 1,
    limit: 20,
    sortBy: 'createdAt',
    sortOrder: 'desc' as const,
  };

  const { data, isLoading } = useSales(filters);

  const handlePageChange = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('page', String(page));
      router.push(`${pathname}?${params.toString()}`);
    },
    [searchParams, router, pathname]
  );

  const columns: ColumnDef<Sale>[] = [
    {
      accessorKey: 'saleNumber',
      header: 'Sale #',
      cell: ({ row }) => (
        <button className="font-medium hover:underline text-left" onClick={() => router.push(`/sales/${row.original.id}`)}>
          {row.original.saleNumber}
        </button>
      ),
    },
    {
      accessorKey: 'customer',
      header: 'Customer',
      cell: ({ row }) => `${row.original.customer.firstName} ${row.original.customer.lastName}`,
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => <StatusBadge status={row.original.status} />,
    },
    {
      accessorKey: 'total',
      header: 'Total',
      cell: ({ row }) => <span className="font-medium">{formatCurrency(row.original.total)}</span>,
    },
    {
      accessorKey: 'soldBy',
      header: 'Sold By',
      cell: ({ row }) => `${row.original.soldBy.firstName} ${row.original.soldBy.lastName}`,
    },
    {
      accessorKey: 'createdAt',
      header: 'Date',
      cell: ({ row }) => <span className="text-sm text-muted-foreground">{formatDate(row.original.createdAt)}</span>,
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => router.push(`/sales/${row.original.id}`)}><Eye className="mr-2 h-4 w-4" /> View</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <DataTable columns={columns} data={data?.data || []} pagination={data?.pagination} isLoading={isLoading} onPageChange={handlePageChange} emptyMessage="No sales found." />
  );
}
