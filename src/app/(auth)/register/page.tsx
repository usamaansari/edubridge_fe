import type { Metadata } from "next";
import { RegisterForm } from "@/components/auth";

export const metadata: Metadata = {
  title: "Create Account",
  description:
    "Create your EduBridge Academy account to start integrated Boards + JEE/NEET preparation.",
};

export default function RegisterPage() {
  return <RegisterForm />;
}
