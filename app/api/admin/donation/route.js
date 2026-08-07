/* ==========================================================
   Admin Donation Settings API
========================================================== */

import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import verifyAdmin from "@/lib/verifyAdmin";

import Donation from "@/models/Donation";

/* ==========================================================
   GET Donation Settings
========================================================== */

export async function GET(request) {
  try {
    // Verify Admin
    const auth = verifyAdmin(request);

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

    // Connect Database
    await connectDB();

    // Get Settings
    const donation = await Donation.findOne();

    return NextResponse.json({
      success: true,
      donation,
    });
  } catch (error) {
    console.error("Donation GET Error:", error);

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
   UPDATE Donation Settings
========================================================== */

export async function PUT(request) {
  try {
    // Verify Admin
    const auth = verifyAdmin(request);

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

    // Connect Database
    await connectDB();

    const {
      bankName,
      accountHolder,
      accountNumber,
      ifscCode,
      branch,
      upiId,
      qrCode,
      donationMessage,
      donationEnabled,
    } = await request.json();

    // Basic Validation
    if (!bankName || !accountHolder || !accountNumber) {
      return NextResponse.json(
        {
          success: false,
          message: "Please fill all required bank details.",
        },
        {
          status: 400,
        }
      );
    }

    let donation = await Donation.findOne();

    if (!donation) {
      donation = new Donation();
    }

    donation.bankName = bankName.trim();
    donation.accountHolder = accountHolder.trim();
    donation.accountNumber = accountNumber.trim();
    donation.ifscCode = ifscCode?.trim() || "";
    donation.branch = branch?.trim() || "";
    donation.upiId = upiId?.trim() || "";
    donation.qrCode = qrCode || "";
    donation.donationMessage = donationMessage?.trim() || "";
    donation.donationEnabled = donationEnabled;

    await donation.save();

    return NextResponse.json({
      success: true,
      message: "Donation settings updated successfully.",
      donation,
    });
  } catch (error) {
    console.error("Donation PUT Error:", error);

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