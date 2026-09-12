import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CatalogListing } from "@/components/product/CatalogListing";
import { getCategories, getCategoryBySlug } from "@/services/categoryService";
import {
  queryProducts,
  type ProductSort,
} from "@/services/productService";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function parseSort(value?: string): ProductSort {
  const allowed: ProductSort[] = [
    "relevance",
    "price_asc",
    "price_desc",
    "rating",
    "popularity",
  ];
  return allowed.includes(value as ProductSort)
    ? (value as ProductSort)
    : "relevance";
}

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

export default async function CategoryDetailsPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const queryParams = await searchParams;
  const page = Number(first(queryParams.page) ?? "1") || 1;
  const q = first(queryParams.q);
  const sort = parseSort(first(queryParams.sort));
  const minPrice = first(queryParams.minPrice)
    ? Number(first(queryParams.minPrice))
    : undefined;
  const maxPrice = first(queryParams.maxPrice)
    ? Number(first(queryParams.maxPrice))
    : undefined;
  const minRating = first(queryParams.minRating)
    ? Number(first(queryParams.minRating))
    : undefined;

  const [result, categories] = await Promise.all([
    queryProducts({
      page,
      q,
      sort,
      categorySlug: slug,
      minPrice,
      maxPrice,
      minRating,
    }),
    getCategories(),
  ]);

  return (
    <CatalogListing
      result={result}
      categories={categories}
      title={category.name}
      basePath={`/categories/${slug}`}
      activeCategory={slug}
      query={{
        q,
        sort: sort === "relevance" ? undefined : sort,
        minPrice,
        maxPrice,
        minRating,
      }}
    />
  );
}
