import type { Order } from "@/types/order";

export const orders: Order[] = [
  {
    id: "ORD001",
    userId: "user-1",
    status: "delivered",
    createdAt: "2026-08-12T10:20:00.000Z",
    subtotal: 10498,
    shipping: 0,
    tax: 840,
    total: 11338,
    items: [
      {
        productId: "1",
        name: "Wireless Noise-Canceling Headphones",
        price: 7999,
        quantity: 1,
        imageUrl:
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
      },
      {
        productId: "31",
        name: "City Runner Sneakers",
        price: 2499,
        quantity: 1,
        imageUrl:
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
      },
    ],
    shippingAddress: {
      line1: "12 MG Road",
      city: "Bengaluru",
      state: "KA",
      postalCode: "560001",
      country: "IN",
    },
  },
  {
    id: "ORD002",
    userId: "user-1",
    status: "shipped",
    createdAt: "2026-09-01T14:05:00.000Z",
    subtotal: 3999,
    shipping: 40,
    tax: 320,
    total: 4359,
    items: [
      {
        productId: "23",
        name: "Wool Blend Overcoat",
        price: 3999,
        quantity: 1,
        imageUrl:
          "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=80",
      },
    ],
    shippingAddress: {
      line1: "12 MG Road",
      city: "Bengaluru",
      state: "KA",
      postalCode: "560001",
      country: "IN",
    },
  },
  {
    id: "ORD003",
    userId: "user-1",
    status: "processing",
    createdAt: "2026-09-10T09:30:00.000Z",
    subtotal: 8498,
    shipping: 0,
    tax: 680,
    total: 9178,
    items: [
      {
        productId: "4",
        name: "Wireless Earbuds Pro",
        price: 3499,
        quantity: 1,
        imageUrl:
          "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80",
      },
      {
        productId: "48",
        name: "Smart Air Fryer 4L",
        price: 4999,
        quantity: 1,
        imageUrl:
          "https://images.unsplash.com/photo-1585515320310-2597bc825999?w=800&q=80",
      },
    ],
    shippingAddress: {
      line1: "12 MG Road",
      city: "Bengaluru",
      state: "KA",
      postalCode: "560001",
      country: "IN",
    },
  },
];
