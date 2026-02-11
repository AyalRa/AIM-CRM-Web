export default function BookingPage({ params }: { params: { slug: string } }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold">Book a Meeting</h1>
        <p className="text-muted-foreground">Booking page for: {params.slug}</p>
        <p className="text-sm text-muted-foreground">Public booking interface coming soon.</p>
      </div>
    </div>
  );
}
