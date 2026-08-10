/* ==========================================================
   Member Card API
   Production Ready
========================================================== */

import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Member from "@/models/Member";
import verifyMember from "@/utils/verifyMember";

/* ==========================================================
   Get Membership Card
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
       Find Member
    ========================================== */

    const member = await Member.findById(auth.memberId).select("-password");

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

    /* ==========================================
       Card Not Generated
    ========================================== */

    if (!member.cardGenerated) {
      return NextResponse.json(
        {
          success: false,
          message: "Membership card has not been generated yet.",
        },
        {
          status: 400,
        }
      );
    }

    /* ==========================================
       Success
    ========================================== */

    return NextResponse.json({
      success: true,

      card: {
        fullName: member.fullName,

        membershipId: member.membershipId,

        membershipStatus: member.membershipStatus,

        verified: member.verified,

        joinDate: member.joinDate,

        district: member.district,

        state: member.state,

        photo: member.photo,

        qrCode: member.qrCode,

        cardUrl: member.cardUrl,

        cardGenerated: member.cardGenerated,

        cardGeneratedAt: member.cardGeneratedAt,
      },
    });
  } catch (error) {
    console.error("Member Card API Error:", error);

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