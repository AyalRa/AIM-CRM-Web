import { PageHeader } from '@/components/shared/page-header';

export default function UsersSettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Users" description="Manage team members" action={{ label: 'Add User' }} />
      <p className="text-muted-foreground">Users management coming soon.</p>
    </div>
  );
}
