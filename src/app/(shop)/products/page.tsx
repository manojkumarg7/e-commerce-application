import type { Metadata } from "next";
import { CatalogListing } from "@/components/product/CatalogListing";
import { getCategories } from "@/services/categoryService";
import {
  queryProducts,
  type ProductSort,
} from "@/services/productService";

export const metadata: Metadata = {
  title: "All Products",
  description: "Browse the full ShopHub product catalog with filters and pagination.",
};

type ProductsPageProps = {
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

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const page = Number(first(params.page) ?? "1") || 1;
  const q = first(params.q);
  const sort = parseSort(first(params.sort));
  const category = first(params.category);
  const minPrice = first(params.minPrice)
    ? Number(first(params.minPrice))
    : undefined;
  const maxPrice = first(params.maxPrice)
    ? Number(first(params.maxPrice))
    : undefined;
  const minRating = first(params.minRating)
    ? Number(first(params.minRating))
    : undefined;

  const [result, categories] = await Promise.all([
    queryProducts({
      page,
      q,
      sort,
      categorySlug: category,
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
      title={q ? `Results for "${q}"` : "All Products"}
      basePath="/products"
      activeCategory={category}
      query={{
        q,
        sort: sort === "relevance" ? undefined : sort,
        category,
        minPrice,
        maxPrice,
        minRating,
      }}
    />
  );
}
