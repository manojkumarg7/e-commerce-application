import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Users",
};

export default function AdminUsersPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold tracking-tight">Users</h1>
      <div className="rounded-xl border border-border bg-background p-4 text-sm">
        <p className="font-medium">Demo Customer</p>
        <p className="text-muted-foreground">customer@shophub.test · role: customer</p>
      </div>
    </div>
  );
}
