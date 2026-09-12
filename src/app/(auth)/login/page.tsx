import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { AuthForm } from "@/components/forms/AuthForm";
import { AuthShell } from "@/components/forms/AuthShell";
import { ROUTES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Login",
};

export default function LoginPage() {
  return (
    <AuthShell
      highlight="Member access"
      title="Shop smarter with your ShopHub account"
      subtitle="Sign in to unlock your cart, wishlist, order tracking, and exclusive deals."
      imageUrl="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1400&q=80"
      imageAlt="Fashion shopping lifestyle"
    >
      <div className="space-y-6">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Welcome back
          </h1>
          <p className="text-sm text-muted-foreground">
            Login to continue shopping and checkout.
          </p>
        </div>

        <Suspense
          fallback={
            <div className="h-64 animate-pulse rounded-lg border border-border bg-muted" />
          }
        >
          <AuthForm mode="login" />
        </Suspense>

        <p className="text-center text-sm text-muted-foreground">
          New here?{" "}
          <Link
            href={ROUTES.register}
            className="font-semibold text-accent hover:underline"
          >
            Create an account
          </Link>
        </p>
      </div>
    </AuthShell>
  );
}
