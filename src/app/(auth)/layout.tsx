/**
 * Auth layout — immersive split-screen login/register experience.
 */
export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="flex min-h-full flex-1 flex-col bg-[#f1f3f6]">{children}</div>;
}
