import Link from "next/link";

export default function ProductNotFound() {
  return (
    <div className="mx-auto max-w-lg space-y-4 py-16 text-center">
      <h1 className="text-2xl font-semibold">Product not found</h1>
      <p className="text-sm text-muted-foreground">
        No product matches this dynamic route id. Try{" "}
        <Link href="/products/1" className="font-medium text-accent hover:underline">
          /products/1
        </Link>
        .
      </p>
      <Link
        href="/products"
        className="inline-flex h-11 items-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground"
      >
        Back to products
      </Link>
    </div>
  );
}
