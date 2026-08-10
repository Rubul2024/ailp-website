/* ==========================================================
   Member Logout API
   Production Ready
========================================================== */

import { NextResponse } from "next/server";

/* ==========================================================
   Logout Member
========================================================== */

export async function POST() {
  try {
    /* ==========================================
       Create Response
    ========================================== */

    const response = NextResponse.json({
      success: true,
      message: "Logout successful.",
    });

    /* ==========================================
       Remove Authentication Cookie
    ========================================== */

    response.cookies.set("memberToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires: new Date(0),
      path: "/",
    });

    /* ==========================================
       Return Response
    ========================================== */

    return response;
  } catch (error) {
    console.error("Member Logout Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}