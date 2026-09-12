import Link from "next/link";
import { cn } from "@/lib/utils";

type PaginationProps = {
  page: number;
  totalPages: number;
  hrefForPage: (page: number) => string;
};

function pageWindow(current: number, total: number): Array<number | "ellipsis"> {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages = new Set<number>([1, total, current, current - 1, current + 1]);
  if (current <= 3) {
    pages.add(2);
    pages.add(3);
    pages.add(4);
  }
  if (current >= total - 2) {
    pages.add(total - 1);
    pages.add(total - 2);
    pages.add(total - 3);
  }

  const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
  const result: Array<number | "ellipsis"> = [];

  for (let i = 0; i < sorted.length; i += 1) {
    const page = sorted[i];
    const prev = sorted[i - 1];
    if (prev != null && page - prev > 1) {
      result.push("ellipsis");
    }
    result.push(page);
  }

  return result;
}

export function Pagination({ page, totalPages, hrefForPage }: PaginationProps) {
  if (totalPages <= 1) return null;

  const items = pageWindow(page, totalPages);

  return (
    <nav
      className="flex flex-wrap items-center justify-center gap-1 pt-2"
      aria-label="Pagination"
    >
      <Link
        href={hrefForPage(Math.max(1, page - 1))}
        aria-disabled={page <= 1}
        className={cn(
          "rounded-md border border-border bg-background px-3 py-2 text-sm font-medium transition",
          page <= 1
            ? "pointer-events-none text-muted-foreground opacity-50"
            : "text-foreground hover:border-accent hover:text-accent",
        )}
      >
        Previous
      </Link>

      {items.map((item, index) =>
        item === "ellipsis" ? (
          <span
            key={`ellipsis-${index}`}
            className="px-2 text-sm text-muted-foreground"
          >
            …
          </span>
        ) : (
          <Link
            key={item}
            href={hrefForPage(item)}
            aria-current={item === page ? "page" : undefined}
            className={cn(
              "min-w-10 rounded-md border px-3 py-2 text-center text-sm font-medium transition",
              item === page
                ? "border-accent bg-accent text-accent-foreground"
                : "border-border bg-background text-foreground hover:border-accent hover:text-accent",
            )}
          >
            {item}
          </Link>
        ),
      )}

      <Link
        href={hrefForPage(Math.min(totalPages, page + 1))}
        aria-disabled={page >= totalPages}
        className={cn(
          "rounded-md border border-border bg-background px-3 py-2 text-sm font-medium transition",
          page >= totalPages
            ? "pointer-events-none text-muted-foreground opacity-50"
            : "text-foreground hover:border-accent hover:text-accent",
        )}
      >
        Next
      </Link>
    </nav>
  );
}
