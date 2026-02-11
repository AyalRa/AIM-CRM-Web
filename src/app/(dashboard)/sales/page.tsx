import { PageHeader } from '@/components/shared/page-header';
import { SalesTable } from '@/components/sales/sales-table';

export default function SalesPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Sales" description="Track your sales and revenue" action={{ label: 'New Sale', href: '/sales/new' }} />
      <SalesTable />
    </div>
  );
}
