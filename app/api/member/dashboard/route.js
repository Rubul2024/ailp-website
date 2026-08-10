/* ==========================================================
   Member Dashboard API
   Production Ready
========================================================== */

import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";

import Member from "@/models/Member";

import verifyMember from "@/utils/verifyMember";

/* ==========================================================
   Dashboard Data
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
        },
      );
    }

    /* ==========================================
       Find Member
    ========================================== */

    const member = await Member.findById(
      auth.memberId
    ).select("-password");

    if (!member) {
      return NextResponse.json(
        {
          success: false,
          message: "Member not found.",
        },
        {
          status: 404,
        },
      );
    }

    /* ==========================================
       Dashboard Response
    ========================================== */

    return NextResponse.json({
      success: true,

      dashboard: {
        fullName: member.fullName,

        membershipId: member.membershipId,

        membershipStatus: member.membershipStatus,

        profileCompleted:
          member.profileCompleted,

        profilePercentage:
          member.profilePercentage,

        cardGenerated:
          member.cardGenerated,

        cardUrl:
          member.cardUrl,

        qrCode:
          member.qrCode,

        joinDate:
          member.joinDate,

        photo:
          member.photo,

        totalDonation:
          member.totalDonation,

        donationCount:
          member.donationCount,

        lastDonation:
          member.lastDonation,

        highestDonation:
          member.highestDonation,

        verified:
          member.verified,
      },
    });

  } catch (error) {

    console.error(
      "Dashboard API Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Internal Server Error",
      },
      {
        status: 500,
      },
    );
  }
}