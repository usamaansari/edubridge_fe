import type { Role, SessionUser } from "@/types";

const roles: Role[] = [
  "student",
  "parent",
  "teacher",
  "mentor",
  "centre_admin",
  "super_admin",
];

export function encodeSession(user: SessionUser) {
  return Buffer.from(JSON.stringify(user)).toString("base64url");
}

// The session cookie is unsigned and only drives optimistic UI/routing checks;
// the Express API must authorise every request using the bearer token.
export function decodeSession(value: string | undefined): SessionUser | null {
  if (!value) return null;
  try {
    const parsed = JSON.parse(Buffer.from(value, "base64url").toString("utf8"));
    if (
      typeof parsed?.id === "string" &&
      typeof parsed?.name === "string" &&
      roles.includes(parsed?.role)
    ) {
      return parsed as SessionUser;
    }
  } catch {}
  return null;
}
