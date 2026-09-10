import { orders } from "@/data/orders";
import type { Order } from "@/types/order";

export async function getOrders(): Promise<Order[]> {
  return orders;
}

export async function getOrderById(id: string): Promise<Order | null> {
  return orders.find((order) => order.id === id) ?? null;
}
