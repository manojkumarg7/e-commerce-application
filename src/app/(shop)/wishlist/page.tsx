import type { Metadata } from "next";
import { WishlistView } from "@/components/cart/WishlistView";

export const metadata: Metadata = {
  title: "Wishlist",
};

export default function WishlistPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Wishlist</h1>
        <p className="text-sm text-muted-foreground">
          Saved items stored in the Redux wishlist slice.
        </p>
      </header>
      <WishlistView />
    </div>
  );
}
