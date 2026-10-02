import { NextResponse, type NextRequest } from "next/server";
import {
  SESSION_COOKIE,
  authPaths,
  canAccessPath,
  portalForPath,
  roleHome,
} from "@/lib/auth/config";
import { decodeSession } from "@/lib/auth/session-codec";

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const user = decodeSession(request.cookies.get(SESSION_COOKIE)?.value);
  const redirectTo = (path: string) =>
    NextResponse.redirect(new URL(path, request.url));

  if (pathname === "/dashboard") {
    return redirectTo(user ? roleHome[user.role] : "/login");
  }

  if (authPaths.includes(pathname)) {
    return user ? redirectTo(roleHome[user.role]) : NextResponse.next();
  }

  if (portalForPath(pathname)) {
    if (!user) {
      const login = new URL("/login", request.url);
      login.searchParams.set("next", pathname + search);
      return NextResponse.redirect(login);
    }
    if (!canAccessPath(user.role, pathname)) {
      return redirectTo(roleHome[user.role]);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard",
    "/login",
    "/register",
    "/forgot-password",
    "/student/:path*",
    "/parent/:path*",
    "/teacher/:path*",
    "/mentor/:path*",
    "/admin/:path*",
  ],
};
