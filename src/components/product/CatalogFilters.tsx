"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { PRICE_FILTERS, RATING_FILTERS } from "@/lib/constants";
import { buildQueryString, cn } from "@/lib/utils";
import type { Category } from "@/data/categories";

type CatalogFiltersProps = {
  categories: Category[];
  activeCategory?: string;
};

function withParams(
  pathname: string,
  current: URLSearchParams,
  updates: Record<string, string | undefined>,
): string {
  const next: Record<string, string | undefined> = {};
  current.forEach((value, key) => {
    next[key] = value;
  });

  for (const [key, value] of Object.entries(updates)) {
    next[key] = value;
  }

  next.page = undefined;
  return `${pathname}${buildQueryString(next)}`;
}

export function CatalogFilters({
  categories,
  activeCategory,
}: CatalogFiltersProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const minRating = searchParams.get("minRating");

  return (
    <aside className="space-y-6 rounded-lg border border-border bg-background p-4">
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground">
          Filters
        </h2>
        {(minPrice || maxPrice || minRating || activeCategory) && (
          <Link
            href={pathname}
            className="mt-1 inline-block text-xs font-medium text-accent hover:underline"
          >
            Clear all
          </Link>
        )}
      </div>

      <section className="space-y-2">
        <h3 className="text-sm font-semibold text-foreground">Categories</h3>
        <ul className="space-y-1">
          <li>
            <Link
              href={
                pathname.startsWith("/categories/")
                  ? `/products${buildQueryString({
                      sort: searchParams.get("sort") ?? undefined,
                      minPrice: searchParams.get("minPrice") ?? undefined,
                      maxPrice: searchParams.get("maxPrice") ?? undefined,
                      minRating: searchParams.get("minRating") ?? undefined,
                      q: searchParams.get("q") ?? undefined,
                    })}`
                  : withParams(pathname, searchParams, {
                      category: undefined,
                    })
              }
              className={cn(
                "block rounded px-2 py-1.5 text-sm transition",
                !activeCategory
                  ? "bg-muted font-medium text-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              All
            </Link>
          </li>
          {categories.map((category) => {
            const selected = activeCategory === category.slug;
            return (
              <li key={category.id}>
                <Link
                  href={
                    pathname.startsWith("/categories/")
                      ? `/categories/${category.slug}${buildQueryString({
                          sort: searchParams.get("sort") ?? undefined,
                          minPrice: searchParams.get("minPrice") ?? undefined,
                          maxPrice: searchParams.get("maxPrice") ?? undefined,
                          minRating: searchParams.get("minRating") ?? undefined,
                          q: searchParams.get("q") ?? undefined,
                        })}`
                      : withParams(pathname, searchParams, {
                          category: category.slug,
                        })
                  }
                  className={cn(
                    "block rounded px-2 py-1.5 text-sm transition",
                    selected
                      ? "bg-muted font-medium text-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  {category.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="space-y-2">
        <h3 className="text-sm font-semibold text-foreground">Price</h3>
        <ul className="space-y-1">
          {PRICE_FILTERS.map((filter) => {
            const selected =
              minPrice === String(filter.min) &&
              (filter.max == null
                ? !maxPrice
                : maxPrice === String(filter.max));

            return (
              <li key={filter.label}>
                <Link
                  href={withParams(pathname, searchParams, {
                    minPrice: String(filter.min),
                    maxPrice:
                      filter.max != null ? String(filter.max) : undefined,
                  })}
                  className={cn(
                    "block rounded px-2 py-1.5 text-sm transition",
                    selected
                      ? "bg-muted font-medium text-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  {filter.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="space-y-2">
        <h3 className="text-sm font-semibold text-foreground">
          Customer Ratings
        </h3>
        <ul className="space-y-1">
          {RATING_FILTERS.map((rating) => {
            const selected = minRating === String(rating);
            return (
              <li key={rating}>
                <Link
                  href={withParams(pathname, searchParams, {
                    minRating: String(rating),
                  })}
                  className={cn(
                    "block rounded px-2 py-1.5 text-sm transition",
                    selected
                      ? "bg-muted font-medium text-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  {rating}★ & above
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </aside>
  );
}
