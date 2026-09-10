import type { CartItem } from "@/types/cart";
import type { Product } from "@/types/product";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type CartState = {
  items: CartItem[];
};

const initialState: CartState = {
  items: [],
};

function toCartItem(product: Product, quantity = 1): CartItem {
  return {
    productId: product.id,
    name: product.name,
    price: product.price,
    imageUrl: product.imageUrl,
    quantity,
    stock: product.stock,
  };
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{ product: Product; quantity?: number }>,
    ) => {
      const quantity = action.payload.quantity ?? 1;
      const existing = state.items.find(
        (item) => item.productId === action.payload.product.id,
      );

      if (existing) {
        existing.quantity = Math.min(
          existing.stock,
          existing.quantity + quantity,
        );
        return;
      }

      state.items.push(toCartItem(action.payload.product, quantity));
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item) => item.productId !== action.payload,
      );
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ productId: string; quantity: number }>,
    ) => {
      const item = state.items.find(
        (cartItem) => cartItem.productId === action.payload.productId,
      );
      if (!item) return;

      if (action.payload.quantity <= 0) {
        state.items = state.items.filter(
          (cartItem) => cartItem.productId !== action.payload.productId,
        );
        return;
      }

      item.quantity = Math.min(item.stock, action.payload.quantity);
    },
    clearCart: (state) => {
      state.items = [];
    },
    hydrateCart: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  hydrateCart,
} = cartSlice.actions;

export const selectCartItems = (state: { cart: CartState }) => state.cart.items;

export const selectCartCount = (state: { cart: CartState }) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);

export const selectCartSubtotal = (state: { cart: CartState }) =>
  state.cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

export default cartSlice.reducer;
