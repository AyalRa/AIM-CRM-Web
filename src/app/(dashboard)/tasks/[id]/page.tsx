import { PageHeader } from '@/components/shared/page-header';

export default function TaskDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <PageHeader title="Task Detail" description={`Task ${params.id}`} />
      <p className="text-muted-foreground">Task detail view with time tracking coming soon.</p>
    </div>
  );
}
