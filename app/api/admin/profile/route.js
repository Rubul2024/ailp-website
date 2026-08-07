/* ==========================================================
   Admin Profile API
========================================================== */

import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import verifyAdmin from "@/lib/verifyAdmin";

import Admin from "@/models/Admin";

/* ==========================================================
   GET Admin Profile
========================================================== */

export async function GET(request) {
  try {
    // Verify Admin
    const auth = verifyAdmin(request);

    if (!auth.success) {
      return NextResponse.json(
        {
          success: false,
          message: auth.message,
        },
        {
          status: 401,
        }
      );
    }

    // Connect Database
    await connectDB();

    // Find Admin
    const admin = await Admin.findById(
      auth.admin.adminId
    ).select("-password");

    if (!admin) {
      return NextResponse.json(
        {
          success: false,
          message: "Admin not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      admin,
    });
  } catch (error) {
    console.error("Admin Profile API Error:", error);

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