/* ==========================================================
   Member Dashboard API
========================================================== */

import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Member from "@/models/Member";

import verifyMember from "@/utils/verifyMember";

export async function GET(request) {

  try {

    // Verify Login

    const auth = verifyMember(request);

    if (!auth.success) {

      return NextResponse.json(auth, {
        status: 401,
      });

    }

    // Connect Database

    await connectDB();

    // Find Member

    const member = await Member.findById(auth.memberId)
      .select("-password");

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

    // Dashboard Data

    return NextResponse.json({

      success: true,

      dashboard: {

        memberId: member.memberId,

        fullName: member.fullName,

        email: member.email,

        mobile: member.mobile,

        photo: member.photo,

        qrCode: member.qrCode,

        cardPdf: member.cardPdf,

        state: member.state,

        district: member.district,

        status: member.status,

      },

    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Server Error",
      },
      {
        status: 500,
      }
    );

  }

}