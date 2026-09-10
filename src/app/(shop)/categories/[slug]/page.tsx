import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ProductGrid } from "@/components/product/ProductGrid";
import { getCategories, getCategoryBySlug } from "@/services/categoryService";
import { getProductsByCategory } from "@/services/productService";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return { title: "Category not found" };
  }

  return {
    title: category.name,
    description: category.description,
  };
}

export default async function CategoryDetailsPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const products = await getProductsByCategory(slug);

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-accent">
          /categories/{slug}
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">{category.name}</h1>
        <p className="text-sm text-muted-foreground">{category.description}</p>
      </header>
      <ProductGrid products={products} />
    </div>
  );
}
