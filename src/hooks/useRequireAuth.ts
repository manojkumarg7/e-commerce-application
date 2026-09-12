"use client";

import { usePathname, useRouter } from "next/navigation";
import { useToast } from "@/components/ui/Toast";
import { ROUTES } from "@/lib/constants";
import { useAppSelector } from "@/store/hooks";
import { selectIsAuthenticated } from "@/store/authSlice";

export function useRequireAuth() {
  const router = useRouter();
  const pathname = usePathname();
  const { pushToast } = useToast();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  function requireAuth(message = "Please login to continue"): boolean {
    if (isAuthenticated) return true;

    pushToast(message, "info");
    const redirect = encodeURIComponent(pathname || ROUTES.products);
    router.push(`${ROUTES.login}?redirect=${redirect}`);
    return false;
  }

  return { isAuthenticated, requireAuth };
}
