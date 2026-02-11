import { PageHeader } from '@/components/shared/page-header';
import Link from 'next/link';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { UserPlus, Receipt } from 'lucide-react';

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Reports" description="Business insights and analytics" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Link href="/reports/leads">
          <Card className="hover:border-primary/50 transition-colors cursor-pointer">
            <CardHeader className="flex flex-row items-center gap-4">
              <UserPlus className="h-8 w-8 text-primary" />
              <div>
                <CardTitle className="text-base">Leads Report</CardTitle>
                <p className="text-sm text-muted-foreground">Lead pipeline analytics</p>
              </div>
            </CardHeader>
          </Card>
        </Link>
        <Link href="/reports/sales">
          <Card className="hover:border-primary/50 transition-colors cursor-pointer">
            <CardHeader className="flex flex-row items-center gap-4">
              <Receipt className="h-8 w-8 text-primary" />
              <div>
                <CardTitle className="text-base">Sales Report</CardTitle>
                <p className="text-sm text-muted-foreground">Revenue and sales analytics</p>
              </div>
            </CardHeader>
          </Card>
        </Link>
      </div>
    </div>
  );
}
