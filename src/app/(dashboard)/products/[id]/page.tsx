export default function ProductDetailPage({ params }: { params: { id: string } }) {
  return <p className="text-muted-foreground">Product detail: {params.id}</p>;
}
