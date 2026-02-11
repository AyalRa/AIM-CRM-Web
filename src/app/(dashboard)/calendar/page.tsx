import { PageHeader } from '@/components/shared/page-header';

export default function CalendarPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Calendar" description="View and manage meetings" action={{ label: 'New Meeting' }} />
      <p className="text-muted-foreground">Calendar view coming soon.</p>
    </div>
  );
}
