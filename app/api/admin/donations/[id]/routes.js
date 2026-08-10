/* ==========================================================
   AILP ADMIN
   SINGLE DONATION API
========================================================== */

import { NextResponse } from "next/server";

import mongoose from "mongoose";

import connectDB from "@/lib/mongodb";
import Donation from "@/models/Donation";

/* ==========================================================
   ADMIN AUTHENTICATION
========================================================== */

async function verifyAdmin(request) {
  /*
    Replace with your existing admin authentication.
  */

  return true;
}

/* ==========================================================
   GET SINGLE DONATION
========================================================== */

export async function GET(
  request,
  { params }
) {
  try {
    /* ======================================================
       Admin Protection
    ====================================================== */

    const isAdmin =
      await verifyAdmin(request);

    if (!isAdmin) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized access.",
        },
        {
          status: 401,
        }
      );
    }

    /* ======================================================
       Validate ID
    ====================================================== */

    const { id } = await params;

    if (
      !mongoose.Types.ObjectId.isValid(id)
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid donation ID.",
        },
        {
          status: 400,
        }
      );
    }

    /* ======================================================
       Database
    ====================================================== */

    await connectDB();

    /* ======================================================
       Find Donation
    ====================================================== */

    const donation =
      await Donation.findById(id)
        .select(
          "-razorpaySignature"
        )
        .lean();

    if (!donation) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Donation not found.",
        },
        {
          status: 404,
        }
      );
    }

    /* ======================================================
       Response
    ====================================================== */

    return NextResponse.json({
      success: true,
      donation,
    });
  } catch (error) {
    console.error(
      "ADMIN SINGLE DONATION ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to fetch donation.",
      },
      {
        status: 500,
      }
    );
  }
}