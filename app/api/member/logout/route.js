/* ==========================================================
   Member Logout API
========================================================== */

import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json({
      success: true,
      message: "Logout Successful",
    });

    // Delete Cookie

    response.cookies.set("memberToken", "", {
      httpOnly: true,

      secure: process.env.NODE_ENV === "production",

      sameSite: "strict",

      expires: new Date(0),

      path: "/",
    });

    return response;
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Server Error",
      },
      {
        status: 500,
      },
    );
  }
}
