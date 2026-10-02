import type { Portal, Role } from "@/types";

export const SESSION_COOKIE = "eb_session";
export const TOKEN_COOKIE = "eb_token";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7;

export const roleLabels: Record<Role, string> = {
  student: "Student",
  parent: "Parent",
  teacher: "Teacher",
  mentor: "Mentor",
  centre_admin: "Centre Admin",
  super_admin: "Super Admin",
};

export const roleHome: Record<Role, string> = {
  student: "/student/dashboard",
  parent: "/parent/dashboard",
  teacher: "/teacher/dashboard",
  mentor: "/mentor/dashboard",
  centre_admin: "/admin/dashboard",
  super_admin: "/admin/dashboard",
};

export const portalRoles: Record<Portal, Role[]> = {
  student: ["student"],
  parent: ["parent"],
  teacher: ["teacher"],
  mentor: ["mentor"],
  admin: ["centre_admin", "super_admin"],
};

export const superAdminOnlyPaths = ["/admin/organisations", "/admin/audit-logs"];

export const authPaths = ["/login", "/register", "/forgot-password"];

export function portalForPath(pathname: string): Portal | null {
  const segment = pathname.split("/")[1];
  return segment in portalRoles ? (segment as Portal) : null;
}

export function canAccessPath(role: Role, pathname: string) {
  const portal = portalForPath(pathname);
  if (!portal) return true;
  if (!portalRoles[portal].includes(role)) return false;
  if (superAdminOnlyPaths.some((p) => pathname.startsWith(p))) {
    return role === "super_admin";
  }
  return true;
}

export function isDemoMode() {
  return !process.env.API_URL;
}
