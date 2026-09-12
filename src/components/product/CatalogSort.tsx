"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SORT_OPTIONS } from "@/lib/constants";
import { buildQueryString } from "@/lib/utils";

type CatalogSortProps = {
  total: number;
  page: number;
  pageSize: number;
  title?: string;
};

export function CatalogSort({
  total,
  page,
  pageSize,
  title = "Products",
}: CatalogSortProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const sort = searchParams.get("sort") ?? "relevance";

  const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-border bg-background px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-lg font-semibold tracking-tight text-foreground">
          {title}
        </h1>
        <p className="text-xs text-muted-foreground">
          Showing {from}–{to} of {total.toLocaleString("en-IN")} products
        </p>
      </div>

      <label className="flex items-center gap-2 text-sm text-muted-foreground">
        <span className="whitespace-nowrap">Sort by</span>
        <select
          value={sort}
          onChange={(event) => {
            const next: Record<string, string | undefined> = {};
            searchParams.forEach((value, key) => {
              next[key] = value;
            });
            next.sort = event.target.value;
            next.page = "1";
            router.push(`${pathname}${buildQueryString(next)}`);
          }}
          className="h-9 rounded-md border border-border bg-background px-2 text-sm font-medium text-foreground outline-none focus:border-accent"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
