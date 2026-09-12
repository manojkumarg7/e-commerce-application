export default function ProductsLoading() {
  return (
    <div
      className="grid gap-4 lg:grid-cols-[240px_minmax(0,1fr)]"
      aria-busy="true"
      aria-live="polite"
    >
      <div className="hidden h-96 animate-pulse rounded-lg border border-border bg-muted lg:block" />
      <div className="space-y-4">
        <div className="h-16 animate-pulse rounded-lg border border-border bg-muted" />
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="h-64 animate-pulse bg-muted" />
          ))}
        </div>
      </div>
    </div>
  );
}
