/* ==========================================================
   Member Donation Summary API
   All India Labour Party
========================================================== */

import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";

import Member from "@/models/Member";

import verifyMember from "@/utils/verifyMember";

/* ==========================================================
   Get Member Donation Summary
========================================================== */

export async function GET(request) {
  try {
    await connectDB();

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

    const member = await Member.findById(auth.memberId).select(
      "totalDonation donationCount highestDonation lastDonation"
    );

    if (!member) {
      return NextResponse.json(
        {
          success: false,
          message: "Member not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,

      summary: member,
    });
  } catch (error) {
    console.error("Donation Summary Error:", error);

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
