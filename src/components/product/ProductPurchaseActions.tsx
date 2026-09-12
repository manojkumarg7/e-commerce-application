"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToCart } from "@/store/cartSlice";
import { selectIsInWishlist, toggleWishlist } from "@/store/wishlistSlice";
import type { Product } from "@/types/product";

type ProductPurchaseActionsProps = {
  product: Product;
};

export function ProductPurchaseActions({ product }: ProductPurchaseActionsProps) {
  const dispatch = useAppDispatch();
  const { pushToast } = useToast();
  const { requireAuth } = useRequireAuth();
  const inWishlist = useAppSelector((state) =>
    selectIsInWishlist(state, product.id),
  );
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);

  const outOfStock = product.stock === 0;

  function handleAddToCart() {
    if (outOfStock || adding) return;
    if (!requireAuth("Please login to add items to cart")) return;

    setAdding(true);
    dispatch(addToCart({ product, quantity }));
    pushToast(`Added ${quantity} × ${product.name} to cart`);
    window.setTimeout(() => setAdding(false), 500);
  }

  function handleWishlist() {
    if (!requireAuth("Please login to save items to wishlist")) return;

    dispatch(
      toggleWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        categorySlug: product.categorySlug,
        stock: product.stock,
      }),
    );
    pushToast(
      inWishlist ? "Removed from wishlist" : "Saved to wishlist",
      "info",
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <label htmlFor="quantity" className="text-sm font-medium">
          Quantity
        </label>
        <div className="inline-flex overflow-hidden rounded-lg border border-border">
          <button
            type="button"
            disabled={outOfStock || quantity <= 1}
            onClick={() => setQuantity((value) => Math.max(1, value - 1))}
            className="h-11 w-10 bg-muted text-lg font-semibold disabled:opacity-40"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <input
            id="quantity"
            type="number"
            min={1}
            max={Math.max(product.stock, 1)}
            value={quantity}
            disabled={outOfStock}
            onChange={(event) =>
              setQuantity(
                Math.max(
                  1,
                  Math.min(product.stock, Number(event.target.value) || 1),
                ),
              )
            }
            className="h-11 w-14 border-x border-border bg-background text-center text-sm outline-none"
          />
          <button
            type="button"
            disabled={outOfStock || quantity >= product.stock}
            onClick={() =>
              setQuantity((value) => Math.min(product.stock, value + 1))
            }
            className="h-11 w-10 bg-muted text-lg font-semibold disabled:opacity-40"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button
          disabled={outOfStock || adding}
          onClick={handleAddToCart}
          className="min-w-40 bg-[#fb641b] hover:bg-[#e55a16]"
        >
          {adding ? "Adding…" : "Add to cart"}
        </Button>
        <Button
          variant="secondary"
          onClick={handleWishlist}
          className="min-w-40"
        >
          {inWishlist ? "Wishlisted" : "Add to wishlist"}
        </Button>
      </div>

      <p className="text-xs text-muted-foreground">
        {outOfStock
          ? "Currently unavailable"
          : product.stock <= 10
            ? `Only ${product.stock} left — order soon`
            : "In stock · Delivery by tomorrow for most pin codes"}
      </p>
    </div>
  );
}
