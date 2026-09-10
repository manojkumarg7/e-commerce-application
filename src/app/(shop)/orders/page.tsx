import Link from "next/link";
import type { Metadata } from "next";
import { formatCurrency } from "@/lib/utils";
import { getOrders } from "@/services/orderService";

export const metadata: Metadata = {
  title: "Orders",
  description: "Your ShopHub order history.",
};

export default async function OrdersPage() {
  const orders = await getOrders();

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Orders</h1>
        <p className="text-sm text-muted-foreground">
          Open a dynamic order route such as /orders/ORD001
        </p>
      </header>

      <ul className="divide-y divide-border rounded-xl border border-border">
        {orders.map((order) => (
          <li key={order.id}>
            <Link
              href={`/orders/${order.id}`}
              className="flex flex-col gap-1 px-4 py-4 transition hover:bg-muted/50 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-semibold">{order.id}</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(order.createdAt).toLocaleDateString()} · {order.status}
                </p>
              </div>
              <p className="font-medium">{formatCurrency(order.total)}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
