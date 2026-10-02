import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { Portal, SessionUser } from "@/types";
import {
  SESSION_COOKIE,
  SESSION_MAX_AGE,
  TOKEN_COOKIE,
  portalRoles,
} from "./config";
import { decodeSession, encodeSession } from "./session-codec";

export async function getSession(): Promise<SessionUser | null> {
  const store = await cookies();
  return decodeSession(store.get(SESSION_COOKIE)?.value);
}

export async function getAccessToken() {
  const store = await cookies();
  return store.get(TOKEN_COOKIE)?.value ?? null;
}

export async function requirePortal(portal: Portal) {
  const user = await getSession();
  if (!user) redirect("/login");
  if (!portalRoles[portal].includes(user.role)) redirect("/dashboard");
  return user;
}

export async function createSession(user: SessionUser, token: string) {
  const store = await cookies();
  const options = {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  };
  store.set(SESSION_COOKIE, encodeSession(user), options);
  store.set(TOKEN_COOKIE, token, options);
}

export async function destroySession() {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
  store.delete(TOKEN_COOKIE);
}
