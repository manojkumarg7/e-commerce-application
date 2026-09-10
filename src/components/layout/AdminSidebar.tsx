"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { APP_NAME, ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";

const adminLinks = [
  { href: ROUTES.admin, label: "Overview", exact: true },
  { href: `${ROUTES.admin}/products`, label: "Products" },
  { href: `${ROUTES.admin}/orders`, label: "Orders" },
  { href: `${ROUTES.admin}/users`, label: "Users" },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="border-b border-border bg-zinc-950 text-zinc-100 md:min-h-screen md:w-64 md:shrink-0 md:border-b-0 md:border-r md:border-zinc-800">
      <div className="px-4 py-5">
        <Link href={ROUTES.admin} className="block text-lg font-semibold">
          {APP_NAME} Admin
        </Link>
        <p className="mt-1 text-xs text-zinc-400">Operations dashboard</p>
      </div>

      <nav className="flex gap-1 overflow-x-auto px-2 pb-3 md:flex-col md:overflow-visible md:px-3" aria-label="Admin">
        {adminLinks.map((link) => {
          const active = link.exact
            ? pathname === link.href
            : pathname.startsWith(link.href);

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-300 hover:bg-zinc-900 hover:text-white",
              )}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="hidden border-t border-zinc-800 px-4 py-4 md:block">
        <Link
          href={ROUTES.home}
          className="text-sm text-zinc-400 transition-colors hover:text-white"
        >
          ← Back to store
        </Link>
      </div>
    </aside>
  );
}
