'use client';

import { useLead } from '@/hooks/use-leads';
import { DetailSkeleton } from '@/components/shared/loading-skeleton';
import { StatusBadge } from '@/components/shared/status-badge';
import { UserAvatar } from '@/components/shared/user-avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Pencil, UserPlus } from 'lucide-react';
import { formatDate, formatRelative } from '@/lib/format';
import { useRouter } from 'next/navigation';

interface LeadDetailProps {
  leadId: string;
}

export function LeadDetail({ leadId }: LeadDetailProps) {
  const router = useRouter();
  const { data, isLoading } = useLead(leadId);
  const lead = data?.data;

  if (isLoading) return <DetailSkeleton />;
  if (!lead) return <p className="text-muted-foreground">Lead not found.</p>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.push('/leads')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              {lead.firstName} {lead.lastName}
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <StatusBadge status={lead.status} />
              {lead.company && (
                <span className="text-sm text-muted-foreground">{lead.company}</span>
              )}
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          {!lead.convertedToCustomerId && (
            <Button variant="outline" size="sm">
              <UserPlus className="mr-2 h-4 w-4" /> Convert
            </Button>
          )}
          <Button size="sm">
            <Pencil className="mr-2 h-4 w-4" /> Edit
          </Button>
        </div>
      </div>

      {/* Content */}
      <Tabs defaultValue="info" className="space-y-4">
        <TabsList>
          <TabsTrigger value="info">Info</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="docs">Documentation</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="info">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 sm:grid-cols-2">
                  <InfoField label="Email" value={lead.email} />
                  <InfoField label="Phone" value={lead.phone} />
                  <InfoField label="Company" value={lead.company} />
                  <InfoField label="Source" value={lead.source} />
                </CardContent>
              </Card>

              {lead.notes && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Notes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm whitespace-pre-wrap">{lead.notes}</p>
                  </CardContent>
                </Card>
              )}
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Assigned To</p>
                    {lead.assignedTo ? (
                      <UserAvatar user={lead.assignedTo} size="sm" showName />
                    ) : (
                      <p className="text-sm text-muted-foreground">Unassigned</p>
                    )}
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Created</p>
                    <p className="text-sm">{formatDate(lead.createdAt)}</p>
                    <p className="text-xs text-muted-foreground">{formatRelative(lead.createdAt)}</p>
                  </div>
                  {lead.convertedAt && (
                    <div>
                      <p className="text-xs text-muted-foreground">Converted</p>
                      <p className="text-sm">{formatDate(lead.convertedAt)}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="tasks">
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              No tasks linked to this lead yet.
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="docs">
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              No documentation added yet.
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity">
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              No activity recorded yet.
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function InfoField({ label, value }: { label: string; value?: string | null }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-sm">{value || '—'}</p>
    </div>
  );
}
