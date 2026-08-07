/* ==========================================================
   Download Membership Card PDF API
   All India Labour Party
========================================================== */

import { NextResponse } from "next/server";

import { renderToBuffer } from "@react-pdf/renderer";
import React from "react";

import connectDB from "@/lib/mongodb";
import Member from "@/models/Member";
import verifyMember from "@/utils/verifyMember";

import MembershipCardPDF from "@/pdf/MembershipCardPDF";

/* ==========================================================
   GET
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
       Get Member
    ========================================== */

    const member = await Member.findById(auth.memberId).lean();

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
       Generate PDF
    ========================================== */

    const pdfBuffer = await renderToBuffer(
      React.createElement(MembershipCardPDF, {
        member,
      })
    );

    /* ==========================================
       Return PDF
    ========================================== */

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition":
          `attachment; filename=${member.membershipId}-Membership-Card.pdf`,
      },
    });
  } catch (error) {
    console.error("Download Card Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to generate membership card.",
      },
      {
        status: 500,
      }
    );
  }
}