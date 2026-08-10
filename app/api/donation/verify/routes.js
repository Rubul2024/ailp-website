/* ==========================================================
   Verify Razorpay Donation
   All India Labour Party
========================================================== */

import { NextResponse } from "next/server";

import crypto from "crypto";

import razorpay from "@/lib/razorpay";

import Donation from "@/models/Donation";

import connectDB from "@/lib/mongodb";

/* ==========================================================
   POST
========================================================== */

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = body;

    /* ======================================================
       Required Fields
    ====================================================== */

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Payment verification information is incomplete.",
        },
        {
          status: 400,
        }
      );
    }

    /* ======================================================
       Find Donation
    ====================================================== */

    const donation =
      await Donation.findOne({
        razorpayOrderId:
          razorpay_order_id,
      });

    if (!donation) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Donation record not found.",
        },
        {
          status: 404,
        }
      );
    }

    /* ======================================================
       Idempotency
    ====================================================== */

    if (
      donation.status === "CAPTURED" &&
      donation.razorpayPaymentId ===
        razorpay_payment_id
    ) {
      return NextResponse.json({
        success: true,

        message:
          "Payment has already been verified.",

        donation: {
          id: donation._id,
          receipt:
            donation.receiptNumber,
          status: donation.status,
        },
      });
    }

    /* ======================================================
       Signature Generation
    ====================================================== */

    const generatedSignature =
      crypto
        .createHmac(
          "sha256",
          process.env.RAZORPAY_KEY_SECRET
        )
        .update(
          `${razorpay_order_id}|${razorpay_payment_id}`
        )
        .digest("hex");

    /* ======================================================
       Timing-Safe Signature Comparison
    ====================================================== */

    const expectedBuffer =
      Buffer.from(
        generatedSignature,
        "utf8"
      );

    const receivedBuffer =
      Buffer.from(
        razorpay_signature,
        "utf8"
      );

    if (
      expectedBuffer.length !==
      receivedBuffer.length
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid payment signature.",
        },
        {
          status: 400,
        }
      );
    }

    const signatureValid =
      crypto.timingSafeEqual(
        expectedBuffer,
        receivedBuffer
      );

    if (!signatureValid) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Payment signature verification failed.",
        },
        {
          status: 400,
        }
      );
    }

    /* ======================================================
       Fetch Payment From Razorpay
    ====================================================== */

    const payment =
      await razorpay.payments.fetch(
        razorpay_payment_id
      );

    /* ======================================================
       Verify Order Match
    ====================================================== */

    if (
      payment.order_id !==
      razorpay_order_id
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Payment order mismatch.",
        },
        {
          status: 400,
        }
      );
    }

    /* ======================================================
       Verify Amount
    ====================================================== */

    const expectedAmount =
      Math.round(
        donation.amount * 100
      );

    if (
      payment.amount !==
      expectedAmount
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Payment amount mismatch.",
        },
        {
          status: 400,
        }
      );
    }

    /* ======================================================
       Payment Status
    ====================================================== */

    if (
      payment.status !==
        "captured" &&
      payment.status !==
        "authorized"
    ) {
      await Donation.findByIdAndUpdate(
        donation._id,
        {
          status: "FAILED",

          failureReason:
            payment.error_description ||
            "Payment was not captured.",

          failureCode:
            payment.error_code || "",
        }
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Payment was not captured.",
        },
        {
          status: 400,
        }
      );
    }

    /* ======================================================
       Determine Final Status
    ====================================================== */

    const finalStatus =
      payment.status === "captured"
        ? "CAPTURED"
        : "AUTHORIZED";

    /* ======================================================
       Transaction ID
    ====================================================== */

    const transactionId =
      payment.acquirer_data
        ?.bank_transaction_id ||
      razorpay_payment_id;

    /* ======================================================
       Update Donation
    ====================================================== */

    donation.razorpayPaymentId =
      razorpay_payment_id;

    donation.razorpaySignature =
      razorpay_signature;

    donation.paymentMethod =
      payment.method || "";

    donation.transactionId =
      transactionId;

    donation.bankTransactionId =
      payment.acquirer_data
        ?.bank_transaction_id || "";

    donation.status =
      finalStatus;

    await donation.save();

    /* ======================================================
       Response
    ====================================================== */

    return NextResponse.json({
      success: true,

      message:
        "Donation payment verified successfully.",

      donation: {
        id: donation._id.toString(),

        receipt:
          donation.receiptNumber,

        amount:
          donation.amount,

        currency:
          donation.currency,

        paymentId:
          donation.razorpayPaymentId,

        transactionId:
          donation.transactionId,

        status:
          donation.status,
      },
    });
  } catch (error) {
    console.error(
      "DONATION VERIFY ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Payment verification failed.",
      },
      {
        status: 500,
      }
    );
  }
}