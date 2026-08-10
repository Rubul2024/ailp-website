/* ==========================================================
   Create Donation Order
   All India Labour Party
========================================================== */

import { NextResponse } from "next/server";

import crypto from "crypto";

import razorpay from "@/lib/razorpay";

import Donation from "@/models/Donation";

import connectDB from "@/lib/mongodb";

/* ==========================================================
   Email Validation
========================================================== */

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* ==========================================================
   Mobile Validation
========================================================== */

function isValidMobile(mobile) {
  return /^[0-9+\-\s()]{7,20}$/.test(mobile);
}

/* ==========================================================
   POST
========================================================== */

export async function POST(request) {
  try {
    /* ======================================================
       Database
    ====================================================== */

    await connectDB();

    /* ======================================================
       Request Body
    ====================================================== */

    const body = await request.json();

    const {
      amount,
      fullName,
      email,
      mobile,
      address = "",
      pan = "",
    } = body;

    /* ======================================================
       Basic Validation
    ====================================================== */

    if (!amount) {
      return NextResponse.json(
        {
          success: false,
          message: "Donation amount is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (!fullName?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Full name is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (!email?.trim() || !isValidEmail(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide a valid email address.",
        },
        {
          status: 400,
        }
      );
    }

    if (!mobile?.trim() || !isValidMobile(mobile)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide a valid mobile number.",
        },
        {
          status: 400,
        }
      );
    }

    /* ======================================================
       Amount Validation
    ====================================================== */

    const donationAmount = Number(amount);

    if (
      !Number.isFinite(donationAmount) ||
      donationAmount < 1
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid donation amount.",
        },
        {
          status: 400,
        }
      );
    }

    /*
      Razorpay expects amount in the smallest currency unit.

      INR 100 = 10000 paise.
    */

    const amountInPaise = Math.round(
      donationAmount * 100
    );

    /* ======================================================
       Receipt
    ====================================================== */

    const randomId = crypto
      .randomBytes(6)
      .toString("hex");

    const receipt = `AILP_${Date.now()}_${randomId}`;

    /* ======================================================
       Razorpay Order
    ====================================================== */

    const order = await razorpay.orders.create({
      amount: amountInPaise,

      currency: "INR",

      receipt,

      notes: {
        organization:
          "All India Labour Party",

        donor_email:
          email.trim().toLowerCase(),

        donor_mobile:
          mobile.trim(),
      },
    });

    /* ======================================================
       Save Pending Donation
    ====================================================== */

    const donation = await Donation.create({
      fullName: fullName.trim(),

      email: email.trim().toLowerCase(),

      mobile: mobile.trim(),

      address: address?.trim() || "",

      pan: pan?.trim().toUpperCase() || "",

      amount: donationAmount,

      currency: "INR",

      paymentProvider: "razorpay",

      razorpayOrderId: order.id,

      status: "PENDING",

      receiptNumber: receipt,

      source: "ONLINE",
    });

    /* ======================================================
       Response
    ====================================================== */

    return NextResponse.json({
      success: true,

      message: "Donation order created successfully.",

      order: {
        id: order.id,

        amount: order.amount,

        currency: order.currency,

        receipt: order.receipt,

        key: process.env
          .NEXT_PUBLIC_RAZORPAY_KEY_ID,

        donationId: donation._id.toString(),
      },
    });
  } catch (error) {
    console.error(
      "CREATE DONATION ORDER ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to create donation order.",
      },
      {
        status: 500,
      }
    );
  }
}