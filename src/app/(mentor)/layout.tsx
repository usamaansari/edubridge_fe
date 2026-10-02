import type { Metadata } from "next";
import { Shell } from "@/components/layout";
import { requirePortal } from "@/lib/auth/session";

export const metadata: Metadata = {
  title: {
    template: "%s | EduBridge Mentor",
    default: "Mentor Portal | EduBridge Academy",
  },
};

export default async function MentorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requirePortal("mentor");
  return (
    <Shell portal="mentor" user={user}>
      {children}
    </Shell>
  );
}
