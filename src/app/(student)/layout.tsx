import type { Metadata } from "next";
import { Shell } from "@/components/layout";
import { requirePortal } from "@/lib/auth/session";

export const metadata: Metadata = {
  title: {
    template: "%s | EduBridge Student",
    default: "Student Portal | EduBridge Academy",
  },
};

export default async function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requirePortal("student");
  return (
    <Shell portal="student" user={user}>
      {children}
    </Shell>
  );
}
