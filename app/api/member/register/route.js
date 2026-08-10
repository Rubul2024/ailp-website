/* ==========================================================
   Member Registration API
   All India Labour Party
   Production Ready
========================================================== */

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import connectDB from "@/lib/mongodb";
import Member from "@/models/Member";

/* ==========================================================
   Register Member
========================================================== */

export async function POST(request) {
  try {
    /* ==========================================
       Connect Database
    ========================================== */

    await connectDB();

    /* ==========================================
       Read Request
    ========================================== */

    const body = await request.json();

    const fullName = body.fullName?.trim();
    const email = body.email?.trim().toLowerCase();
    const mobile = body.mobile?.trim();
    const password = body.password;

    /* ==========================================
       Validation
    ========================================== */

    if (!fullName || !email || !mobile || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required.",
        },
        {
          status: 400,
        }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        {
          success: false,
          message: "Password must be at least 8 characters.",
        },
        {
          status: 400,
        }
      );
    }

    /* ==========================================
       Duplicate Email
    ========================================== */

    const emailExists = await Member.findOne({
      email,
    });

    if (emailExists) {
      return NextResponse.json(
        {
          success: false,
          message: "Email already registered.",
        },
        {
          status: 409,
        }
      );
    }

    /* ==========================================
       Duplicate Mobile
    ========================================== */

    const mobileExists = await Member.findOne({
      mobile,
    });

    if (mobileExists) {
      return NextResponse.json(
        {
          success: false,
          message: "Mobile number already registered.",
        },
        {
          status: 409,
        }
      );
    }

    /* ==========================================
       Hash Password
    ========================================== */

    const hashedPassword = await bcrypt.hash(password, 12);

    /* ==========================================
       Create Member
    ========================================== */

    const member = await Member.create({
      fullName,
      email,
      mobile,
      password: hashedPassword,

      membershipStatus: "REGISTERED",
      profileCompleted: false,
      profilePercentage: 0,

      isActive: true,
    });

    /* ==========================================
       Response
    ========================================== */

    return NextResponse.json(
      {
        success: true,

        message:
          "Registration completed successfully. Please login.",

        memberId: member._id,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Member Register Error:", error);

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