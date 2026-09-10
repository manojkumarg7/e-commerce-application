# ShopHub — Modern Next.js E-commerce Application

A production-style, responsive e-commerce web application built with **Next.js (App Router)**, **TypeScript**, **React**, and **Tailwind CSS**.

This project is designed for:

- Learning Next.js deeply
- Portfolio demonstration
- Frontend / Next.js interview preparation

---

## Project overview

ShopHub is a full shopping experience with catalog browsing, cart, checkout, auth UI, orders, wishlist, and an admin dashboard.

**Current status:** Phase 1 — project initialization and architecture scaffolding.

Mock data is used first. The service + API layers are structured so mock sources can be replaced with real REST APIs later without rewriting UI components.

---

## Features (planned)

- Home, Products, Product Details, Categories
- Cart, Wishlist, Checkout
- Login, Register, Profile, Orders
- Admin dashboard (products, orders, users)
- Responsive desktop / tablet / mobile UI
- Loading, error, and not-found states
- SEO metadata and performance best practices

---

## Tech stack

| Technology | Role |
|---|---|
| Next.js 16 (App Router) | Framework, routing, rendering |
| React 19 | UI |
| TypeScript | Type safety |
| Tailwind CSS 4 | Styling |
| Redux Toolkit + React Redux | Cart, wishlist, demo auth state |
| next/image + next/font | Performance / SEO |

No unnecessary third-party state or UI libraries in Phase 1.

---

## Folder structure

```text
my-next-app/
├── docs/                      # Learning + interview documentation
├── public/
│   └── images/
├── src/
│   ├── app/                   # App Router (routes, layouts, pages)
│   │   ├── (shop)/            # Route group (URL does NOT include "shop")
│   │   ├── (auth)/            # Auth route group
│   │   ├── admin/
│   │   ├── checkout/
│   │   ├── orders/
│   │   └── profile/
│   ├── components/
│   │   ├── admin/
│   │   ├── cart/
│   │   ├── common/
│   │   ├── forms/
│   │   ├── layout/
│   │   ├── product/
│   │   └── ui/
│   ├── data/                  # Mock data
│   ├── hooks/
│   ├── lib/                   # api, utils, constants
│   ├── services/              # Business/data access layer
│   └── types/
├── next.config.ts
├── package.json
└── tsconfig.json
```

See [`docs/01-project-structure.md`](docs/01-project-structure.md) for a full explanation.

---

## Installation

```bash
cd my-next-app
npm install
```

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Lint

```bash
npm run lint
```

---

## Environment variables

Create a `.env.local` file when you are ready for real APIs:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
```

Phase 1 uses local mock scaffolding only. No secrets are required yet.

---

## Architecture

```text
UI (app/ + components/)
        ↓
hooks/ (client interaction state)
        ↓
services/ (getProducts, getOrderById, ...)
        ↓
lib/api.ts (HTTP abstraction)
        ↓
data/ (mock)  →  later: REST API
```

This keeps components free of hardcoded fetch logic.

---

## Routing

App Router only (no Pages Router).

Planned routes include:

- `/` — Home
- `/products`, `/products/[id]`
- `/categories`, `/categories/[slug]`
- `/cart`, `/wishlist`, `/checkout`
- `/login`, `/register`, `/profile`
- `/orders`, `/orders/[id]`
- `/admin`, `/admin/products`, `/admin/orders`, `/admin/users`

Route groups `(shop)` and `(auth)` organize layouts without changing URLs.

---

## Performance

Planned optimizations (later phases):

- Server Components by default
- `next/image` and font optimization
- Code splitting / dynamic imports where useful
- Loading and streaming UI
- Lean client boundaries

Details: [`docs/08-performance-optimization.md`](docs/08-performance-optimization.md)

---

## Documentation map

| File | Topic |
|---|---|
| [01-project-structure.md](docs/01-project-structure.md) | Folders and special files |
| [02-dynamic-routing.md](docs/02-dynamic-routing.md) | `[id]`, `[slug]`, params |
| [03-layouts.md](docs/03-layouts.md) | Root / nested layouts |
| [04-route-groups.md](docs/04-route-groups.md) | `(shop)`, `(auth)` |
| [05-server-client-components.md](docs/05-server-client-components.md) | RSC vs Client |
| [06-data-fetching.md](docs/06-data-fetching.md) | Fetching patterns |
| [07-api-architecture.md](docs/07-api-architecture.md) | Mock → REST |
| [08-performance-optimization.md](docs/08-performance-optimization.md) | Perf + CWV |
| [09-seo.md](docs/09-seo.md) | Metadata / SEO |
| [10-typescript.md](docs/10-typescript.md) | Types used here |
| [11-loading-error-not-found.md](docs/11-loading-error-not-found.md) | UX states |
| [12-nextjs-interview-questions.md](docs/12-nextjs-interview-questions.md) | Q&A bank |
| [13-project-interview-explanation.md](docs/13-project-interview-explanation.md) | How to present this project |
| [14-accessibility.md](docs/14-accessibility.md) | a11y basics |

---

## Build phases

1. **Phase 1** — Initialize, configure, folders, README, docs structure ✅
2. **Phase 2** — Root layout, Navbar, Footer, Home
3. **Phase 3** — Products + dynamic product route
4. **Phase 4** — Categories, filters, search, sorting
5. **Phase 5** — Cart, Wishlist, Checkout
6. **Phase 6** — Auth UI, Profile, Orders
7. **Phase 7** — Admin dashboard
8. **Phase 8** — Performance, SEO, loading/error, a11y polish
9. **Phase 9** — Full documentation + interview materials

---

## Future improvements

- Real REST API backend
- Authentication provider / sessions
- Payment gateway integration
- Persistent cart (database or authenticated user)
- Product reviews and search indexing
- E2E tests

---

## License

Private learning / portfolio project.
