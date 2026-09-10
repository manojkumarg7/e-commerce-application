import { products } from "@/data/products";
import type { Product } from "@/types/product";

function delay(ms = 120): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getProducts(): Promise<Product[]> {
  await delay();
  return products;
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
  return products.filter((product) => product.featured);
}

export async function getBestSellers(): Promise<Product[]> {
  await delay();
  return products.filter((product) => product.bestSeller);
}
