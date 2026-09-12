"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type MouseEvent } from "react";
import { useToast } from "@/components/ui/Toast";
import { formatCurrency, getDiscountPercent } from "@/lib/utils";
import { useAppDispatch } from "@/store/hooks";
import { addToCart } from "@/store/cartSlice";
import type { Product } from "@/types/product";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const dispatch = useAppDispatch();
  const { pushToast } = useToast();
  const [imageFailed, setImageFailed] = useState(false);
  const [adding, setAdding] = useState(false);
  const discount = getDiscountPercent(product.price, product.compareAtPrice);
  const outOfStock = product.stock === 0;

  function handleAddToCart(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();
    if (outOfStock || adding) return;

    setAdding(true);
    dispatch(addToCart({ product, quantity: 1 }));
    pushToast(`${product.name} added to cart`);
    window.setTimeout(() => setAdding(false), 450);
  }

  return (
    <article className="group relative flex h-full flex-col bg-background transition hover:z-10 hover:shadow-lg">
      <Link
        href={`/products/${product.id}`}
        className="relative block aspect-square overflow-hidden bg-muted"
      >
        {imageFailed ? (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-zinc-100 to-zinc-200 text-xs font-medium text-muted-foreground">
            {product.name.slice(0, 18)}
          </div>
        ) : (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className="object-cover transition duration-300 group-hover:scale-105"
            onError={() => setImageFailed(true)}
          />
        )}
        {discount ? (
          <span className="absolute left-2 top-2 rounded bg-[#388e3c] px-1.5 py-0.5 text-[10px] font-bold text-white">
            {discount}% OFF
          </span>
        ) : null}
        {product.bestSeller ? (
          <span className="absolute right-2 top-2 rounded bg-[#ff9f00] px-1.5 py-0.5 text-[10px] font-bold text-white">
            Bestseller
          </span>
        ) : null}
      </Link>

      <div className="flex flex-1 flex-col gap-1.5 p-3">
        <h3 className="line-clamp-2 min-h-[2.5rem] text-sm font-medium leading-snug text-foreground">
          <Link href={`/products/${product.id}`} className="hover:text-accent">
            {product.name}
          </Link>
        </h3>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-0.5 rounded bg-[#388e3c] px-1.5 py-0.5 text-[11px] font-semibold text-white">
            {product.rating.toFixed(1)} ★
          </span>
          <span className="text-xs text-muted-foreground">
            ({product.reviewCount.toLocaleString("en-IN")})
          </span>
        </div>

        <div className="flex flex-wrap items-baseline gap-2">
          <p className="text-base font-semibold text-foreground">
            {formatCurrency(product.price)}
          </p>
          {product.compareAtPrice ? (
            <>
              <p className="text-xs text-muted-foreground line-through">
                {formatCurrency(product.compareAtPrice)}
              </p>
              {discount ? (
                <p className="text-xs font-medium text-[#388e3c]">
                  {discount}% off
                </p>
              ) : null}
            </>
          ) : null}
        </div>

        <p className="text-[11px] font-medium text-[#388e3c]">
          {product.price >= 499 ? "Free delivery" : "Delivery in 2–4 days"}
        </p>

        <button
          type="button"
          disabled={outOfStock || adding}
          onClick={handleAddToCart}
          className="mt-auto inline-flex h-9 items-center justify-center rounded-md border border-accent bg-white text-xs font-semibold text-accent transition hover:bg-accent hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          {outOfStock ? "Out of stock" : adding ? "Added" : "Add to Cart"}
        </button>
      </div>
    </article>
  );
}
