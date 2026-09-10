import type { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: "1",
    name: "Wireless Noise-Canceling Headphones",
    slug: "wireless-noise-canceling-headphones",
    description:
      "Premium over-ear headphones with active noise cancellation, 30-hour battery life, and studio-quality sound.",
    price: 249.99,
    compareAtPrice: 299.99,
    categorySlug: "electronics",
    imageUrl:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
    rating: 4.7,
    reviewCount: 1284,
    stock: 42,
    featured: true,
    bestSeller: true,
    tags: ["audio", "wireless"],
  },
  {
    id: "2",
    name: "Ultra-Thin Laptop 14\"",
    slug: "ultra-thin-laptop-14",
    description:
      "Lightweight productivity laptop with a sharp display, fast SSD, and all-day battery for work and travel.",
    price: 1099.0,
    compareAtPrice: 1299.0,
    categorySlug: "electronics",
    imageUrl:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80",
    rating: 4.6,
    reviewCount: 642,
    stock: 18,
    featured: true,
    tags: ["laptop", "work"],
  },
  {
    id: "3",
    name: "Smart Fitness Watch",
    slug: "smart-fitness-watch",
    description:
      "Track workouts, heart rate, and sleep with a bright always-on display and week-long battery.",
    price: 199.99,
    categorySlug: "electronics",
    imageUrl:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
    rating: 4.4,
    reviewCount: 980,
    stock: 75,
    bestSeller: true,
    tags: ["wearable"],
  },
  {
    id: "4",
    name: "City Runner Sneakers",
    slug: "city-runner-sneakers",
    description:
      "Breathable everyday sneakers with cushioned soles designed for walking and light training.",
    price: 89.99,
    compareAtPrice: 119.99,
    categorySlug: "shoes",
    imageUrl:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
    rating: 4.5,
    reviewCount: 2103,
    stock: 120,
    featured: true,
    bestSeller: true,
    tags: ["sneakers"],
  },
  {
    id: "5",
    name: "Trail Hiking Boots",
    slug: "trail-hiking-boots",
    description:
      "Waterproof hiking boots with strong grip and ankle support for weekend trails.",
    price: 149.99,
    categorySlug: "shoes",
    imageUrl:
      "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=800&q=80",
    rating: 4.3,
    reviewCount: 411,
    stock: 36,
    tags: ["boots", "outdoor"],
  },
  {
    id: "6",
    name: "Classic Leather Loafers",
    slug: "classic-leather-loafers",
    description:
      "Polished leather loafers that pair with casual and smart-casual outfits.",
    price: 129.0,
    categorySlug: "shoes",
    imageUrl:
      "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=800&q=80",
    rating: 4.2,
    reviewCount: 188,
    stock: 28,
    tags: ["formal"],
  },
  {
    id: "7",
    name: "Minimal Cotton Tee",
    slug: "minimal-cotton-tee",
    description:
      "Soft premium cotton t-shirt with a clean fit. Built for everyday comfort.",
    price: 29.99,
    categorySlug: "fashion",
    imageUrl:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
    rating: 4.6,
    reviewCount: 3501,
    stock: 200,
    bestSeller: true,
    tags: ["basics"],
  },
  {
    id: "8",
    name: "Wool Blend Overcoat",
    slug: "wool-blend-overcoat",
    description:
      "Tailored overcoat with a modern silhouette for cooler weather.",
    price: 189.99,
    compareAtPrice: 229.99,
    categorySlug: "fashion",
    imageUrl:
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=80",
    rating: 4.5,
    reviewCount: 276,
    stock: 22,
    featured: true,
    tags: ["outerwear"],
  },
  {
    id: "9",
    name: "Structured Crossbody Bag",
    slug: "structured-crossbody-bag",
    description:
      "Compact crossbody bag with organized pockets for daily essentials.",
    price: 79.99,
    categorySlug: "fashion",
    imageUrl:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80",
    rating: 4.4,
    reviewCount: 519,
    stock: 54,
    tags: ["accessories"],
  },
  {
    id: "10",
    name: "Ceramic Table Lamp",
    slug: "ceramic-table-lamp",
    description:
      "Warm ambient lighting with a matte ceramic base and linen shade.",
    price: 64.99,
    categorySlug: "home",
    imageUrl:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80",
    rating: 4.3,
    reviewCount: 143,
    stock: 40,
    featured: true,
    tags: ["lighting"],
  },
  {
    id: "11",
    name: "Linen Throw Pillow Set",
    slug: "linen-throw-pillow-set",
    description:
      "Set of two textured linen pillows to refresh any living space.",
    price: 49.99,
    categorySlug: "home",
    imageUrl:
      "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&q=80",
    rating: 4.1,
    reviewCount: 97,
    stock: 80,
    tags: ["decor"],
  },
  {
    id: "12",
    name: "Modular Desk Organizer",
    slug: "modular-desk-organizer",
    description:
      "Keep your workspace tidy with stackable trays and pen slots.",
    price: 34.99,
    categorySlug: "home",
    imageUrl:
      "https://images.unsplash.com/photo-1593062096033-9a2c725c0cc0?w=800&q=80",
    rating: 4.0,
    reviewCount: 220,
    stock: 95,
    tags: ["office"],
  },
];
