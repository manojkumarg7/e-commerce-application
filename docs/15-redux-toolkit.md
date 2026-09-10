# Redux Toolkit in ShopHub

## Why Redux Toolkit here?

Cart, wishlist, and auth must stay in sync across:

- Product details
- Navbar badges
- Cart / wishlist pages
- Profile / login

Context can work for small apps. Redux Toolkit is used because you requested it and because this storefront has **shared cross-route client state** that benefits from:

- Central store
- Typed slices/actions
- Predictable updates
- Redux DevTools
- Easy localStorage persistence

## Packages

- `@reduxjs/toolkit`
- `react-redux`

## Project structure

```text
src/store/
  index.ts          → configureStore
  hooks.ts          → useAppDispatch / useAppSelector
  cartSlice.ts
  wishlistSlice.ts
  authSlice.ts

src/components/providers/StoreProvider.tsx
```

## How it connects to App Router

1. Root layout wraps the app with `StoreProvider` (Client Component)
2. Server Components stay default for data fetching/pages
3. Only interactive pieces use `"use client"` + Redux hooks

## Example: add to cart

```tsx
dispatch(addToCart({ product, quantity: 1 }));
```

## Persistence

`StoreProvider` hydrates from `localStorage` on mount and saves cart/wishlist/auth on every store change.

## Interview answer

> “I used Redux Toolkit for cart, wishlist, and demo auth because that state is shared across many routes. Pages remain Server Components where possible; client islands dispatch Redux actions. The store is created per browser session and hydrated from localStorage.”
