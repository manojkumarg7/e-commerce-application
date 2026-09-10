import type { Order } from "@/types/order";

export const orders: Order[] = [
  {
    id: "ORD001",
    userId: "user-1",
    status: "delivered",
    createdAt: "2026-08-12T10:20:00.000Z",
    subtotal: 339.98,
    shipping: 0,
    tax: 27.2,
    total: 367.18,
    items: [
      {
        productId: "1",
        name: "Wireless Noise-Canceling Headphones",
        price: 249.99,
        quantity: 1,
        imageUrl:
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
      },
      {
        productId: "4",
        name: "City Runner Sneakers",
        price: 89.99,
        quantity: 1,
        imageUrl:
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
      },
    ],
    shippingAddress: {
      line1: "221 Market Street",
      city: "San Francisco",
      state: "CA",
      postalCode: "94105",
      country: "US",
    },
  },
  {
    id: "ORD002",
    userId: "user-1",
    status: "shipped",
    createdAt: "2026-09-01T14:05:00.000Z",
    subtotal: 189.99,
    shipping: 8.99,
    tax: 15.92,
    total: 214.9,
    items: [
      {
        productId: "8",
        name: "Wool Blend Overcoat",
        price: 189.99,
        quantity: 1,
        imageUrl:
          "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=80",
      },
    ],
    shippingAddress: {
      line1: "221 Market Street",
      city: "San Francisco",
      state: "CA",
      postalCode: "94105",
      country: "US",
    },
  },
];
