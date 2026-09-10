import type { Metadata } from "next";
import Link from "next/link";
import { AuthForm } from "@/components/forms/AuthForm";
import { ROUTES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Register",
};

export default function RegisterPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Create account</h1>
        <p className="text-sm text-muted-foreground">
          Registration stores a demo user in Redux.
        </p>
      </div>

      <AuthForm mode="register" />

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href={ROUTES.login} className="font-medium text-accent hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
