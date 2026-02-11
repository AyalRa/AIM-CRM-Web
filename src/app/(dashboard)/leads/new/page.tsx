import { PageHeader } from '@/components/shared/page-header';
import { LeadForm } from '@/components/leads/lead-form';

export default function NewLeadPage() {
  return (
    <div className="space-y-6 max-w-2xl">
      <PageHeader title="New Lead" description="Add a new lead to your pipeline" />
      <LeadForm />
    </div>
  );
}
