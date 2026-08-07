/* ==========================================================
   Member Login API
   Production Ready
========================================================== */

import { NextResponse } from "next/server";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import connectDB from "@/lib/mongodb";
import Member from "@/models/Member";

export async function POST(request) {

  try {

    /* ==========================================
       Connect Database
    ========================================== */

    await connectDB();

    /* ==========================================
       Read Request
    ========================================== */

    const {

      email,

      password,

      remember,

    } = await request.json();

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
       Find Member
    ========================================== */

    const member = await Member.findOne({

      email: email.toLowerCase(),

    });

    if (!member) {

      return NextResponse.json(
        {
          success: false,
          message: "Invalid Email or Password.",
        },
        {
          status: 401,
        }
      );

    }

    /* ==========================================
       Active Account
    ========================================== */

    if (!member.isActive) {

      return NextResponse.json(
        {
          success: false,
          message: "Your account has been disabled.",
        },
        {
          status: 403,
        }
      );

    }

    /* ==========================================
       Password Check
    ========================================== */

    const validPassword = await bcrypt.compare(

      password,

      member.password

    );

    if (!validPassword) {

      return NextResponse.json(
        {
          success: false,
          message: "Invalid Email or Password.",
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
       JWT
    ========================================== */

    const token = jwt.sign(

      {

        memberId: member._id,

        email: member.email,

      },

      process.env.JWT_SECRET,

      {

        expiresIn: remember

          ? "30d"

          : "7d",

      }

    );

    /* ==========================================
       Response
    ========================================== */

    const response = NextResponse.json({

      success: true,

      message: "Login Successful.",

    });

    /* ==========================================
       Cookie
    ========================================== */

    response.cookies.set(

      "memberToken",

      token,

      {

        httpOnly: true,

        secure: process.env.NODE_ENV === "production",

        sameSite: "strict",

        path: "/",

        maxAge: remember

          ? 60 * 60 * 24 * 30
          : 60 * 60 * 24 * 7,

      }

    );

    return response;

  }

  catch (error) {

    console.error(error);

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