"use server";

import { redirect } from "next/navigation";
import type { Role, SessionUser } from "@/types";
import { loginSchema } from "@/lib/validations/auth";
import { isDemoMode, roleHome } from "./config";
import { createSession, destroySession } from "./session";

export type AuthFormState = {
  error?: string;
  fieldErrors?: Partial<Record<"email" | "password" | "role", string>>;
};

function nameFromEmail(email: string) {
  return email
    .split("@")[0]
    .split(/[._-]+/)
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join(" ");
}

async function authenticate(
  email: string,
  password: string,
  role: Role | undefined,
): Promise<{ user: SessionUser; token: string } | { error: string }> {
  if (isDemoMode()) {
    return {
      token: "demo",
      user: {
        id: `demo-${role ?? "student"}`,
        name: nameFromEmail(email) || "Demo User",
        email,
        role: role ?? "student",
      },
    };
  }

  const res = await fetch(`${process.env.API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    cache: "no-store",
  });
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    return { error: body?.message ?? "Invalid email or password" };
  }
  const { accessToken, user } = (await res.json()) as {
    accessToken: string;
    user: SessionUser;
  };
  return { user, token: accessToken };
}

export async function signIn(
  _prev: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    role: formData.get("role") || undefined,
  });

  if (!parsed.success) {
    const fieldErrors: AuthFormState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof NonNullable<AuthFormState["fieldErrors"]>;
      fieldErrors[key] ??= issue.message;
    }
    return { fieldErrors };
  }

  const result = await authenticate(
    parsed.data.email,
    parsed.data.password,
    parsed.data.role,
  );
  if ("error" in result) return { error: result.error };

  await createSession(result.user, result.token);

  const next = String(formData.get("next") ?? "");
  redirect(next.startsWith("/") && !next.startsWith("//") ? next : roleHome[result.user.role]);
}

export async function signOut() {
  await destroySession();
  redirect("/login");
}
