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

const inputClassName =
  "h-11 w-full rounded-lg border border-border bg-[#fafbfc] px-3 text-sm outline-none transition focus:border-accent focus:bg-white focus:ring-2 focus:ring-accent/20";

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
          <label htmlFor="name" className="text-sm font-semibold text-foreground">
            Full name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            placeholder="Your name"
            className={inputClassName}
          />
        </div>
      ) : null}

      <div className="space-y-1.5">
        <label htmlFor="email" className="text-sm font-semibold text-foreground">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="you@example.com"
          className={inputClassName}
        />
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="password"
          className="text-sm font-semibold text-foreground"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete={mode === "login" ? "current-password" : "new-password"}
          required
          minLength={6}
          placeholder="At least 6 characters"
          className={inputClassName}
        />
      </div>

      {error ? (
        <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-danger" role="alert">
          {error}
        </p>
      ) : null}

      <Button
        type="submit"
        className="w-full bg-[#fb641b] text-base font-semibold hover:bg-[#e55a16]"
      >
        {mode === "login" ? "Sign in" : "Create account"}
      </Button>

      <p className="text-center text-xs text-muted-foreground">
        By continuing, you agree to ShopHub’s Terms of Use and Privacy Policy.
      </p>
    </form>
  );
}
