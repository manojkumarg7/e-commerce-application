"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToCart } from "@/store/cartSlice";
import { selectIsInWishlist, toggleWishlist } from "@/store/wishlistSlice";
import type { Product } from "@/types/product";

type ProductPurchaseActionsProps = {
  product: Product;
};

export function ProductPurchaseActions({ product }: ProductPurchaseActionsProps) {
  const dispatch = useAppDispatch();
  const inWishlist = useAppSelector((state) =>
    selectIsInWishlist(state, product.id),
  );
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState<string | null>(null);

  const outOfStock = product.stock === 0;

  function handleAddToCart() {
    dispatch(addToCart({ product, quantity }));
    setMessage(`Added ${quantity} to cart`);
  }

  function handleWishlist() {
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
    setMessage(inWishlist ? "Removed from wishlist" : "Saved to wishlist");
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <label htmlFor="quantity" className="text-sm font-medium">
          Quantity
        </label>
        <input
          id="quantity"
          type="number"
          min={1}
          max={Math.max(product.stock, 1)}
          value={quantity}
          disabled={outOfStock}
          onChange={(event) =>
            setQuantity(
              Math.max(1, Math.min(product.stock, Number(event.target.value) || 1)),
            )
          }
          className="h-11 w-20 rounded-lg border border-border bg-background px-3 text-sm outline-none ring-accent focus:ring-2"
        />
      </div>

      <div className="flex flex-wrap gap-3">
        <Button disabled={outOfStock} onClick={handleAddToCart}>
          Add to cart
        </Button>
        <Button variant="secondary" onClick={handleWishlist}>
          {inWishlist ? "Remove from wishlist" : "Add to wishlist"}
        </Button>
      </div>

      {message ? (
        <p className="text-sm text-success" role="status">
          {message}
        </p>
      ) : null}
    </div>
  );
}
