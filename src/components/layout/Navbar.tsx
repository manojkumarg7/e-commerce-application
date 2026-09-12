"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, useState } from "react";
import { SearchBar } from "@/components/layout/SearchBar";
import { APP_NAME, ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout, selectCurrentUser } from "@/store/authSlice";
import { selectCartCount } from "@/store/cartSlice";
import { selectWishlistCount } from "@/store/wishlistSlice";

const navLinks = [
  { href: ROUTES.home, label: "Home" },
  { href: ROUTES.products, label: "All Products" },
  { href: ROUTES.categories, label: "Categories" },
  { href: ROUTES.wishlist, label: "Wishlist" },
  { href: ROUTES.orders, label: "Orders" },
];

function SearchFallback() {
  return (
    <div className="h-10 w-full max-w-xl flex-1 animate-pulse rounded-md bg-white/20" />
  );
}

export function Navbar() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const cartCount = useAppSelector(selectCartCount);
  const wishlistCount = useAppSelector(selectWishlistCount);
  const user = useAppSelector(selectCurrentUser);

  return (
    <header className="sticky top-0 z-50 bg-accent text-accent-foreground shadow-sm">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <Link
            href={ROUTES.home}
            className="shrink-0 text-xl font-bold tracking-tight text-white"
          >
            {APP_NAME}
          </Link>

          <div className="hidden flex-1 justify-center md:flex">
            <Suspense fallback={<SearchFallback />}>
              <SearchBar />
            </Suspense>
          </div>

          <div className="hidden items-center gap-1 md:flex">
            <Link
              href={ROUTES.cart}
              className="relative rounded-md px-3 py-2 text-sm font-medium text-white/90 transition hover:bg-white/10"
            >
              Cart
              {cartCount > 0 ? (
                <span className="absolute -right-0.5 -top-0.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[#fb641b] px-1 text-[10px] font-bold text-white shadow-sm transition-transform">
                  {cartCount}
                </span>
              ) : null}
            </Link>
            {user ? (
              <>
                <Link
                  href={ROUTES.profile}
                  className="rounded-md px-3 py-2 text-sm font-medium text-white/90 transition hover:bg-white/10"
                >
                  {user.name}
                </Link>
                <button
                  type="button"
                  onClick={() => dispatch(logout())}
                  className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-accent transition hover:bg-zinc-100"
                >
                  Sign out
                </button>
              </>
            ) : (
              <Link
                href={ROUTES.login}
                className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-accent transition hover:bg-zinc-100"
              >
                Sign in
              </Link>
            )}
          </div>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/30 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">Menu</span>
            <span aria-hidden className="flex flex-col gap-1.5">
              <span
                className={cn(
                  "block h-0.5 w-5 bg-white transition",
                  open && "translate-y-2 rotate-45",
                )}
              />
              <span
                className={cn(
                  "block h-0.5 w-5 bg-white transition",
                  open && "opacity-0",
                )}
              />
              <span
                className={cn(
                  "block h-0.5 w-5 bg-white transition",
                  open && "-translate-y-2 -rotate-45",
                )}
              />
            </span>
          </button>
        </div>

        <div className="md:hidden">
          <Suspense fallback={<SearchFallback />}>
            <SearchBar />
          </Suspense>
        </div>

        <nav
          className="hidden items-center gap-1 overflow-x-auto md:flex"
          aria-label="Main"
        >
          {navLinks.map((link) => {
            const active =
              link.href === ROUTES.home
                ? pathname === link.href
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition",
                  active
                    ? "bg-white/20 text-white"
                    : "text-white/85 hover:bg-white/10 hover:text-white",
                )}
              >
                {link.label}
                {link.href === ROUTES.wishlist && wishlistCount > 0
                  ? ` (${wishlistCount})`
                  : ""}
              </Link>
            );
          })}
        </nav>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          className="border-t border-white/20 px-4 py-3 md:hidden"
          aria-label="Mobile"
        >
          <ul className="flex flex-col gap-1">
            {[
              ...navLinks.map((link) =>
                link.href === ROUTES.wishlist
                  ? {
                      ...link,
                      label:
                        wishlistCount > 0
                          ? `Wishlist (${wishlistCount})`
                          : "Wishlist",
                    }
                  : link,
              ),
              {
                href: ROUTES.cart,
                label: cartCount > 0 ? `Cart (${cartCount})` : "Cart",
              },
              user
                ? { href: ROUTES.profile, label: "Profile" }
                : { href: ROUTES.login, label: "Sign in" },
            ].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-white/10"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            {user ? (
              <li>
                <button
                  type="button"
                  className="block w-full rounded-md px-3 py-2 text-left text-sm font-medium text-white hover:bg-white/10"
                  onClick={() => {
                    dispatch(logout());
                    setOpen(false);
                  }}
                >
                  Sign out
                </button>
              </li>
            ) : null}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
