/* ==========================================================
   Member Registration API
   All India Labour Party
   Production Ready
========================================================== */

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import connectDB from "@/lib/mongodb";
import Member from "@/models/Member";
import generateMembershipId from "@/utils/generateMembershipId";

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
       Read Request Body
    ========================================== */

    const {
      fullName,
      email,
      mobile,
      password,
      confirmPassword,
    } = await request.json();

    /* ==========================================
       Validation
    ========================================== */

    if (
      !fullName ||
      !email ||
      !mobile ||
      !password ||
      !confirmPassword
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Please fill all required fields.",
        },
        {
          status: 400,
        }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "Passwords do not match.",
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
       Normalize Input
    ========================================== */

    const normalizedEmail = email.trim().toLowerCase();
    const normalizedMobile = mobile.trim();

    /* ==========================================
       Existing Email
    ========================================== */

    const emailExists = await Member.findOne({
      email: normalizedEmail,
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
       Existing Mobile
    ========================================== */

    const mobileExists = await Member.findOne({
      mobile: normalizedMobile,
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
       Generate Membership ID
    ========================================== */

    const membershipId = await generateMembershipId();

    /* ==========================================
       Create Member
    ========================================== */

    const member = await Member.create({
      fullName: fullName.trim(),

      email: normalizedEmail,

      mobile: normalizedMobile,

      password: hashedPassword,

      membershipId,

      joinDate: new Date(),

      membershipStatus: "REGISTERED",

      profileCompleted: false,

      profilePercentage: 0,

      isActive: true,
    });

    /* ==========================================
       Success Response
    ========================================== */

    return NextResponse.json(
      {
        success: true,

        message: "Registration completed successfully.",

        memberId: member._id,

        membershipId: member.membershipId,
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