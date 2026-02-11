import { PageHeader } from '@/components/shared/page-header';
import { LeadsTable } from '@/components/leads/leads-table';
import { LeadsFilters } from '@/components/leads/leads-filters';

export default function LeadsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Leads"
        description="Manage your leads pipeline"
        action={{ label: 'Add Lead', href: '/leads/new' }}
      />
      <LeadsFilters />
      <LeadsTable />
    </div>
  );
}
