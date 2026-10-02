import type { Metadata } from "next";
import { Shell } from "@/components/layout";
import { requirePortal } from "@/lib/auth/session";

export const metadata: Metadata = {
  title: {
    template: "%s | EduBridge Admin",
    default: "Admin Portal | EduBridge Academy",
  },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requirePortal("admin");
  return (
    <Shell portal="admin" user={user}>
      {children}
    </Shell>
  );
}
