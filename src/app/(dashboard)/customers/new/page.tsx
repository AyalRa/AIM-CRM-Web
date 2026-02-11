import { PageHeader } from '@/components/shared/page-header';
import { CustomerForm } from '@/components/customers/customer-form';

export default function NewCustomerPage() {
  return (
    <div className="space-y-6 max-w-2xl">
      <PageHeader title="New Customer" description="Add a new customer" />
      <CustomerForm />
    </div>
  );
}
