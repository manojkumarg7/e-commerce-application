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
    <div className="space-y-8">
      <section className="overflow-hidden rounded-lg bg-accent text-white shadow-sm">
        <div className="grid md:grid-cols-2">
          <div className="flex flex-col justify-center gap-4 px-6 py-10 sm:px-10">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/80">
              {`Big Sale`}
            </p>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              ShopHub Mega Deals
            </h1>
            <p className="max-w-md text-sm leading-6 text-white/85 sm:text-base">
              Thousands of products across mobiles, fashion, home, and more —
              with filters, sort, and page-by-page browsing.
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              <Link
                href={ROUTES.products}
                className="inline-flex h-11 items-center rounded-md bg-[#fb641b] px-5 text-sm font-semibold text-white transition hover:bg-[#e55a16]"
              >
                Explore products
              </Link>
              <Link
                href={ROUTES.categories}
                className="inline-flex h-11 items-center rounded-md border border-white/40 px-5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Shop by category
              </Link>
            </div>
          </div>
          <div className="relative min-h-[220px] md:min-h-full">
            <Image
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80"
              alt="ShopHub deals"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">
              Shop by category
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Browse popular departments
            </p>
          </div>
          <Link
            href={ROUTES.categories}
            className="text-sm font-medium text-accent hover:underline"
          >
            View all
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="group overflow-hidden rounded-lg border border-border bg-background transition hover:shadow-md"
            >
              <div className="relative aspect-square">
                <Image
                  src={category.imageUrl}
                  alt={category.name}
                  fill
                  className="object-cover transition duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, 12vw"
                />
              </div>
              <p className="truncate px-2 py-2 text-center text-xs font-semibold text-foreground">
                {category.name}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">
              Featured deals
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Hand-picked offers for you
            </p>
          </div>
          <Link
            href={ROUTES.products}
            className="text-sm font-medium text-accent hover:underline"
          >
            See all
          </Link>
        </div>
        <ProductGrid products={featured} />
      </section>

      <section className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">
              Best sellers
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Most popular picks this week
            </p>
          </div>
          <Link
            href={`${ROUTES.products}?sort=popularity`}
            className="text-sm font-medium text-accent hover:underline"
          >
            See all
          </Link>
        </div>
        <ProductGrid products={bestSellers} />
      </section>

      <section className="rounded-lg border border-border bg-background px-6 py-8 text-center sm:px-10">
        <h2 className="text-xl font-semibold tracking-tight">
          Free delivery on orders above ₹499
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
          Explore the full catalog with search, filters, and pagination — just
          like a large marketplace.
        </p>
        <Link
          href={ROUTES.products}
          className="mt-5 inline-flex h-11 items-center rounded-md bg-accent px-5 text-sm font-semibold text-accent-foreground hover:bg-[#1f5fd0]"
        >
          Start shopping
        </Link>
      </section>
    </div>
  );
}
