import Link from "next/link";
import { APP_NAME, ROUTES } from "@/lib/constants";

/**
 * Auth layout — no shopping navbar/footer.
 * Focused, centered card UI for login/register (realtime auth screens).
 */
export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-gradient-to-b from-zinc-50 to-white">
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-4 py-12">
        <Link
          href={ROUTES.home}
          className="mb-8 text-center text-2xl font-semibold tracking-tight text-foreground"
        >
          {APP_NAME}
        </Link>
        <div className="rounded-2xl border border-border bg-background p-6 shadow-sm sm:p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
