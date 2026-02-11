import { PageHeader } from '@/components/shared/page-header';

export default function AutomationsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Automations" description="Set up automated workflows" action={{ label: 'New Automation' }} />
      <p className="text-muted-foreground">Automation builder coming soon.</p>
    </div>
  );
}
