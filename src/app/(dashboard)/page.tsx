'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useDashboardStats, useLeadsByStatus, useSalesOverTime } from '@/hooks/use-reports';
import { Skeleton } from '@/components/ui/skeleton';
import { formatCurrency, formatNumber } from '@/lib/format';
import {
  UserPlus, Users, CheckSquare, Receipt,
  Calendar, TrendingUp, RefreshCw, ArrowUpRight,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

function StatCard({
  title,
  value,
  icon: Icon,
  href,
  isLoading,
}: {
  title: string;
  value: string;
  icon: React.ElementType;
  href: string;
  isLoading: boolean;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-7 w-24" />
        ) : (
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold">{value}</span>
            <Button variant="ghost" size="icon" asChild>
              <Link href={href}>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function DashboardPage() {
  const { data: stats, isLoading } = useDashboardStats();
  const s = stats?.data;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Overview of your business at a glance.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Leads"
          value={formatNumber(s?.leadsCount ?? 0)}
          icon={UserPlus}
          href="/leads"
          isLoading={isLoading}
        />
        <StatCard
          title="Customers"
          value={formatNumber(s?.customersCount ?? 0)}
          icon={Users}
          href="/customers"
          isLoading={isLoading}
        />
        <StatCard
          title="Open Tasks"
          value={formatNumber(s?.openTasksCount ?? 0)}
          icon={CheckSquare}
          href="/tasks"
          isLoading={isLoading}
        />
        <StatCard
          title="Sales This Month"
          value={formatCurrency(s?.salesTotalThisMonth ?? 0)}
          icon={Receipt}
          href="/sales"
          isLoading={isLoading}
        />
      </div>

      {/* Second row */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Sales Count"
          value={formatNumber(s?.salesCountThisMonth ?? 0)}
          icon={TrendingUp}
          href="/sales"
          isLoading={isLoading}
        />
        <StatCard
          title="Active Retainers"
          value={formatNumber(s?.retainersActive ?? 0)}
          icon={RefreshCw}
          href="/retainers"
          isLoading={isLoading}
        />
        <StatCard
          title="Upcoming Meetings"
          value={formatNumber(s?.upcomingMeetings ?? 0)}
          icon={Calendar}
          href="/calendar"
          isLoading={isLoading}
        />
        <StatCard
          title="Total Tasks"
          value={formatNumber(s?.tasksCount ?? 0)}
          icon={CheckSquare}
          href="/tasks"
          isLoading={isLoading}
        />
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/leads/new">
              <UserPlus className="mr-2 h-4 w-4" />
              New Lead
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/customers/new">
              <Users className="mr-2 h-4 w-4" />
              New Customer
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/sales/new">
              <Receipt className="mr-2 h-4 w-4" />
              New Sale
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/tasks">
              <CheckSquare className="mr-2 h-4 w-4" />
              View Tasks
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
