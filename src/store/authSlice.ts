import type { User } from "@/types/user";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  user: User | null;
};

const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    hydrateAuth: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
  },
});

export const { loginSuccess, logout, hydrateAuth } = authSlice.actions;

export const selectCurrentUser = (state: { auth: AuthState }) => state.auth.user;

export const selectIsAuthenticated = (state: { auth: AuthState }) =>
  Boolean(state.auth.user);

export default authSlice.reducer;
