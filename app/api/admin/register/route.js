/* ==========================================================
   Admin Registration API
========================================================== */

import { NextResponse } from "next/server";

import bcrypt from "bcryptjs";

import connectDB from "@/lib/mongodb";
import Admin from "@/models/Admin";

/* ==========================================================
   Register Admin
========================================================== */

export async function POST(request) {
  try {
    // Connect Database
    await connectDB();

    // Read Request
    const { name, email, password } = await request.json();

    // Validate Input
    if (!name || !email || !password) {
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

    // Password Validation
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

    // Check Existing Admin
    const existingAdmin = await Admin.findOne({
      email: email.trim().toLowerCase(),
    });

    if (existingAdmin) {
      return NextResponse.json(
        {
          success: false,
          message: "Admin already exists.",
        },
        {
          status: 409,
        }
      );
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create Admin
    const admin = await Admin.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password: hashedPassword,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Admin created successfully.",
        admin: {
          id: admin._id,
          name: admin.name,
          email: admin.email,
        },
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Admin Register API Error:", error);

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