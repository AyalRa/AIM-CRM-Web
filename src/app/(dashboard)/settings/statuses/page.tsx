import { PageHeader } from '@/components/shared/page-header';

export default function StatusesSettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Statuses" description="Manage entity statuses and pipeline stages" action={{ label: 'Add Status' }} />
      <p className="text-muted-foreground">Status management coming soon.</p>
    </div>
  );
}
