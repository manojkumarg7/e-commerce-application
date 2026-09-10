import type { Metadata } from "next";
import { ProductGrid } from "@/components/product/ProductGrid";
import { getProducts } from "@/services/productService";

export const metadata: Metadata = {
  title: "Products",
  description: "Browse the full ShopHub product catalog.",
};

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Products</h1>
        <p className="text-sm text-muted-foreground">
          Click any product to open its dynamic route: /products/[id]
        </p>
      </header>
      <ProductGrid products={products} />
    </div>
  );
}
