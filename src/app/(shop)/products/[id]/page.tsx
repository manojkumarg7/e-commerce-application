import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ProductPurchaseActions } from "@/components/product/ProductPurchaseActions";
import { formatCurrency } from "@/lib/utils";
import { getProductById, getProducts } from "@/services/productService";

type ProductPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({ id: product.id }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    return { title: "Product not found" };
  }

  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductDetailsPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="relative aspect-square overflow-hidden rounded-2xl border border-border bg-muted">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>

      <div className="space-y-5">
        <div className="space-y-2">
          <Link
            href={`/categories/${product.categorySlug}`}
            className="text-xs font-semibold uppercase tracking-wide text-accent hover:underline"
          >
            {product.categorySlug}
          </Link>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {product.name}
          </h1>
          <p className="text-sm text-muted-foreground">
            Product ID from URL params: <code className="rounded bg-muted px-1.5 py-0.5">{id}</code>
          </p>
        </div>

        <div className="flex items-end gap-3">
          <p className="text-3xl font-semibold">{formatCurrency(product.price)}</p>
          {product.compareAtPrice ? (
            <p className="pb-1 text-sm text-muted-foreground line-through">
              {formatCurrency(product.compareAtPrice)}
            </p>
          ) : null}
        </div>

        <p className="text-base leading-7 text-muted-foreground">
          {product.description}
        </p>

        <dl className="grid grid-cols-2 gap-3 rounded-xl border border-border p-4 text-sm">
          <div>
            <dt className="text-muted-foreground">Rating</dt>
            <dd className="font-medium">
              ★ {product.rating.toFixed(1)} ({product.reviewCount})
            </dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Stock</dt>
            <dd className="font-medium">
              {product.stock > 0 ? `${product.stock} available` : "Out of stock"}
            </dd>
          </div>
        </dl>

        <ProductPurchaseActions product={product} />
      </div>
    </div>
  );
}
