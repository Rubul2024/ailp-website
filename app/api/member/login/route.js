/* ==========================================================
   Member Login API
   All India Labour Party
   Production Ready
========================================================== */

import { NextResponse } from "next/server";

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import connectDB from "@/lib/mongodb";
import Member from "@/models/Member";

/* ==========================================================
   Member Login
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

    const { email, password } = await request.json();

    /* ==========================================
       Validation
    ========================================== */

    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Email and Password are required.",
        },
        {
          status: 400,
        }
      );
    }

    /* ==========================================
       JWT Secret Check
    ========================================== */

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is missing in .env.local");
    }

    /* ==========================================
       Find Member
    ========================================== */

    const member = await Member.findOne({
      email: email.trim().toLowerCase(),
    }).select("+password");

    if (!member) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password.",
        },
        {
          status: 401,
        }
      );
    }

    /* ==========================================
       Account Status
    ========================================== */

    if (!member.isActive) {
      return NextResponse.json(
        {
          success: false,
          message: "Your account has been deactivated.",
        },
        {
          status: 403,
        }
      );
    }

    /* ==========================================
       Compare Password
    ========================================== */

    const isMatch = await bcrypt.compare(
      password,
      member.password
    );

    if (!isMatch) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password.",
        },
        {
          status: 401,
        }
      );
    }

    /* ==========================================
       Update Last Login
    ========================================== */

    member.lastLogin = new Date();

    await member.save();

    /* ==========================================
       Generate JWT
    ========================================== */

    const token = jwt.sign(
      {
        memberId: member._id,

        email: member.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    /* ==========================================
       Response
    ========================================== */

    const response = NextResponse.json({
      success: true,
      message: "Login Successful",

      member: {
        id: member._id,
        fullName: member.fullName,
        email: member.email,
        membershipId: member.membershipId,
      },
    });

    /* ==========================================
       Set Cookie
    ========================================== */

    response.cookies.set("memberToken", token, {
      httpOnly: true,

      secure: process.env.NODE_ENV === "production",

      sameSite: "lax",

      maxAge: 60 * 60 * 24 * 7,

      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Member Login Error:", error);

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