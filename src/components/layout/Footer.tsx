import Link from "next/link";
import { APP_NAME, ROUTES } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-muted/40">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="sm:col-span-2 lg:col-span-1">
          <p className="text-lg font-semibold tracking-tight">{APP_NAME}</p>
          <p className="mt-2 max-w-xs text-sm leading-6 text-muted-foreground">
            A production-style Next.js storefront built for learning App Router
            architecture.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold text-foreground">Shop</p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link href={ROUTES.products} className="hover:text-foreground">
                Products
              </Link>
            </li>
            <li>
              <Link href={ROUTES.categories} className="hover:text-foreground">
                Categories
              </Link>
            </li>
            <li>
              <Link href={ROUTES.wishlist} className="hover:text-foreground">
                Wishlist
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-foreground">Account</p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link href={ROUTES.login} className="hover:text-foreground">
                Login
              </Link>
            </li>
            <li>
              <Link href={ROUTES.profile} className="hover:text-foreground">
                Profile
              </Link>
            </li>
            <li>
              <Link href={ROUTES.orders} className="hover:text-foreground">
                Orders
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-foreground">Admin</p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link href={ROUTES.admin} className="hover:text-foreground">
                Dashboard
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {APP_NAME}. Built for learning & interviews.
      </div>
    </footer>
  );
}
