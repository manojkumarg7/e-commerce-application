import Image from "next/image";
import Link from "next/link";
import { APP_NAME, ROUTES } from "@/lib/constants";

type AuthShellProps = {
  title: string;
  subtitle: string;
  imageUrl: string;
  imageAlt: string;
  highlight: string;
  children: React.ReactNode;
};

export function AuthShell({
  title,
  subtitle,
  imageUrl,
  imageAlt,
  highlight,
  children,
}: AuthShellProps) {
  return (
    <div className="grid min-h-full flex-1 lg:grid-cols-2">
      <aside className="relative hidden min-h-[420px] overflow-hidden lg:block">
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          priority
          className="object-cover"
          sizes="50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1f4d]/95 via-[#2874f0]/55 to-[#2874f0]/25" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.22),transparent_45%)]" />

        <div className="relative z-10 flex h-full flex-col justify-between p-10 text-white">
          <Link
            href={ROUTES.home}
            className="text-2xl font-bold tracking-tight drop-shadow-sm"
          >
            {APP_NAME}
          </Link>

          <div className="max-w-md space-y-4 pb-6">
            <p className="inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] backdrop-blur">
              {highlight}
            </p>
            <h2 className="text-4xl font-bold leading-tight tracking-tight xl:text-5xl">
              {title}
            </h2>
            <p className="text-base leading-7 text-white/85">{subtitle}</p>
            <ul className="space-y-2 pt-2 text-sm text-white/90">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#ff9f00]" />
                Millions of products across categories
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#ff9f00]" />
                Fast delivery and easy returns
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#ff9f00]" />
                Secure checkout with exclusive deals
              </li>
            </ul>
          </div>
        </div>
      </aside>

      <section className="relative flex flex-col bg-[#f1f3f6]">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#e8f0ff_0%,#f1f3f6_38%,#f1f3f6_100%)]" />
        <div className="relative z-10 flex flex-1 flex-col justify-center px-4 py-10 sm:px-8 lg:px-12">
          <Link
            href={ROUTES.home}
            className="mb-8 text-center text-2xl font-bold tracking-tight text-accent lg:hidden"
          >
            {APP_NAME}
          </Link>

          <div className="mx-auto w-full max-w-md overflow-hidden rounded-2xl border border-border bg-white shadow-[0_18px_50px_rgba(40,116,240,0.12)]">
            <div className="relative h-36 sm:h-40 lg:hidden">
              <Image
                src={imageUrl}
                alt={imageAlt}
                fill
                priority
                className="object-cover"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 text-white">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/80">
                  {highlight}
                </p>
                <p className="mt-1 text-lg font-bold leading-snug">{title}</p>
              </div>
            </div>

            <div className="p-6 sm:p-8">{children}</div>
          </div>
        </div>
      </section>
    </div>
  );
}
