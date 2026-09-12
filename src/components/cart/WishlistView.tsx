"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { ROUTES } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToCart } from "@/store/cartSlice";
import {
  removeFromWishlist,
  selectWishlistItems,
} from "@/store/wishlistSlice";
import { products } from "@/data/products";

export function WishlistView() {
  const dispatch = useAppDispatch();
  const { pushToast } = useToast();
  const { requireAuth } = useRequireAuth();
  const items = useAppSelector(selectWishlistItems);

  if (items.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border px-4 py-12 text-center">
        <p className="text-sm text-muted-foreground">Your wishlist is empty.</p>
        <Link
          href={ROUTES.products}
          className="mt-4 inline-flex h-11 items-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground"
        >
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => {
        const fullProduct = products.find((product) => product.id === item.id);

        return (
          <li
            key={item.id}
            className="overflow-hidden rounded-xl border border-border"
          >
            <Link href={`/products/${item.id}`} className="relative block aspect-[4/3]">
              <Image
                src={item.imageUrl}
                alt={item.name}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
            </Link>
            <div className="space-y-3 p-4">
              <div>
                <Link href={`/products/${item.id}`} className="font-semibold hover:underline">
                  {item.name}
                </Link>
                <p className="mt-1 text-sm text-muted-foreground">
                  {formatCurrency(item.price)}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  disabled={!fullProduct || item.stock === 0}
                  onClick={() => {
                    if (!fullProduct) return;
                    if (!requireAuth("Please login to add items to cart")) return;
                    dispatch(addToCart({ product: fullProduct, quantity: 1 }));
                    pushToast(`${fullProduct.name} added to cart`);
                  }}
                >
                  Add to cart
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => dispatch(removeFromWishlist(item.id))}
                >
                  Remove
                </Button>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
