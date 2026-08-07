/* ==========================================================
   Verify Member API
   All India Labour Party
   Production Ready
========================================================== */

import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Member from "@/models/Member";

/* ==========================================================
   GET
========================================================== */

export async function GET(request, { params }) {
  try {
    /* ==========================================
       Connect Database
    ========================================== */

    await connectDB();

    /* ==========================================
       Membership ID
    ========================================== */

    const { membershipId } = params;

    if (!membershipId) {
      return NextResponse.json(
        {
          success: false,
          message: "Membership ID is required.",
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
      membershipId,
    }).select({
      fullName: 1,
      membershipId: 1,
      membershipStatus: 1,
      photo: 1,
      district: 1,
      state: 1,
      joinDate: 1,
      cardGenerated: 1,
      verified: 1,
      verifiedDate: 1,
      _id: 0,
    });

    /* ==========================================
       Member Not Found
    ========================================== */

    if (!member) {
      return NextResponse.json(
        {
          success: false,
          message: "Membership not found.",
        },
        {
          status: 404,
        }
      );
    }

    /* ==========================================
       Response
    ========================================== */

    return NextResponse.json(
      {
        success: true,

        message: "Member verified successfully.",

        member: {
          fullName: member.fullName,

          membershipId: member.membershipId,

          membershipStatus:
            member.membershipStatus,

          district: member.district,

          state: member.state,

          joinDate: member.joinDate,

          photo: member.photo,

          cardGenerated:
            member.cardGenerated,

          verified: member.verified,

          verifiedDate:
            member.verifiedDate,
        },
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "Verify Member Error:",
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