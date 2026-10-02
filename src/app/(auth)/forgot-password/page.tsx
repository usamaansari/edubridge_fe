import type { Metadata } from "next";
import { ForgotPasswordForm } from "@/components/auth";

export const metadata: Metadata = {
  title: "Forgot Password",
  description: "Reset your EduBridge Academy account password.",
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
