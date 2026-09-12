import { ProductCard } from "@/components/product/ProductCard";
import type { Product } from "@/types/product";

type ProductGridProps = {
  products: Product[];
};

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-border bg-background px-4 py-16 text-center text-sm text-muted-foreground">
        No products found. Try changing filters or search.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {products.map((product) => (
        <div key={product.id} className="bg-background">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}
