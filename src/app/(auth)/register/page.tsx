import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { AuthForm } from "@/components/forms/AuthForm";
import { AuthShell } from "@/components/forms/AuthShell";
import { ROUTES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Register",
};

export default function RegisterPage() {
  return (
    <AuthShell
      highlight="Join ShopHub"
      title="Create your account and start saving today"
      subtitle="Get personalized deals, faster checkout, and a wishlist that follows you everywhere."
      imageUrl="https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=1400&q=80"
      imageAlt="Shoppers browsing store products"
    >
      <div className="space-y-6">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Create account
          </h1>
          <p className="text-sm text-muted-foreground">
            It only takes a minute to get started.
          </p>
        </div>

        <Suspense
          fallback={
            <div className="h-64 animate-pulse rounded-lg border border-border bg-muted" />
          }
        >
          <AuthForm mode="register" />
        </Suspense>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href={ROUTES.login}
            className="font-semibold text-accent hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </AuthShell>
  );
}
