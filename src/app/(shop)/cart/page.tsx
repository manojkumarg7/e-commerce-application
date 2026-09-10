import type { Metadata } from "next";
import { CartView } from "@/components/cart/CartView";

export const metadata: Metadata = {
  title: "Cart",
};

export default function CartPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Cart</h1>
        <p className="text-sm text-muted-foreground">
          Managed with Redux Toolkit and persisted in localStorage.
        </p>
      </header>
      <CartView />
    </div>
  );
}
