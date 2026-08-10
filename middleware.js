/* ==========================================================
   AILP Middleware
   Production Ready
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
   Middleware
========================================================== */

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  /* ==========================================
     Member Protected Routes
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

    if (!token) {
      return NextResponse.redirect(
        new URL("/member/login", request.url)
      );
    }

    try {
      await verifyToken(token);
    } catch (error) {
      console.error("Member JWT Error:", error.message);

      return NextResponse.redirect(
        new URL("/member/login", request.url)
      );
    }
  }

  /* ==========================================
     Admin Protected Routes
  ========================================== */

  const protectedAdminRoutes = [
    "/admin/dashboard",
    "/admin/members",
    "/admin/donations",
    "/admin/news",
    "/admin/contact",
    "/admin/newsletter",
    "/admin/settings",
  ];

  const isAdminRoute = protectedAdminRoutes.some((route) =>
    pathname.startsWith(route)
  );

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