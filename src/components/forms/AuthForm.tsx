"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/lib/constants";
import { useAppDispatch } from "@/store/hooks";
import { loginSuccess } from "@/store/authSlice";

type AuthFormMode = "login" | "register";

type AuthFormProps = {
  mode: AuthFormMode;
};

function safeRedirect(value: string | null): string {
  if (!value || !value.startsWith("/") || value.startsWith("//")) {
    return ROUTES.home;
  }
  return value;
}

export function AuthForm({ mode }: AuthFormProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const name =
      mode === "register"
        ? String(formData.get("name") ?? "").trim()
        : email.split("@")[0] || "ShopHub User";

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    dispatch(
      loginSuccess({
        id: mode === "register" ? `user-${Date.now()}` : "user-1",
        name,
        email,
        role: email.includes("admin") ? "admin" : "customer",
      }),
    );

    router.push(safeRedirect(searchParams.get("redirect")));
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit} noValidate>
      {mode === "register" ? (
        <div className="space-y-1.5">
          <label htmlFor="name" className="text-sm font-medium">
            Full name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none ring-accent focus:ring-2"
          />
        </div>
      ) : null}

      <div className="space-y-1.5">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none ring-accent focus:ring-2"
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="password" className="text-sm font-medium">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete={mode === "login" ? "current-password" : "new-password"}
          required
          minLength={6}
          className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none ring-accent focus:ring-2"
        />
      </div>

      {error ? (
        <p className="text-sm text-danger" role="alert">
          {error}
        </p>
      ) : null}

      <Button type="submit" className="w-full">
        {mode === "login" ? "Sign in" : "Create account"}
      </Button>

      <p className="text-xs text-muted-foreground">
        Demo auth stored in Redux + localStorage (no real backend yet).
      </p>
    </form>
  );
}
