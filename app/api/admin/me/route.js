/* ==========================================================
   Current Admin API
   Returns the currently logged-in administrator
========================================================== */

import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import verifyAdmin from "@/lib/verifyAdmin";
import Admin from "@/models/Admin";

export async function GET(request) {
  try {
    /* ======================================================
       VERIFY ADMIN TOKEN
    ====================================================== */

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

    /* ======================================================
       CONNECT DATABASE
    ====================================================== */

    await connectDB();

    /* ======================================================
       FIND ADMIN
    ====================================================== */

    const admin = await Admin.findById(auth.admin.adminId).select(
      "-password"
    );

    if (!admin) {
      return NextResponse.json(
        {
          success: false,
          message: "Administrator account not found.",
        },
        {
          status: 404,
        }
      );
    }

    /* ======================================================
       CHECK ACCOUNT STATUS
    ====================================================== */

    if (!admin.isActive) {
      return NextResponse.json(
        {
          success: false,
          message: "Administrator account is inactive.",
        },
        {
          status: 403,
        }
      );
    }

    /* ======================================================
       SUCCESS
    ====================================================== */

    return NextResponse.json({
      success: true,

      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        mobile: admin.mobile,
        avatar: admin.avatar,
        role: admin.role,
        isActive: admin.isActive,
        lastLogin: admin.lastLogin,
        createdAt: admin.createdAt,
      },
    });
  } catch (error) {
    console.error("========== ADMIN ME API ERROR ==========");
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load administrator profile.",
      },
      {
        status: 500,
      }
    );
  }
}