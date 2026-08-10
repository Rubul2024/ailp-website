/* ==========================================================
   Donation Payment Failed
========================================================== */

import { NextResponse } from "next/server";

import Donation from "@/models/Donation";

import connectDB from "@/lib/mongodb";

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    const {
      razorpay_order_id,
      razorpay_payment_id,
      error,
    } = body;

    if (!razorpay_order_id) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Order ID is required.",
        },
        {
          status: 400,
        }
      );
    }

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
            "Donation not found.",
        },
        {
          status: 404,
        }
      );
    }

    donation.status = "FAILED";

    donation.razorpayPaymentId =
      razorpay_payment_id || "";

    donation.failureReason =
      error?.description ||
      "Payment failed.";

    donation.failureCode =
      error?.code || "";

    await donation.save();

    return NextResponse.json({
      success: true,
      message:
        "Donation failure recorded.",
    });
  } catch (error) {
    console.error(
      "DONATION FAILURE ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to record payment failure.",
      },
      {
        status: 500,
      }
    );
  }
}