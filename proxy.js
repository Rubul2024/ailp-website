/* ==========================================================
   AILP Proxy
   Production Ready
   Next.js 16
========================================================== */

import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

/* ==========================================================
   Verify JWT
========================================================== */

async function verifyToken(token) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  await jwtVerify(token, secret);
}

/* ==========================================================
   Proxy
========================================================== */

export async function proxy(request) {
  const { pathname } = request.nextUrl;

  /* ==========================================
     Member Login / Register — skip them when
     already signed in.
  ========================================== */

  if (pathname === "/member/login" || pathname === "/member/register") {
    const token = request.cookies.get("memberToken")?.value;

    if (token) {
      try {
        await verifyToken(token);
        return NextResponse.redirect(new URL("/member/dashboard", request.url));
      } catch {
        // Expired or invalid session: show the login page.
      }
    }

    return NextResponse.next();
  }

  /* ==========================================
     Member Protected Routes
     Unauthenticated visitors are sent to the
     login page with ?next= so they return to
     the page they asked for.
  ========================================== */

  const protectedMemberRoutes = [
    "/member/dashboard",
    "/member/profile",
    "/member/card",
    "/member/donation",
    "/member/settings",
  ];

  const isMemberRoute = protectedMemberRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isMemberRoute) {
    const token = request.cookies.get("memberToken")?.value;

    const loginUrl = new URL("/member/login", request.url);
    loginUrl.searchParams.set("next", pathname + request.nextUrl.search);

    if (!token) {
      return NextResponse.redirect(loginUrl);
    }

    try {
      await verifyToken(token);
    } catch {
      return NextResponse.redirect(loginUrl);
    }
  }

  /* ==========================================
     Admin Protected Routes
     Everything under /admin except the login
     page itself requires a valid admin session.
  ========================================== */

  const isAdminRoute =
    pathname.startsWith("/admin") && !pathname.startsWith("/admin/login");

  if (isAdminRoute) {
    const token = request.cookies.get("adminToken")?.value;

    if (!token) {
      return NextResponse.redirect(
        new URL("/admin/login", request.url)
      );
    }

    try {
      await verifyToken(token);
    } catch (error) {
      console.error("Admin JWT Error:", error.message);

      return NextResponse.redirect(
        new URL("/admin/login", request.url)
      );
    }
  }

  return NextResponse.next();
}

/* ==========================================================
   Matcher
========================================================== */

export const config = {
  matcher: [
    "/member/:path*",
    "/admin/:path*",
  ],
};
