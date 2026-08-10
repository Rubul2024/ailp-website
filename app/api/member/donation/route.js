/* ==========================================================
   Member Donation API
   All India Labour Party
   Production Ready
========================================================== */

import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";

import Member from "@/models/Member";
import Donation from "@/models/Donation";

import verifyMember from "@/utils/verifyMember";

/* ==========================================================
   Create Donation
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
       Read Request
    ========================================== */

    const {
      amount,
      paymentMethod,
      transactionId,
      message,
    } = await request.json();

    /* ==========================================
       Validation
    ========================================== */

    if (!amount || Number(amount) <= 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid donation amount.",
        },
        {
          status: 400,
        }
      );
    }

    if (!paymentMethod) {
      return NextResponse.json(
        {
          success: false,
          message: "Payment method is required.",
        },
        {
          status: 400,
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
       Payment Status
    ========================================== */

    let paymentStatus = "PENDING";

    if (paymentMethod === "ONLINE") {
      paymentStatus = "SUCCESS";
    }

    /* ==========================================
       Create Donation
    ========================================== */

    const donation = await Donation.create({
      member: member._id,

      membershipId: member.membershipId,

      fullName: member.fullName,

      amount: Number(amount),

      paymentMethod,

      paymentStatus,

      transactionId: transactionId || "",

      message: message || "",
    });

    /* ==========================================
       Update Member Summary
    ========================================== */

    if (
      paymentStatus === "SUCCESS" ||
      paymentStatus === "VERIFIED"
    ) {
      member.totalDonation += Number(amount);

      member.donationCount += 1;

      member.lastDonation = new Date();

      if (
        Number(amount) >
        member.highestDonation
      ) {
        member.highestDonation =
          Number(amount);
      }

      await member.save();
    }

    /* ==========================================
       Response
    ========================================== */

    return NextResponse.json(
      {
        success: true,

        message:
          paymentStatus === "SUCCESS"
            ? "Donation successful."
            : "Donation submitted for verification.",

        donation,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "Donation API Error:",
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

/* ==========================================================
   Get Member Donation Summary
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

    const member = await Member.findById(
      auth.memberId
    ).select(
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
    console.error(
      "Donation Summary Error:",
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