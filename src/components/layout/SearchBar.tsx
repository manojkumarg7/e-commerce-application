"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useRef, useState, type FormEvent } from "react";
import { ROUTES } from "@/lib/constants";

export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [isSearching, setIsSearching] = useState(false);
  const timerRef = useRef<number | null>(null);

  function navigate(value: string) {
    setIsSearching(true);
    if (!value) {
      router.push(ROUTES.products);
    } else {
      router.push(`${ROUTES.products}?q=${encodeURIComponent(value)}`);
    }
    window.setTimeout(() => setIsSearching(false), 350);
  }

  function onChange(value: string) {
    setQuery(value);
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
    }
    timerRef.current = window.setTimeout(() => {
      navigate(value.trim());
    }, 450);
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
    }
    navigate(query.trim());
  }

  return (
    <form onSubmit={onSubmit} className="relative w-full max-w-xl flex-1">
      <label htmlFor="catalog-search" className="sr-only">
        Search products
      </label>
      <input
        id="catalog-search"
        type="search"
        value={query}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search for products, brands and more"
        className="h-10 w-full rounded-md border-0 bg-white px-4 pr-28 text-sm text-zinc-900 shadow-sm outline-none placeholder:text-zinc-400 focus:ring-2 focus:ring-white/40"
        autoComplete="off"
      />
      <button
        type="submit"
        className="absolute right-1 top-1 inline-flex h-8 items-center gap-1.5 rounded bg-[#fb641b] px-3 text-xs font-semibold text-white transition hover:bg-[#e55a16]"
      >
        {isSearching ? (
          <span className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
        ) : null}
        Search
      </button>
    </form>
  );
}
