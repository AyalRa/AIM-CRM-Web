import { PageHeader } from '@/components/shared/page-header';

export default function CustomFieldsSettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Custom Fields" description="Define custom data fields for entities" action={{ label: 'Add Field' }} />
      <p className="text-muted-foreground">Custom fields builder coming soon.</p>
    </div>
  );
}
