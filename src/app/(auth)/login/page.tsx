import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { AuthForm } from "@/components/forms/AuthForm";
import { ROUTES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Login",
};

export default function LoginPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
        <p className="text-sm text-muted-foreground">
          Login to add items to cart and place orders.
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
        <Link href={ROUTES.register} className="font-medium text-accent hover:underline">
          Create an account
        </Link>
      </p>
    </div>
  );
}
