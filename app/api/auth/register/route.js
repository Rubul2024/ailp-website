/* ==========================================================
   Member Registration API
   Production Ready
========================================================== */

import { NextResponse } from "next/server";

import bcrypt from "bcryptjs";

import connectDB from "@/lib/mongodb";

import Member from "@/models/Member";

import generateMemberId from "@/utils/generateMemberId";

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

    if (!fullName || !email || !mobile || !password || !confirmPassword) {
      return NextResponse.json(
        {
          success: false,

          message: "Please fill all required fields.",
        },

        {
          status: 400,
        },
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
        },
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
        },
      );
    }

    /* ==========================================
       Existing Email
    ========================================== */

    const emailExists = await Member.findOne({
      email: email.toLowerCase(),
    });

    if (emailExists) {
      return NextResponse.json(
        {
          success: false,

          message: "Email already registered.",
        },

        {
          status: 409,
        },
      );
    }

    /* ==========================================
       Existing Mobile
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
        },
      );
    }

    /* ==========================================
       Hash Password
    ========================================== */

    const hashedPassword = await bcrypt.hash(
      password,

      12,
    );

    /* ==========================================
   Generate Membership ID
========================================== */

const membershipId = await generateMemberId();

    /* ==========================================
       Create Member
    ========================================== */

   const member = await Member.create({

  fullName,

  email: email.toLowerCase(),

  mobile,

  password: hashedPassword,

  membershipId,

  joinDate: new Date(),

  membershipStatus: "REGISTERED",

  profileCompleted: false,

});

    /* ==========================================
       Success
    ========================================== */

    return NextResponse.json(
      {
        success: true,

        message: "Registration successful.",

        memberId: member._id,
      },

      {
        status: 201,
      },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,

        message: "Internal Server Error",
      },

      {
        status: 500,
      },
    );
  }
}
