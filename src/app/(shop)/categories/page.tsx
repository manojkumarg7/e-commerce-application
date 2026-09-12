import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getCategories } from "@/services/categoryService";

export const metadata: Metadata = {
  title: "Categories",
  description: "Browse ShopHub categories.",
};

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Categories</h1>
        <p className="text-sm text-muted-foreground">
          Explore departments across the marketplace
        </p>
      </header>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.slug}`}
            className="group overflow-hidden rounded-lg border border-border bg-background transition hover:shadow-md"
          >
            <div className="relative aspect-[4/3]">
              <Image
                src={category.imageUrl}
                alt={category.name}
                fill
                className="object-cover transition duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, 25vw"
              />
            </div>
            <div className="space-y-1 p-3">
              <h2 className="text-sm font-semibold">{category.name}</h2>
              <p className="line-clamp-2 text-xs text-muted-foreground">
                {category.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
