"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/lib/constants";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout, selectCurrentUser } from "@/store/authSlice";

export function ProfileView() {
  const user = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();

  if (!user) {
    return (
      <div className="rounded-xl border border-dashed border-border px-4 py-12 text-center">
        <p className="text-sm text-muted-foreground">
          You are not signed in.
        </p>
        <Link
          href={ROUTES.login}
          className="mt-4 inline-flex h-11 items-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground"
        >
          Sign in
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-lg space-y-4 rounded-xl border border-border p-5">
      <div>
        <p className="text-sm text-muted-foreground">Name</p>
        <p className="font-medium">{user.name}</p>
      </div>
      <div>
        <p className="text-sm text-muted-foreground">Email</p>
        <p className="font-medium">{user.email}</p>
      </div>
      <div>
        <p className="text-sm text-muted-foreground">Role</p>
        <p className="font-medium capitalize">{user.role}</p>
      </div>
      <Button variant="secondary" onClick={() => dispatch(logout())}>
        Sign out
      </Button>
    </div>
  );
}
