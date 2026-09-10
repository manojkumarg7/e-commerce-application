import type { Product } from "@/types/product";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type WishlistItem = Pick<
  Product,
  "id" | "name" | "price" | "imageUrl" | "categorySlug" | "stock"
>;

type WishlistState = {
  items: WishlistItem[];
};

const initialState: WishlistState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    toggleWishlist: (state, action: PayloadAction<WishlistItem>) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id,
      );

      if (index >= 0) {
        state.items.splice(index, 1);
        return;
      }

      state.items.push(action.payload);
    },
    removeFromWishlist: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    hydrateWishlist: (state, action: PayloadAction<WishlistItem[]>) => {
      state.items = action.payload;
    },
  },
});

export const { toggleWishlist, removeFromWishlist, hydrateWishlist } =
  wishlistSlice.actions;

export const selectWishlistItems = (state: { wishlist: WishlistState }) =>
  state.wishlist.items;

export const selectWishlistCount = (state: { wishlist: WishlistState }) =>
  state.wishlist.items.length;

export const selectIsInWishlist = (
  state: { wishlist: WishlistState },
  productId: string,
) => state.wishlist.items.some((item) => item.id === productId);

export default wishlistSlice.reducer;
