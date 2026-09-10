import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/store/authSlice";
import cartReducer from "@/store/cartSlice";
import wishlistReducer from "@/store/wishlistSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      cart: cartReducer,
      wishlist: wishlistReducer,
      auth: authReducer,
    },
    devTools: process.env.NODE_ENV !== "production",
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
