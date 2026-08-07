/* ==========================================================
   Admin Login API
========================================================== */

import { NextResponse } from "next/server";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import connectDB from "@/lib/mongodb";
import Admin from "@/models/Admin";

export async function POST(request) {
  try {
    // Connect Database
    await connectDB();

    // Read Request Body
    const { email, password } = await request.json();

    // Validate Input
    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Email and Password are required.",
        },
        {
          status: 400,
        },
      );
    }

    // Check JWT Secret
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is missing in .env.local");
    }

    // Find Admin
    const admin = await Admin.findOne({
      email: email.trim().toLowerCase(),
    });

    if (!admin) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid Email or Password.",
        },
        {
          status: 401,
        },
      );
    }

    // Verify Password

    const isPasswordCorrect = await bcrypt.compare(
      password,

      admin.password,
    );

    if (!isPasswordCorrect) {
      return NextResponse.json(
        {
          success: false,

          message: "Invalid Email or Password.",
        },
        {
          status: 401,
        },
      );
    }

    /* ==========================================
   Update Last Login Time
========================================== */

    admin.lastLogin = new Date();

    await admin.save();

    /* ==========================================
   Generate JWT Token
========================================== */

    const token = jwt.sign(
      {
        adminId: admin._id,

        email: admin.email,

        role: admin.role,
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "7d",
      },
    );

    // Create Response
    const response = NextResponse.json({
      success: true,
      message: "Admin Login Successful",
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    });

    // Set Secure Cookie
    response.cookies.set("adminToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Admin Login Error:", error);

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
