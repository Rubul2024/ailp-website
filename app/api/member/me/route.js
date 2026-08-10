/* ==========================================================
   MEMBER SESSION API
   All India Labour Party
========================================================== */

import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";

import Member from "@/models/Member";

import jwt from "jsonwebtoken";

/* ==========================================================
   GET CURRENT MEMBER
========================================================== */

export async function GET(request) {
  try {
    /* ======================================================
       Get Member Token
    ====================================================== */

    const token = request.cookies.get("memberToken")?.value;

    /* ======================================================
       No Token
       
       This is NOT a server error.
       It simply means the member is not logged in.
    ====================================================== */

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          authenticated: false,
          member: null,
          message: "Member is not logged in.",
        },
        {
          status: 200,
        }
      );
    }

    /* ======================================================
       Verify JWT
    ====================================================== */

    let decoded;

    try {
      decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );
    } catch (error) {
      console.error("Invalid Member Token:", error);

      return NextResponse.json(
        {
          success: false,
          authenticated: false,
          member: null,
          message: "Invalid or expired session.",
        },
        {
          status: 200,
        }
      );
    }

    /* ======================================================
       Connect MongoDB
    ====================================================== */

    await connectDB();

    /* ======================================================
       Find Member
       
       Depending on your login API, your JWT may contain:
       - memberId
       - id
       - _id
    ====================================================== */

    const memberId =
      decoded.memberId ||
      decoded.id ||
      decoded._id;

    if (!memberId) {
      return NextResponse.json(
        {
          success: false,
          authenticated: false,
          member: null,
          message: "Invalid member session.",
        },
        {
          status: 200,
        }
      );
    }

    /* ======================================================
       Find Member
    ====================================================== */

    const member = await Member.findById(memberId).select(
      "-password"
    );

    /* ======================================================
       Member Not Found
    ====================================================== */

    if (!member) {
      return NextResponse.json(
        {
          success: false,
          authenticated: false,
          member: null,
          message: "Member account not found.",
        },
        {
          status: 200,
        }
      );
    }

    /* ======================================================
       Success
    ====================================================== */

    return NextResponse.json(
      {
        success: true,
        authenticated: true,
        member,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Member Me API Error:", error);

    return NextResponse.json(
      {
        success: false,
        authenticated: false,
        member: null,
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}