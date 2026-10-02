"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Mail } from "lucide-react";
import { AuthInput, AuthPasswordInput } from "@/components/auth/auth-input";
import { AuthSubmitButton } from "@/components/auth/auth-submit-button";
import { SocialAuth } from "@/components/auth/social-auth";

export function RegisterForm() {
  const [agreed, setAgreed] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-[2rem]">
          Create an Account
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-primary hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid gap-4 sm:grid-cols-2">
          <AuthInput
            label="First Name"
            name="firstName"
            autoComplete="given-name"
            placeholder="John"
            required
          />
          <AuthInput
            label="Last Name"
            name="lastName"
            autoComplete="family-name"
            placeholder="Last Name"
            required
          />
        </div>

        <AuthInput
          label="Email Address"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="Email Address"
          required
          endAdornment={<Mail className="size-4 text-emerald-500" />}
        />

        <AuthPasswordInput
          label="Password"
          name="password"
          autoComplete="new-password"
          placeholder="Password"
          required
        />

        <AuthSubmitButton>Create Account</AuthSubmitButton>

        <label className="flex items-start gap-2.5 pt-1 text-sm text-foreground/80">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(event) => setAgreed(event.target.checked)}
            className="mt-0.5 size-4 rounded border-[#d1d5db] text-primary accent-primary"
            required
          />
          <span>
            I agree to the{" "}
            <span className="font-semibold text-foreground">
              Terms & Condition
            </span>
          </span>
        </label>
      </form>

      <SocialAuth />
    </div>
  );
}
