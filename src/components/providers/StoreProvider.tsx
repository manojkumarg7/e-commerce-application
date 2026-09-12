"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Provider } from "react-redux";
import { ToastProvider } from "@/components/ui/Toast";
import { STORAGE_KEYS } from "@/lib/storage";
import { makeStore, type AppStore } from "@/store";
import { hydrateAuth } from "@/store/authSlice";
import { hydrateCart } from "@/store/cartSlice";
import { hydrateWishlist } from "@/store/wishlistSlice";
import type { User } from "@/types/user";
import type { CartItem } from "@/types/cart";
import type { WishlistItem } from "@/store/wishlistSlice";

function readJson<T>(key: string): T | null {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [store] = useState<AppStore>(() => makeStore());

  useEffect(() => {
    const cart = readJson<CartItem[]>(STORAGE_KEYS.cart);
    const wishlist = readJson<WishlistItem[]>(STORAGE_KEYS.wishlist);
    const user = readJson<User>(STORAGE_KEYS.auth);

    if (cart) store.dispatch(hydrateCart(cart));
    if (wishlist) store.dispatch(hydrateWishlist(wishlist));
    if (user) store.dispatch(hydrateAuth(user));

    const unsubscribe = store.subscribe(() => {
      const state = store.getState();
      window.localStorage.setItem(
        STORAGE_KEYS.cart,
        JSON.stringify(state.cart.items),
      );
      window.localStorage.setItem(
        STORAGE_KEYS.wishlist,
        JSON.stringify(state.wishlist.items),
      );
      window.localStorage.setItem(
        STORAGE_KEYS.auth,
        JSON.stringify(state.auth.user),
      );
    });

    return unsubscribe;
  }, [store]);

  return (
    <Provider store={store}>
      <ToastProvider>{children}</ToastProvider>
    </Provider>
  );
}
