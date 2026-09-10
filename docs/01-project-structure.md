# 01 — Project Structure

## Definition

Project structure is how folders and files are organized so the app stays scalable, readable, and interview-friendly.

## Why we use this structure

- Separates **routing** (`app/`), **UI** (`components/`), **data access** (`services/`), and **types**
- Makes mock → REST migration easier
- Matches real-world Next.js App Router projects

## How it works in this project

The app lives under `my-next-app/src/`.

```text
src/
  app/           → routes, layouts, pages (App Router)
  components/    → reusable UI pieces
  lib/           → shared helpers + API client
  services/      → getProducts(), getOrderById(), etc.
  types/         → TypeScript models
  data/          → mock datasets
  hooks/         → client-side React hooks
public/          → static assets (images, icons)
docs/            → learning + interview notes
```

---

## Important folders

### `src/app/`

Next.js **App Router** root. Folder names become URL segments (except route groups).

| Special file | Purpose |
|---|---|
| `page.tsx` | UI for a route (required to make a URL) |
| `layout.tsx` | Shared UI wrapper that persists across child routes |
| `loading.tsx` | Instant loading UI while a segment loads |
| `error.tsx` | Error UI for that segment (Client Component) |
| `not-found.tsx` | Custom 404 for `notFound()` / missing routes |
| `globals.css` | Global styles (imported in root layout) |

### `src/components/`

Reusable React components, grouped by domain:

- `layout/` — Navbar, Footer, Sidebar
- `product/` — ProductCard, ProductGrid
- `cart/` — cart line items, summary
- `forms/` — login, register, checkout forms
- `admin/` — dashboard widgets/tables
- `ui/` — Button, Input, Modal
- `common/` — Loader, EmptyState, ErrorMessage

### `src/lib/`

Low-level shared utilities:

- `api.ts` — HTTP abstraction (mock/REST switch point)
- `utils.ts` — helpers like `cn`, `formatCurrency`
- `constants.ts` — routes, app name, page size

### `src/services/`

Business/data layer used by pages:

- `productService.ts`
- `orderService.ts`
- `userService.ts`

Pages should call **services**, not import raw fetch logic everywhere.

### `src/types/`

Shared TypeScript contracts: `product`, `user`, `order`, `cart`.

### `src/data/`

Local mock data used in early phases.

### `src/hooks/`

Client hooks for interactive state (cart, wishlist, etc.).

### `public/`

Files served as-is. Example: `/images/shoes.jpg` → `public/images/shoes.jpg`.

### `docs/`

Concept explanations + interview prep. Open these while reading code.

---

## App Router special files (interview-ready)

### `page.tsx`

Makes a route publicly available.

```tsx
// src/app/products/page.tsx → URL: /products
export default function ProductsPage() {
  return <h1>Products</h1>;
}
```

### `layout.tsx`

Wraps pages. Does **not** remount on navigation between child routes (persistent UI).

### `loading.tsx`

Shown automatically while the route’s async Server Component work is pending (Suspense boundary).

### `error.tsx`

Catches runtime errors in that segment. Must be a Client Component (`"use client"`).

### `not-found.tsx`

Rendered when you call `notFound()` or no matching route exists.

---

## Project example

| Path | URL |
|---|---|
| `src/app/page.tsx` | `/` |
| `src/app/(shop)/products/page.tsx` | `/products` |
| `src/app/(shop)/products/[id]/page.tsx` | `/products/1` |
| `src/app/(auth)/login/page.tsx` | `/login` |
| `src/app/admin/page.tsx` | `/admin` |

`(shop)` and `(auth)` are **route groups** — parentheses mean “organize only”, not part of the URL.

---

## Path alias

`tsconfig.json` maps:

```json
"@/*": ["./src/*"]
```

So you can write:

```ts
import { getProducts } from "@/services/productService";
```

instead of deep relative imports.

---

## Interview answer

> “I organize Next.js apps with `app/` for routing, `components/` for UI, `services/` for data access, and `types/` for shared contracts. That separation keeps pages thin and makes it easy to replace mock data with a real REST API later.”

## Common mistakes

- Putting fetch logic directly inside many components
- Mixing Pages Router (`pages/`) with App Router
- Creating deep relative imports instead of `@/`
- Putting secrets in `public/` or client bundles

---

## Phase note

Phase 1 creates this scaffolding. Feature pages and full docs for each concept are filled in as we build.
