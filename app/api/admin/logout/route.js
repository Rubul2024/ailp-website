/* ==========================================================
   Admin Logout API
========================================================== */

import { NextResponse } from "next/server";

export async function POST() {

  try {

    // Create Response

    const response = NextResponse.json({

      success: true,

      message: "Admin logged out successfully.",

    });

    // Remove Cookie

    response.cookies.set(

      "adminToken",

      "",

      {

        httpOnly: true,

        secure: process.env.NODE_ENV === "production",

        sameSite: "strict",

        expires: new Date(0),

        path: "/",

      }

    );

    return response;

  }

  catch (error) {

    console.error(error);

    return NextResponse.json(

      {

        success: false,

        message: "Server Error",

      },

      {

        status: 500,

      }

    );

  }

}