export const APP_NAME = "ShopHub";

export const ROUTES = {
  home: "/",
  products: "/products",
  categories: "/categories",
  cart: "/cart",
  wishlist: "/wishlist",
  checkout: "/checkout",
  login: "/login",
  register: "/register",
  profile: "/profile",
  orders: "/orders",
  admin: "/admin",
} as const;

export const PRODUCTS_PER_PAGE = 16;

export const PRICE_FILTERS = [
  { label: "Under ₹500", min: 0, max: 500 },
  { label: "₹500 - ₹1,000", min: 500, max: 1000 },
  { label: "₹1,000 - ₹5,000", min: 1000, max: 5000 },
  { label: "₹5,000 - ₹20,000", min: 5000, max: 20000 },
  { label: "Above ₹20,000", min: 20000, max: undefined },
] as const;

export const RATING_FILTERS = [4, 3, 2] as const;

export const SORT_OPTIONS = [
  { value: "relevance", label: "Relevance" },
  { value: "popularity", label: "Popularity" },
  { value: "price_asc", label: "Price — Low to High" },
  { value: "price_desc", label: "Price — High to Low" },
  { value: "rating", label: "Customer Rating" },
] as const;
