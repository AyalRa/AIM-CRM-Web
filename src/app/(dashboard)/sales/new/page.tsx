import { PageHeader } from '@/components/shared/page-header';

export default function NewSalePage() {
  return (
    <div className="space-y-6 max-w-3xl">
      <PageHeader title="New Sale" description="Create a new sale record" />
      <p className="text-muted-foreground">Sale form with line items coming soon.</p>
    </div>
  );
}
