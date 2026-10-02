import type { Metadata } from "next";
import { LoginForm } from "@/components/auth";
import { isDemoMode } from "@/lib/auth/config";

export const metadata: Metadata = {
  title: "Log In",
  description: "Log in to your EduBridge Academy account.",
};

export default async function LoginPage({ searchParams }: PageProps<"/login">) {
  const { next } = await searchParams;
  return (
    <LoginForm
      demoMode={isDemoMode()}
      next={typeof next === "string" ? next : undefined}
    />
  );
}
