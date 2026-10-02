"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { CheckCircle2, Mail } from "lucide-react";
import { AuthInput, AuthPasswordInput } from "@/components/auth/auth-input";
import { AuthSubmitButton } from "@/components/auth/auth-submit-button";
import { OtpInput } from "@/components/auth/otp-input";
import { forgotPasswordSchema, otpSchema } from "@/lib/validations/auth";

type Step = "email" | "otp" | "done";

export function ForgotPasswordForm() {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const parsed = forgotPasswordSchema.safeParse({
      email: new FormData(event.currentTarget).get("email"),
    });
    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      return;
    }
    setError(null);
    setEmail(parsed.data.email);
    setStep("otp");
  }

  function handleReset(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const password = String(new FormData(event.currentTarget).get("password") ?? "");
    const parsed = otpSchema.safeParse({ otp });
    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    setError(null);
    setStep("done");
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-[2rem]">
          {step === "done" ? "Password Updated" : "Forgot Password?"}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {step === "email" &&
            "Enter your email address and we'll send you a 6-digit code to reset your password."}
          {step === "otp" && (
            <>
              We sent a code to <span className="font-medium text-foreground">{email}</span>.
              Enter it below with your new password.
            </>
          )}
          {step === "done" && "You can now log in with your new password."}
        </p>
      </div>

      {error ? (
        <p className="rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
          {error}
        </p>
      ) : null}

      {step === "email" ? (
        <form className="space-y-4" onSubmit={handleEmail} noValidate>
          <AuthInput
            label="Email Address"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Email Address"
            required
            endAdornment={<Mail className="size-4 text-emerald-500" />}
          />
          <AuthSubmitButton>Send Reset Code</AuthSubmitButton>
        </form>
      ) : null}

      {step === "otp" ? (
        <form className="space-y-4" onSubmit={handleReset}>
          <div className="space-y-1.5">
            <span className="text-sm font-medium text-foreground/80">Verification code</span>
            <OtpInput value={otp} onChange={setOtp} />
          </div>
          <AuthPasswordInput
            label="New Password"
            name="password"
            autoComplete="new-password"
            placeholder="At least 8 characters"
            required
          />
          <AuthSubmitButton>Reset Password</AuthSubmitButton>
          <button
            type="button"
            onClick={() => setStep("email")}
            className="w-full text-center text-sm text-muted-foreground hover:text-foreground"
          >
            Use a different email
          </button>
        </form>
      ) : null}

      {step === "done" ? (
        <div className="flex items-center gap-3 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          <CheckCircle2 className="size-5" /> Your password has been reset.
        </div>
      ) : null}

      <p className="text-center text-sm text-muted-foreground">
        Remember your password?{" "}
        <Link
          href="/login"
          className="font-semibold text-primary hover:underline"
        >
          Back to Login
        </Link>
      </p>
    </div>
  );
}
