import { products } from "@/data/products";
import { PRODUCTS_PER_PAGE } from "@/lib/constants";
import type { Product } from "@/types/product";

export type ProductSort =
  | "relevance"
  | "price_asc"
  | "price_desc"
  | "rating"
  | "popularity";

export type ProductQuery = {
  page?: number;
  pageSize?: number;
  categorySlug?: string;
  q?: string;
  sort?: ProductSort;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
};

export type PaginatedProducts = {
  items: Product[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

function delay(ms = 80): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function sortProducts(list: Product[], sort: ProductSort): Product[] {
  const copy = [...list];

  switch (sort) {
    case "price_asc":
      return copy.sort((a, b) => a.price - b.price);
    case "price_desc":
      return copy.sort((a, b) => b.price - a.price);
    case "rating":
      return copy.sort((a, b) => b.rating - a.rating);
    case "popularity":
      return copy.sort((a, b) => b.reviewCount - a.reviewCount);
    case "relevance":
    default:
      return copy;
  }
}

function filterProducts(query: ProductQuery): Product[] {
  const search = query.q?.trim().toLowerCase();

  return products.filter((product) => {
    if (query.categorySlug && product.categorySlug !== query.categorySlug) {
      return false;
    }

    if (query.minPrice != null && product.price < query.minPrice) {
      return false;
    }

    if (query.maxPrice != null && product.price > query.maxPrice) {
      return false;
    }

    if (query.minRating != null && product.rating < query.minRating) {
      return false;
    }

    if (search) {
      const haystack = [
        product.name,
        product.description,
        product.categorySlug,
        ...(product.tags ?? []),
      ]
        .join(" ")
        .toLowerCase();

      if (!haystack.includes(search)) {
        return false;
      }
    }

    return true;
  });
}

export async function getProducts(): Promise<Product[]> {
  await delay();
  return products;
}

export async function queryProducts(
  query: ProductQuery = {},
): Promise<PaginatedProducts> {
  await delay();

  const pageSize = Math.max(1, query.pageSize ?? PRODUCTS_PER_PAGE);
  const page = Math.max(1, query.page ?? 1);
  const sort = query.sort ?? "relevance";

  const filtered = sortProducts(filterProducts(query), sort);
  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * pageSize;

  return {
    items: filtered.slice(start, start + pageSize),
    total,
    page: safePage,
    pageSize,
    totalPages,
  };
}

export async function getProductById(id: string): Promise<Product | null> {
  await delay();
  return products.find((product) => product.id === id) ?? null;
}

export async function getProductsByCategory(
  slug: string,
): Promise<Product[]> {
  await delay();
  return products.filter((product) => product.categorySlug === slug);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  await delay();
  return products.filter((product) => product.featured).slice(0, 8);
}

export async function getBestSellers(): Promise<Product[]> {
  await delay();
  return products.filter((product) => product.bestSeller).slice(0, 8);
}
