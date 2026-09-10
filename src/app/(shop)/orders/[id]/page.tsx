import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { formatCurrency } from "@/lib/utils";
import { getOrderById, getOrders } from "@/services/orderService";

type OrderPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  const orders = await getOrders();
  return orders.map((order) => ({ id: order.id }));
}

export async function generateMetadata({
  params,
}: OrderPageProps): Promise<Metadata> {
  const { id } = await params;
  const order = await getOrderById(id);

  if (!order) {
    return { title: "Order not found" };
  }

  return {
    title: `Order ${order.id}`,
    description: `Status: ${order.status}`,
  };
}

export default async function OrderDetailsPage({ params }: OrderPageProps) {
  const { id } = await params;
  const order = await getOrderById(id);

  if (!order) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-accent">
          /orders/{id}
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">Order {order.id}</h1>
        <p className="text-sm text-muted-foreground">
          Placed {new Date(order.createdAt).toLocaleString()} · Status:{" "}
          <span className="font-medium text-foreground">{order.status}</span>
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Items</h2>
        <ul className="divide-y divide-border rounded-xl border border-border">
          {order.items.map((item) => (
            <li key={item.productId} className="flex gap-4 p-4">
              <div className="relative h-16 w-16 overflow-hidden rounded-lg bg-muted">
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
              <div className="flex flex-1 items-start justify-between gap-3">
                <div>
                  <Link
                    href={`/products/${item.productId}`}
                    className="font-medium hover:underline"
                  >
                    {item.name}
                  </Link>
                  <p className="text-sm text-muted-foreground">Qty {item.quantity}</p>
                </div>
                <p className="font-medium">{formatCurrency(item.price * item.quantity)}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="grid gap-4 rounded-xl border border-border p-4 sm:grid-cols-2">
        <div>
          <h2 className="text-sm font-semibold">Shipping address</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {order.shippingAddress.line1}
            <br />
            {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
            {order.shippingAddress.postalCode}
            <br />
            {order.shippingAddress.country}
          </p>
        </div>
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span>{formatCurrency(order.subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Shipping</span>
            <span>{formatCurrency(order.shipping)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Tax</span>
            <span>{formatCurrency(order.tax)}</span>
          </div>
          <div className="flex justify-between border-t border-border pt-2 text-base font-semibold">
            <span>Total</span>
            <span>{formatCurrency(order.total)}</span>
          </div>
        </div>
      </section>
    </div>
  );
}
