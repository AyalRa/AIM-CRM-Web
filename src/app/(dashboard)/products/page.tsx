import { PageHeader } from '@/components/shared/page-header';

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Products" description="Manage your products and services" action={{ label: 'Add Product' }} />
      <p className="text-muted-foreground">Products table coming soon.</p>
    </div>
  );
}
