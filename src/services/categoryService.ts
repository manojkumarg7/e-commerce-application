import { categories, type Category } from "@/data/categories";

export async function getCategories(): Promise<Category[]> {
  return categories;
}

export async function getCategoryBySlug(
  slug: string,
): Promise<Category | null> {
  return categories.find((category) => category.slug === slug) ?? null;
}
