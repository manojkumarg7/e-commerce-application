import Link from "next/link";
import type { Category } from "@/data/categories";
import { cn } from "@/lib/utils";

type CategoryChipsProps = {
  categories: Category[];
  activeSlug?: string;
};

export function CategoryChips({ categories, activeSlug }: CategoryChipsProps) {
  return (
    <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
      <Link
        href="/products"
        className={cn(
          "shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold transition",
          !activeSlug
            ? "border-accent bg-accent text-white"
            : "border-border bg-background text-foreground hover:border-accent hover:text-accent",
        )}
      >
        All
      </Link>
      {categories.map((category) => {
        const active = activeSlug === category.slug;
        return (
          <Link
            key={category.id}
            href={`/categories/${category.slug}`}
            className={cn(
              "shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold transition",
              active
                ? "border-accent bg-accent text-white"
                : "border-border bg-background text-foreground hover:border-accent hover:text-accent",
            )}
          >
            {category.name}
          </Link>
        );
      })}
    </div>
  );
}
