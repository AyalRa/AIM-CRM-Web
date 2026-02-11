export default function SaleDetailPage({ params }: { params: { id: string } }) {
  return <p className="text-muted-foreground">Sale detail: {params.id}</p>;
}
