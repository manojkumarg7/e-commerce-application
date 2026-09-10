import Link from "next/link";

export default function OrderNotFound() {
  return (
    <div className="mx-auto max-w-lg space-y-4 py-16 text-center">
      <h1 className="text-2xl font-semibold">Order not found</h1>
      <p className="text-sm text-muted-foreground">
        Try{" "}
        <Link href="/orders/ORD001" className="font-medium text-accent hover:underline">
          /orders/ORD001
        </Link>
        .
      </p>
      <Link
        href="/orders"
        className="inline-flex h-11 items-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground"
      >
        All orders
      </Link>
    </div>
  );
}
