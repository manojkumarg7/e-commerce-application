# 03 — Layouts

## Definition

A layout is UI that wraps pages and **stays mounted** while you navigate between child routes.

## Why layouts are useful

- Share Navbar/Footer without copying them into every page
- Keep chrome persistent (better UX, less flicker)
- Give different areas different shells (shop vs auth vs admin)

## Root layout

`src/app/layout.tsx`

- Required
- Sets `<html>` and `<body>`
- Loads fonts and global CSS
- Wraps the entire app

## Nested layouts

### Shop layout — realtime storefront chrome

`src/app/(shop)/layout.tsx`

- Navbar + page content + Footer
- Used by Home, Products, Categories, Cart, Orders, etc.

### Auth layout — focused login experience

`src/app/(auth)/layout.tsx`

- No shopping navbar
- Centered card
- Used by `/login` and `/register`

### Admin layout — operations dashboard

`src/app/admin/layout.tsx`

- Persistent sidebar
- Content area on the right
- Used by `/admin/*`

This matches real applications: storefront, auth, and admin each have their own shell.

## Layout vs page

| | Layout | Page |
|---|---|---|
| File | `layout.tsx` | `page.tsx` |
| Creates URL? | No | Yes |
| Persists on navigation? | Yes | Replaced |
| Purpose | Shared chrome | Route content |

## Shared UI vs persistent UI

- **Shared UI**: same components reused
- **Persistent UI**: layout state/DOM kept across navigations (e.g. open mobile menu pattern, sidebar highlight)

## Project example

```tsx
// (shop)/layout.tsx
<>
  <Navbar />
  <main>{children}</main>
  <Footer />
</>
```

Navigate `/products` → `/products/1`: Navbar/Footer stay; only `children` change.

## Interview answer

> “Layouts wrap pages and persist across child navigations. I use a root layout for html/body, a shop layout for store chrome, an auth layout without the navbar, and an admin layout with a sidebar.”

## Common mistakes

- Putting Navbar in every page instead of a layout
- Using the shop navbar on login screens
- Nesting too many layouts without a clear reason

## Interview questions

1. Does a layout remount on every navigation?
2. Can you have multiple layouts?
3. What must the root layout include?
4. How do layouts relate to route groups?
