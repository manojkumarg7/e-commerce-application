# 04 — Route Groups

## Definition

Route groups are folders wrapped in parentheses, like `(shop)` or `(auth)`.

They organize routes and layouts **without changing the URL**.

## Why parentheses?

```text
src/app/(shop)/products/page.tsx  →  /products
```

NOT `/shop/products`.

The folder name `(shop)` is ignored in the path.

## Why we use them

1. Apply different layouts to different sections
2. Keep files organized
3. Avoid ugly URL prefixes

## Project examples

| File | URL |
|---|---|
| `(shop)/page.tsx` | `/` |
| `(shop)/products/[id]/page.tsx` | `/products/1` |
| `(auth)/login/page.tsx` | `/login` |
| `admin/page.tsx` | `/admin` |

`(shop)` and `(auth)` are groups. `admin` is a normal segment, so it **does** appear in the URL.

## How it works with layouts

```text
(shop)/layout.tsx   → Navbar/Footer for store pages
(auth)/layout.tsx   → Centered auth shell
admin/layout.tsx    → Sidebar dashboard
```

Same app, three UX shells — like production apps.

## Interview answer

> “Route groups use parentheses to organize routes and attach layouts without affecting the URL. `(shop)/products` still resolves to `/products`.”

## Common mistakes

- Expecting `/shop/products` from `(shop)/products`
- Using a route group when you actually need a URL segment
- Creating overlapping pages that resolve to the same URL

## Interview questions

1. Do parentheses appear in the URL?
2. Why use `(auth)` instead of `auth`?
3. Can two route groups both define `/`?
