'use client';

import { useCustomer } from '@/hooks/use-customers';
import { DetailSkeleton } from '@/components/shared/loading-skeleton';
import { StatusBadge } from '@/components/shared/status-badge';
import { UserAvatar } from '@/components/shared/user-avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Pencil } from 'lucide-react';
import { formatDate, formatRelative } from '@/lib/format';
import { useRouter } from 'next/navigation';

export function CustomerDetail({ customerId }: { customerId: string }) {
  const router = useRouter();
  const { data, isLoading } = useCustomer(customerId);
  const customer = data?.data;

  if (isLoading) return <DetailSkeleton />;
  if (!customer) return <p className="text-muted-foreground">Customer not found.</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.push('/customers')}><ArrowLeft className="h-4 w-4" /></Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{customer.firstName} {customer.lastName}</h1>
            <div className="flex items-center gap-2 mt-1">
              <StatusBadge status={customer.status} />
              {customer.company && <span className="text-sm text-muted-foreground">{customer.company}</span>}
            </div>
          </div>
        </div>
        <Button size="sm"><Pencil className="mr-2 h-4 w-4" /> Edit</Button>
      </div>

      <Tabs defaultValue="info" className="space-y-4">
        <TabsList>
          <TabsTrigger value="info">Info</TabsTrigger>
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="docs">Documentation</TabsTrigger>
        </TabsList>
        <TabsContent value="info">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2">
              <Card>
                <CardHeader><CardTitle className="text-base">Contact Information</CardTitle></CardHeader>
                <CardContent className="grid gap-4 sm:grid-cols-2">
                  <div><p className="text-xs text-muted-foreground">Email</p><p className="text-sm">{customer.email || '—'}</p></div>
                  <div><p className="text-xs text-muted-foreground">Phone</p><p className="text-sm">{customer.phone || '—'}</p></div>
                  <div><p className="text-xs text-muted-foreground">Company</p><p className="text-sm">{customer.company || '—'}</p></div>
                  <div><p className="text-xs text-muted-foreground">Address</p><p className="text-sm">{customer.address || '—'}</p></div>
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardHeader><CardTitle className="text-base">Details</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground">Assigned To</p>
                  {customer.assignedTo ? <UserAvatar user={customer.assignedTo} size="sm" showName /> : <p className="text-sm text-muted-foreground">Unassigned</p>}
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Created</p>
                  <p className="text-sm">{formatDate(customer.createdAt)}</p>
                  <p className="text-xs text-muted-foreground">{formatRelative(customer.createdAt)}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="sales"><Card><CardContent className="py-8 text-center text-muted-foreground">No sales yet.</CardContent></Card></TabsContent>
        <TabsContent value="tasks"><Card><CardContent className="py-8 text-center text-muted-foreground">No tasks yet.</CardContent></Card></TabsContent>
        <TabsContent value="docs"><Card><CardContent className="py-8 text-center text-muted-foreground">No documentation yet.</CardContent></Card></TabsContent>
      </Tabs>
    </div>
  );
}
