import { AdminSidebar } from "@/components/layout/AdminSidebar";

/**
 * Admin layout — sidebar navigation like a real operations dashboard.
 */
export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-full flex-1 flex-col md:flex-row">
      <AdminSidebar />
      <div className="flex-1 bg-muted/30">
        <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </div>
      </div>
    </div>
  );
}
