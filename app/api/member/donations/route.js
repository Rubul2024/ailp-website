/* ==========================================================
   Member Donation History API
   All India Labour Party
   Production Ready
========================================================== */

import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";

import Donation from "@/models/Donation";

import verifyMember from "@/utils/verifyMember";

/* ==========================================================
   Get Donation History
========================================================== */

export async function GET(request) {
  try {
    /* ==========================================
       Connect Database
    ========================================== */

    await connectDB();

    /* ==========================================
       Verify Member
    ========================================== */

    const auth = verifyMember(request);

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

    /* ==========================================
       Read Query Parameters
    ========================================== */

    const { searchParams } = new URL(request.url);

    const page = Number(searchParams.get("page")) || 1;

    const limit = Number(searchParams.get("limit")) || 10;

    const skip = (page - 1) * limit;

    /* ==========================================
       Total Records
    ========================================== */

    const totalDonations = await Donation.countDocuments({
      member: auth.memberId,
    });

    /* ==========================================
       Donation History
    ========================================== */

    const donations = await Donation.find({
      member: auth.memberId,
    })
      .sort({
        createdAt: -1,
      })
      .skip(skip)
      .limit(limit)
      .lean();

    /* ==========================================
       Response
    ========================================== */

    return NextResponse.json({
      success: true,

      pagination: {
        currentPage: page,

        totalPages: Math.ceil(
          totalDonations / limit
        ),

        totalRecords: totalDonations,

        limit,
      },

      donations,
    });

  } catch (error) {
    console.error(
      "Donation History Error:",
      error
    );

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