import type { Metadata } from "next";
import { Shell } from "@/components/layout";
import { requirePortal } from "@/lib/auth/session";

export const metadata: Metadata = {
  title: {
    template: "%s | EduBridge Parent",
    default: "Parent Portal | EduBridge Academy",
  },
};

export default async function ParentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requirePortal("parent");
  return (
    <Shell portal="parent" user={user}>
      {children}
    </Shell>
  );
}
