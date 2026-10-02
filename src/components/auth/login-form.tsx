"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Mail } from "lucide-react";
import { AuthInput, AuthPasswordInput } from "@/components/auth/auth-input";
import { AuthSubmitButton } from "@/components/auth/auth-submit-button";
import { SocialAuth } from "@/components/auth/social-auth";
import { signIn, type AuthFormState } from "@/lib/auth/actions";
import { roleLabels } from "@/lib/auth/config";
import type { Role } from "@/types";

const demoRoles = Object.entries(roleLabels) as [Role, string][];

type LoginFormProps = {
  demoMode?: boolean;
  next?: string;
};

export function LoginForm({ demoMode = false, next }: LoginFormProps) {
  const [state, formAction, pending] = useActionState<AuthFormState, FormData>(signIn, {});

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-[2rem]">
          Welcome Back
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-primary hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>

      <form className="space-y-4" action={formAction}>
        {next ? <input type="hidden" name="next" value={next} /> : null}

        {state.error ? (
          <p className="rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
            {state.error}
          </p>
        ) : null}

        <div>
          <AuthInput
            label="Email Address"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Email Address"
            required
            endAdornment={<Mail className="size-4 text-emerald-500" />}
          />
          {state.fieldErrors?.email ? (
            <p className="mt-1 text-xs text-destructive">{state.fieldErrors.email}</p>
          ) : null}
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between gap-3">
            <label
              htmlFor="password"
              className="text-sm font-medium text-foreground/80"
            >
              Password
            </label>
            <Link
              href="/forgot-password"
              className="text-sm font-medium text-primary hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
          <AuthPasswordInput
            id="password"
            label="Password"
            hideLabel
            name="password"
            autoComplete="current-password"
            placeholder="Password"
            required
          />
          {state.fieldErrors?.password ? (
            <p className="text-xs text-destructive">{state.fieldErrors.password}</p>
          ) : null}
        </div>

        {demoMode ? (
          <label className="block space-y-1.5" htmlFor="role">
            <span className="text-sm font-medium text-foreground/80">
              Sign in as <span className="text-muted-foreground">(demo mode)</span>
            </span>
            <select
              id="role"
              name="role"
              defaultValue="student"
              className="h-11 w-full rounded-lg border border-[#e5e7eb] bg-white px-3.5 text-sm outline-none focus:border-primary focus:ring-3 focus:ring-primary/20"
            >
              {demoRoles.map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
        ) : null}

        <AuthSubmitButton disabled={pending}>
          {pending ? "Signing in…" : "Log in"}
        </AuthSubmitButton>
      </form>

      <SocialAuth />
    </div>
  );
}
