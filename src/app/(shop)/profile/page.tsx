import type { Metadata } from "next";
import { ProfileView } from "@/components/forms/ProfileView";

export const metadata: Metadata = {
  title: "Profile",
};

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Profile</h1>
        <p className="text-sm text-muted-foreground">
          User data comes from the Redux auth slice.
        </p>
      </header>
      <ProfileView />
    </div>
  );
}
