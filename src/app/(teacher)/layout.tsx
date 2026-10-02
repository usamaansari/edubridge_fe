import type { Metadata } from "next";
import { Shell } from "@/components/layout";
import { requirePortal } from "@/lib/auth/session";

export const metadata: Metadata = {
  title: {
    template: "%s | EduBridge Faculty",
    default: "Faculty Portal | EduBridge Academy",
  },
};

export default async function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requirePortal("teacher");
  return (
    <Shell portal="teacher" user={user}>
      {children}
    </Shell>
  );
}
