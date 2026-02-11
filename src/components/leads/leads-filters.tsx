'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { SearchInput } from '@/components/shared/search-input';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useStatuses } from '@/hooks/use-users';

export function LeadsFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { data: statusesData } = useStatuses('lead');

  const statuses = statusesData?.data || [];

  const updateParam = useCallback(
    (key: string, value: string | undefined) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      params.delete('page'); // Reset to page 1 on filter change
      router.push(`${pathname}?${params.toString()}`);
    },
    [searchParams, router, pathname]
  );

  const clearFilters = () => {
    router.push(pathname);
  };

  const hasFilters = searchParams.get('search') || searchParams.get('status');

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      <SearchInput
        value={searchParams.get('search') || ''}
        onChange={(value) => updateParam('search', value || undefined)}
        placeholder="Search leads..."
        className="sm:w-72"
      />

      <Select
        value={searchParams.get('status') || 'all'}
        onValueChange={(value) => updateParam('status', value === 'all' ? undefined : value)}
      >
        <SelectTrigger className="w-full sm:w-44">
          <SelectValue placeholder="All Statuses" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Statuses</SelectItem>
          {statuses.map((status) => (
            <SelectItem key={status.id} value={status.id}>
              {status.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {hasFilters && (
        <Button variant="ghost" size="sm" onClick={clearFilters}>
          <X className="mr-1 h-4 w-4" />
          Clear filters
        </Button>
      )}
    </div>
  );
}
