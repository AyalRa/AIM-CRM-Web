'use client';

import { useLeads, useDeleteLead, useConvertLead } from '@/hooks/use-leads';
import { DataTable } from '@/components/ui/data-table';
import { StatusBadge } from '@/components/shared/status-badge';
import { UserAvatar } from '@/components/shared/user-avatar';
import { ConfirmDialog } from '@/components/shared/confirm-dialog';
import { type ColumnDef } from '@tanstack/react-table';
import type { Lead } from '@/types';
import { formatDate } from '@/lib/format';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useCallback, useState } from 'react';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Eye, Pencil, Trash2, UserPlus } from 'lucide-react';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { usePermission } from '@/hooks/use-permissions';
import { toast } from 'sonner';

export function LeadsTable() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { canEdit, canDelete } = usePermission('leads');

  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [convertTarget, setConvertTarget] = useState<string | null>(null);

  const deleteLead = useDeleteLead();
  const convertLead = useConvertLead();

  const filters = {
    page: Number(searchParams.get('page')) || 1,
    limit: 20,
    search: searchParams.get('search') || undefined,
    statusId: searchParams.get('status') || undefined,
    assignedToId: searchParams.get('assignedTo') || undefined,
    sortBy: searchParams.get('sortBy') || 'createdAt',
    sortOrder: (searchParams.get('sortOrder') as 'asc' | 'desc') || 'desc',
  };

  const { data, isLoading } = useLeads(filters);

  const handlePageChange = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('page', String(page));
      router.push(`${pathname}?${params.toString()}`);
    },
    [searchParams, router, pathname]
  );

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteLead.mutateAsync(deleteTarget);
      toast.success('Lead deleted');
      setDeleteTarget(null);
    } catch {
      toast.error('Failed to delete lead');
    }
  };

  const handleConvert = async () => {
    if (!convertTarget) return;
    try {
      await convertLead.mutateAsync(convertTarget);
      toast.success('Lead converted to customer');
      setConvertTarget(null);
    } catch {
      toast.error('Failed to convert lead');
    }
  };

  const columns: ColumnDef<Lead>[] = [
    {
      accessorKey: 'firstName',
      header: 'Name',
      cell: ({ row }) => (
        <button
          className="font-medium hover:underline text-left"
          onClick={() => router.push(`/leads/${row.original.id}`)}
        >
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
      cell: ({ row }) =>
        row.original.assignedTo ? (
          <UserAvatar user={row.original.assignedTo} size="sm" showName />
        ) : (
          <span className="text-muted-foreground text-sm">Unassigned</span>
        ),
    },
    {
      accessorKey: 'createdAt',
      header: 'Created',
      cell: ({ row }) => (
        <span className="text-muted-foreground text-sm">{formatDate(row.original.createdAt)}</span>
      ),
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => router.push(`/leads/${row.original.id}`)}>
              <Eye className="mr-2 h-4 w-4" /> View
            </DropdownMenuItem>
            {canEdit && (
              <DropdownMenuItem onClick={() => router.push(`/leads/${row.original.id}?edit=true`)}>
                <Pencil className="mr-2 h-4 w-4" /> Edit
              </DropdownMenuItem>
            )}
            {!row.original.convertedToCustomerId && (
              <DropdownMenuItem onClick={() => setConvertTarget(row.original.id)}>
                <UserPlus className="mr-2 h-4 w-4" /> Convert to Customer
              </DropdownMenuItem>
            )}
            {canDelete && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-destructive"
                  onClick={() => setDeleteTarget(row.original.id)}
                >
                  <Trash2 className="mr-2 h-4 w-4" /> Delete
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <>
      <DataTable
        columns={columns}
        data={data?.data || []}
        pagination={data?.pagination}
        isLoading={isLoading}
        onPageChange={handlePageChange}
        emptyMessage="No leads found. Create your first lead to get started."
      />

      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={() => setDeleteTarget(null)}
        title="Delete Lead"
        description="Are you sure you want to delete this lead? This action cannot be undone."
        confirmLabel="Delete"
        variant="destructive"
        isPending={deleteLead.isPending}
        onConfirm={handleDelete}
      />

      <ConfirmDialog
        open={!!convertTarget}
        onOpenChange={() => setConvertTarget(null)}
        title="Convert to Customer"
        description="This will convert the lead into a customer. The lead record will be marked as converted."
        confirmLabel="Convert"
        isPending={convertLead.isPending}
        onConfirm={handleConvert}
      />
    </>
  );
}
