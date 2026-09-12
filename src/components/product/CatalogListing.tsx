import { Suspense } from "react";
import { CatalogFilters } from "@/components/product/CatalogFilters";
import { CatalogSort } from "@/components/product/CatalogSort";
import { CategoryChips } from "@/components/product/CategoryChips";
import { Pagination } from "@/components/product/Pagination";
import { ProductGrid } from "@/components/product/ProductGrid";
import type { Category } from "@/data/categories";
import { buildQueryString } from "@/lib/utils";
import type { PaginatedProducts, ProductSort } from "@/services/productService";

type CatalogListingProps = {
  result: PaginatedProducts;
  categories: Category[];
  title: string;
  basePath: string;
  activeCategory?: string;
  query: {
    q?: string;
    sort?: ProductSort;
    minPrice?: number;
    maxPrice?: number;
    minRating?: number;
    category?: string;
  };
};

function FiltersFallback() {
  return (
    <div className="h-80 animate-pulse rounded-lg border border-border bg-muted" />
  );
}

export function CatalogListing({
  result,
  categories,
  title,
  basePath,
  activeCategory,
  query,
}: CatalogListingProps) {
  const hrefForPage = (page: number) =>
    `${basePath}${buildQueryString({
      ...query,
      page: page > 1 ? page : undefined,
    })}`;

  return (
    <div className="space-y-4">
      <CategoryChips categories={categories} activeSlug={activeCategory} />

      <div className="grid gap-4 lg:grid-cols-[240px_minmax(0,1fr)]">
        <Suspense fallback={<FiltersFallback />}>
          <CatalogFilters
            categories={categories}
            activeCategory={activeCategory}
          />
        </Suspense>

        <div className="space-y-4">
          <Suspense
            fallback={
              <div className="h-16 animate-pulse rounded-lg border border-border bg-muted" />
            }
          >
            <CatalogSort
              title={title}
              total={result.total}
              page={result.page}
              pageSize={result.pageSize}
            />
          </Suspense>

          <ProductGrid products={result.items} />

          <Pagination
            page={result.page}
            totalPages={result.totalPages}
            hrefForPage={hrefForPage}
          />
        </div>
      </div>
    </div>
  );
}
