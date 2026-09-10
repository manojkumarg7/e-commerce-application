import Image from "next/image";
import Link from "next/link";
import { ProductGrid } from "@/components/product/ProductGrid";
import { ROUTES } from "@/lib/constants";
import { getCategories } from "@/services/categoryService";
import {
  getBestSellers,
  getFeaturedProducts,
} from "@/services/productService";

export default async function HomePage() {
  const [featured, bestSellers, categories] = await Promise.all([
    getFeaturedProducts(),
    getBestSellers(),
    getCategories(),
  ]);

  return (
    <div className="space-y-14">
      <section className="relative overflow-hidden rounded-2xl bg-zinc-950 text-white">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80"
            alt="ShopHub store atmosphere"
            fill
            priority
            className="object-cover opacity-45"
            sizes="100vw"
          />
        </div>
        <div className="relative z-10 flex min-h-[420px] flex-col justify-end gap-4 px-6 py-10 sm:px-10 sm:py-14 lg:min-h-[480px]">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-200">
            ShopHub
          </p>
          <h1 className="max-w-xl text-4xl font-semibold tracking-tight sm:text-5xl">
            Modern shopping, built the Next.js way
          </h1>
          <p className="max-w-lg text-base leading-7 text-zinc-200 sm:text-lg">
            Browse curated products with App Router layouts, dynamic routes, and
            a service layer ready for real APIs.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href={ROUTES.products}
              className="inline-flex h-11 items-center rounded-lg bg-white px-5 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200"
            >
              Shop products
            </Link>
            <Link
              href={ROUTES.categories}
              className="inline-flex h-11 items-center rounded-lg border border-white/40 px-5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Browse categories
            </Link>
          </div>
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Categories</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Dynamic routes like /categories/electronics
            </p>
          </div>
          <Link href={ROUTES.categories} className="text-sm font-medium text-accent hover:underline">
            View all
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="group relative overflow-hidden rounded-xl border border-border"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={category.imageUrl}
                  alt={category.name}
                  fill
                  className="object-cover transition duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <p className="absolute bottom-3 left-3 text-sm font-semibold text-white">
                {category.name}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Featured</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Highlighted picks from the catalog
          </p>
        </div>
        <ProductGrid products={featured} />
      </section>

      <section className="space-y-5">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Best sellers</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Popular items customers buy most
          </p>
        </div>
        <ProductGrid products={bestSellers} />
      </section>

      <section className="rounded-2xl border border-border bg-muted/50 px-6 py-10 text-center sm:px-10">
        <h2 className="text-2xl font-semibold tracking-tight">Free shipping this week</h2>
        <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
          Orders over $75 ship free. Explore the cart and checkout flow in later
          phases — routing and layouts are already production-shaped.
        </p>
        <Link
          href={ROUTES.products}
          className="mt-5 inline-flex h-11 items-center rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground hover:bg-zinc-800"
        >
          Start shopping
        </Link>
      </section>
    </div>
  );
}
