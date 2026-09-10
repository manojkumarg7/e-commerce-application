# 02 — Dynamic Routing

## Definition

Dynamic routing lets one page file handle many URLs by using a folder name in brackets, such as `[id]` or `[slug]`.

## Why we use `[id]` / `[slug]`

You do not create `/products/1/page.tsx`, `/products/2/page.tsx`, ... for every product.

Instead:

```text
app/(shop)/products/[id]/page.tsx
```

serves:

- `/products/1`
- `/products/2`
- `/products/3`

## What is `params`?

`params` is the dynamic part of the URL passed into the page.

For `/products/1`:

```ts
params.id === "1"
```

For `/categories/electronics`:

```ts
params.slug === "electronics"
```

In Next.js App Router (modern versions), `params` is async:

```tsx
type Props = { params: Promise<{ id: string }> };

export default async function Page({ params }: Props) {
  const { id } = await params;
  // fetch product by id
}
```

## How Next.js generates the URL

Folder structure maps to URL segments:

| File | URL |
|---|---|
| `products/page.tsx` | `/products` |
| `products/[id]/page.tsx` | `/products/:id` |
| `categories/[slug]/page.tsx` | `/categories/:slug` |
| `orders/[id]/page.tsx` | `/orders/:id` |

`(shop)` does **not** appear in the URL (route group).

## How a dynamic page receives params

1. User visits `/products/2`
2. Next.js matches `products/[id]`
3. Page receives `params.id = "2"`
4. Server Component calls `getProductById("2")`
5. If missing → `notFound()`

## Project examples

### Product details

```tsx
// src/app/(shop)/products/[id]/page.tsx
const { id } = await params;
const product = await getProductById(id);
if (!product) notFound();
```

Try:

- [http://localhost:3000/products/1](http://localhost:3000/products/1)
- [http://localhost:3000/products/2](http://localhost:3000/products/2)

### Category details

```tsx
// src/app/(shop)/categories/[slug]/page.tsx
const { slug } = await params;
const category = await getCategoryBySlug(slug);
```

Try:

- `/categories/electronics`
- `/categories/shoes`
- `/categories/fashion`

### Order details

- `/orders/ORD001`
- `/orders/ORD002`

## `generateStaticParams`

Used to pre-render known dynamic paths at build time:

```tsx
export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({ id: product.id }));
}
```

## Real-world use cases

- Product pages
- Blog posts `/blog/[slug]`
- User profiles `/users/[username]`
- Order receipts `/orders/[id]`
- Documentation `/docs/[...slug]` (catch-all)

## Interview answer

> “Dynamic routes use bracket folders like `[id]`. Next.js injects the URL segment into `params`, and my Server Component fetches the correct record. If nothing matches, I call `notFound()`.”

## Common mistakes

- Forgetting `await params` in newer Next.js
- Hardcoding product pages instead of `[id]`
- Confusing route groups `(shop)` with URL segments
- Not handling missing ids with `notFound()`

## Interview questions

1. What does `[id]` mean in the App Router?
2. Difference between `[slug]` and `[...slug]`?
3. How do you read params in a Server Component?
4. What is `generateStaticParams`?
5. How do dynamic routes help SEO for product pages?
