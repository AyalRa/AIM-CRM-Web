'use client';

import { PageHeader } from '@/components/shared/page-header';
import { useCustomers, useDeleteCustomer } from '@/hooks/use-customers';
import { DataTable } from '@/components/ui/data-table';
import { StatusBadge } from '@/components/shared/status-badge';
import { UserAvatar } from '@/components/shared/user-avatar';
import { type ColumnDef } from '@tanstack/react-table';
import type { Customer } from '@/types';
import { formatDate } from '@/lib/format';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useCallback, useState } from 'react';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Eye, Pencil, Trash2 } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { ConfirmDialog } from '@/components/shared/confirm-dialog';
import { toast } from 'sonner';

export default function CustomersPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const deleteCustomer = useDeleteCustomer();

  const filters = {
    page: Number(searchParams.get('page')) || 1,
    limit: 20,
    search: searchParams.get('search') || undefined,
    statusId: searchParams.get('status') || undefined,
    sortBy: 'createdAt',
    sortOrder: 'desc' as const,
  };

  const { data, isLoading } = useCustomers(filters);

  const handlePageChange = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('page', String(page));
      router.push(`${pathname}?${params.toString()}`);
    },
    [searchParams, router, pathname]
  );

  const columns: ColumnDef<Customer>[] = [
    {
      accessorKey: 'firstName',
      header: 'Name',
      cell: ({ row }) => (
        <button className="font-medium hover:underline text-left" onClick={() => router.push(`/customers/${row.original.id}`)}>
          {row.original.firstName} {row.original.lastName}
        </button>
      ),
    },
    { accessorKey: 'email', header: 'Email' },
    { accessorKey: 'phone', header: 'Phone' },
    { accessorKey: 'company', header: 'Company' },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => <StatusBadge status={row.original.status} />,
    },
    {
      accessorKey: 'assignedTo',
      header: 'Assigned To',
      cell: ({ row }) => row.original.assignedTo
        ? <UserAvatar user={row.original.assignedTo} size="sm" showName />
        : <span className="text-sm text-muted-foreground">Unassigned</span>,
    },
    {
      accessorKey: 'createdAt',
      header: 'Created',
      cell: ({ row }) => <span className="text-sm text-muted-foreground">{formatDate(row.original.createdAt)}</span>,
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => router.push(`/customers/${row.original.id}`)}>
              <Eye className="mr-2 h-4 w-4" /> View
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push(`/customers/${row.original.id}?edit=true`)}>
              <Pencil className="mr-2 h-4 w-4" /> Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive" onClick={() => setDeleteTarget(row.original.id)}>
              <Trash2 className="mr-2 h-4 w-4" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Customers" description="Manage your customer relationships" action={{ label: 'Add Customer', href: '/customers/new' }} />
      <DataTable columns={columns} data={data?.data || []} pagination={data?.pagination} isLoading={isLoading} onPageChange={handlePageChange} emptyMessage="No customers yet." />
      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={() => setDeleteTarget(null)}
        title="Delete Customer"
        description="Are you sure? This action cannot be undone."
        confirmLabel="Delete"
        variant="destructive"
        isPending={deleteCustomer.isPending}
        onConfirm={async () => {
          if (!deleteTarget) return;
          try { await deleteCustomer.mutateAsync(deleteTarget); toast.success('Customer deleted'); setDeleteTarget(null); }
          catch { toast.error('Failed to delete'); }
        }}
      />
    </div>
  );
}
