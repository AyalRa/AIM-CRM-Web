import { PageHeader } from '@/components/shared/page-header';
import { TasksTable } from '@/components/tasks/tasks-table';

export default function TasksPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Tasks" description="Track and manage your tasks" action={{ label: 'Add Task' }} />
      <TasksTable />
    </div>
  );
}
