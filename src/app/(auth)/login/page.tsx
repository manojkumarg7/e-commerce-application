import type { Metadata } from "next";
import Link from "next/link";
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
          Sign in updates the Redux auth slice.
        </p>
      </div>

      <AuthForm mode="login" />

      <p className="text-center text-sm text-muted-foreground">
        New here?{" "}
        <Link href={ROUTES.register} className="font-medium text-accent hover:underline">
          Create an account
        </Link>
      </p>
    </div>
  );
}
