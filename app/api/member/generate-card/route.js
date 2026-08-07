/* ==========================================================
   Generate Membership Card
   All India Labour Party
========================================================== */

import React from "react";
import { NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";

import connectDB from "@/lib/mongodb";
import Member from "@/models/Member";
import verifyMember from "@/utils/verifyMember";

import generateQRCode from "@/utils/generateQRCode";
import uploadImageToCloudinary from "@/utils/uploadImageToCloudinary";
import uploadPdfToCloudinary from "@/utils/uploadPdfToCloudinary";

import MembershipCardPDF from "@/pdf/MembershipCardPDF";

/* ==========================================================
   POST
========================================================== */

export async function POST(request) {
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

    /* ==========================================
       Already Generated
    ========================================== */

    if (
      member.cardGenerated &&
      member.cardUrl &&
      member.qrCode
    ) {
      return NextResponse.json({
        success: true,
        message: "Membership card already generated.",
        cardUrl: member.cardUrl,
        qrCode: member.qrCode,
      });
    }

    /* ==========================================
       Generate QR Code
    ========================================== */

    const qrResult = await generateQRCode(
      member.membershipId
    );

    if (!qrResult.success) {
      throw new Error(qrResult.message);
    }

    /* ==========================================
       Upload QR To Cloudinary
    ========================================== */

    const qrUrl =
      await uploadImageToCloudinary(
        qrResult.qrCode,
        "ailp/qrcodes",
        member.membershipId
      );

    /* ==========================================
       Update Member Object
       (used by PDF component)
    ========================================== */

    member.qrCode = qrUrl;

    /* ==========================================
       Generate PDF Buffer
    ========================================== */

    const pdfBuffer =
      await renderToBuffer(
        React.createElement(
          MembershipCardPDF,
          {
            member,
          }
        )
      );

    /* ==========================================
       Upload PDF
    ========================================== */

    const pdfUrl =
      await uploadPdfToCloudinary(
        pdfBuffer,
        member.membershipId
      );

    /* ==========================================
       Save Member
    ========================================== */

    member.qrCode = qrUrl;

    member.cardUrl = pdfUrl;

    member.cardGenerated = true;

    member.cardGeneratedAt =
      new Date();

    if (
      member.membershipStatus ===
      "REGISTERED"
    ) {
      member.membershipStatus =
        "CARD_GENERATED";
    }

    await member.save();

    /* ==========================================
       Response
    ========================================== */

    return NextResponse.json({
      success: true,
      message:
        "Membership card generated successfully.",

      cardUrl: pdfUrl,

      qrCode: qrUrl,
    });
  } catch (error) {
    console.error(
      "Generate Card Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to generate membership card.",
      },
      {
        status: 500,
      }
    );
  }
}