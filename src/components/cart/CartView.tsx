"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  removeFromCart,
  selectCartItems,
  selectCartSubtotal,
  updateQuantity,
} from "@/store/cartSlice";

export function CartView() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const subtotal = useAppSelector(selectCartSubtotal);

  if (items.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border px-4 py-12 text-center">
        <p className="text-sm text-muted-foreground">Your cart is empty.</p>
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
    <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
      <ul className="divide-y divide-border rounded-xl border border-border">
        {items.map((item) => (
          <li key={item.productId} className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
            <div className="relative h-20 w-20 overflow-hidden rounded-lg bg-muted">
              <Image
                src={item.imageUrl}
                alt={item.name}
                fill
                className="object-cover"
                sizes="80px"
              />
            </div>

            <div className="flex-1 space-y-1">
              <Link
                href={`/products/${item.productId}`}
                className="font-medium hover:underline"
              >
                {item.name}
              </Link>
              <p className="text-sm text-muted-foreground">
                {formatCurrency(item.price)}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <label className="sr-only" htmlFor={`qty-${item.productId}`}>
                Quantity for {item.name}
              </label>
              <input
                id={`qty-${item.productId}`}
                type="number"
                min={1}
                max={item.stock}
                value={item.quantity}
                onChange={(event) =>
                  dispatch(
                    updateQuantity({
                      productId: item.productId,
                      quantity: Number(event.target.value) || 1,
                    }),
                  )
                }
                className="h-10 w-16 rounded-lg border border-border px-2 text-sm"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => dispatch(removeFromCart(item.productId))}
              >
                Remove
              </Button>
            </div>
          </li>
        ))}
      </ul>

      <aside className="h-fit space-y-4 rounded-xl border border-border p-5">
        <h2 className="text-lg font-semibold">Order summary</h2>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="font-medium">{formatCurrency(subtotal)}</span>
        </div>
        <Link
          href={ROUTES.checkout}
          className="inline-flex h-11 w-full items-center justify-center rounded-lg bg-primary text-sm font-medium text-primary-foreground hover:bg-zinc-800"
        >
          Checkout
        </Link>
      </aside>
    </div>
  );
}
