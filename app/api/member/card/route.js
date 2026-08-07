/* ==========================================================
   Download Membership Card API
========================================================== */

import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Member from "@/models/Member";

import verifyMember from "@/utils/verifyMember";

export async function GET(request) {

  try {

    // Verify Member

    const auth = verifyMember(request);

    if (!auth.success) {

      return NextResponse.json(auth, {
        status: 401,
      });

    }

    // Connect Database

    await connectDB();

    // Find Member

    const member = await Member.findById(auth.memberId);

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

    // Check Card

    if (!member.cardPdf) {

      return NextResponse.json(
        {
          success: false,
          message: "Membership card is not available.",
        },
        {
          status: 404,
        }
      );

    }

    return NextResponse.json({

      success: true,

      memberId: member.memberId,

      cardPdf: member.cardPdf,

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