"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { ROUTES } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  removeFromCart,
  selectCartItems,
  selectCartSubtotal,
  updateQuantity,
} from "@/store/cartSlice";

const FREE_SHIPPING_THRESHOLD = 499;

export function CartView() {
  const dispatch = useAppDispatch();
  const { pushToast } = useToast();
  const items = useAppSelector(selectCartItems);
  const subtotal = useAppSelector(selectCartSubtotal);
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 40;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border bg-background px-4 py-12 text-center">
        <p className="text-base font-semibold text-foreground">
          Your cart is empty
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Add items from the catalog to get started.
        </p>
        <Link
          href={ROUTES.products}
          className="mt-4 inline-flex h-11 items-center rounded-md bg-[#fb641b] px-5 text-sm font-semibold text-white hover:bg-[#e55a16]"
        >
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div className="space-y-3">
        <div className="rounded-lg border border-border bg-background px-4 py-3">
          {remaining > 0 ? (
            <p className="text-sm text-muted-foreground">
              Add{" "}
              <span className="font-semibold text-foreground">
                {formatCurrency(remaining)}
              </span>{" "}
              more for <span className="font-semibold text-[#388e3c]">FREE delivery</span>
            </p>
          ) : (
            <p className="text-sm font-medium text-[#388e3c]">
              Yay! Your order qualifies for FREE delivery
            </p>
          )}
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-[#388e3c] transition-all duration-500"
              style={{
                width: `${Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)}%`,
              }}
            />
          </div>
        </div>

        <ul className="divide-y divide-border overflow-hidden rounded-lg border border-border bg-background">
          {items.map((item) => (
            <li
              key={item.productId}
              className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center"
            >
              <div className="relative h-20 w-20 overflow-hidden rounded-md bg-muted">
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
                  className="font-medium hover:text-accent"
                >
                  {item.name}
                </Link>
                <p className="text-sm font-semibold text-foreground">
                  {formatCurrency(item.price)}
                </p>
                <p className="text-xs text-muted-foreground">
                  Delivery by tomorrow
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="inline-flex overflow-hidden rounded-md border border-border">
                  <button
                    type="button"
                    className="h-9 w-8 bg-muted text-sm font-semibold"
                    onClick={() =>
                      dispatch(
                        updateQuantity({
                          productId: item.productId,
                          quantity: Math.max(1, item.quantity - 1),
                        }),
                      )
                    }
                    aria-label={`Decrease ${item.name}`}
                  >
                    −
                  </button>
                  <span className="flex h-9 w-10 items-center justify-center text-sm">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    className="h-9 w-8 bg-muted text-sm font-semibold"
                    onClick={() =>
                      dispatch(
                        updateQuantity({
                          productId: item.productId,
                          quantity: Math.min(item.stock, item.quantity + 1),
                        }),
                      )
                    }
                    aria-label={`Increase ${item.name}`}
                  >
                    +
                  </button>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    dispatch(removeFromCart(item.productId));
                    pushToast("Removed from cart", "info");
                  }}
                >
                  Remove
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <aside className="h-fit space-y-4 rounded-lg border border-border bg-background p-5">
        <h2 className="text-lg font-semibold">Price details</h2>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">
              Price ({items.length} item{items.length > 1 ? "s" : ""})
            </span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Delivery</span>
            <span className={shipping === 0 ? "font-medium text-[#388e3c]" : ""}>
              {shipping === 0 ? "FREE" : formatCurrency(shipping)}
            </span>
          </div>
          <div className="flex justify-between border-t border-border pt-2 text-base font-semibold">
            <span>Total amount</span>
            <span>{formatCurrency(total)}</span>
          </div>
        </div>
        <Link
          href={ROUTES.checkout}
          className="inline-flex h-11 w-full items-center justify-center rounded-md bg-[#fb641b] text-sm font-semibold text-white hover:bg-[#e55a16]"
        >
          Place Order
        </Link>
      </aside>
    </div>
  );
}
