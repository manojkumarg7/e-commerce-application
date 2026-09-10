import Link from "next/link";

export default function CategoryNotFound() {
  return (
    <div className="mx-auto max-w-lg space-y-4 py-16 text-center">
      <h1 className="text-2xl font-semibold">Category not found</h1>
      <p className="text-sm text-muted-foreground">
        Try{" "}
        <Link href="/categories/electronics" className="font-medium text-accent hover:underline">
          /categories/electronics
        </Link>
        .
      </p>
      <Link
        href="/categories"
        className="inline-flex h-11 items-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground"
      >
        All categories
      </Link>
    </div>
  );
}
