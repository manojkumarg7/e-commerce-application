import type { Metadata } from "next";
import Link from "next/link";
import { ROUTES } from "@/lib/constants";
import { getOrders } from "@/services/orderService";
import { getProducts } from "@/services/productService";

export const metadata: Metadata = {
  title: "Admin Dashboard",
};

export default async function AdminDashboardPage() {
  const [products, orders] = await Promise.all([getProducts(), getOrders()]);

  const stats = [
    { label: "Products", value: products.length, href: `${ROUTES.admin}/products` },
    { label: "Orders", value: orders.length, href: `${ROUTES.admin}/orders` },
    { label: "Users", value: 1, href: `${ROUTES.admin}/users` },
  ];

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Admin layout with persistent sidebar — similar to real ops tools.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="rounded-xl border border-border bg-background p-5 transition hover:border-zinc-300"
          >
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="mt-2 text-3xl font-semibold">{stat.value}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
