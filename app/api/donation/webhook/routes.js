/* ==========================================================
   Razorpay Donation Webhook
   All India Labour Party
========================================================== */

import crypto from "crypto";

import { NextResponse } from "next/server";

import Donation from "@/models/Donation";

import connectDB from "@/lib/mongodb";

/* ==========================================================
   Verify Webhook Signature
========================================================== */

function verifyWebhookSignature(
  body,
  signature
) {
  const expectedSignature =
    crypto
      .createHmac(
        "sha256",
        process.env.RAZORPAY_WEBHOOK_SECRET
      )
      .update(body)
      .digest("hex");

  const expectedBuffer =
    Buffer.from(
      expectedSignature,
      "utf8"
    );

  const receivedBuffer =
    Buffer.from(
      signature || "",
      "utf8"
    );

  if (
    expectedBuffer.length !==
    receivedBuffer.length
  ) {
    return false;
  }

  return crypto.timingSafeEqual(
    expectedBuffer,
    receivedBuffer
  );
}

/* ==========================================================
   POST
========================================================== */

export async function POST(request) {
  try {
    /* ======================================================
       IMPORTANT:
       Read RAW body
    ====================================================== */

    const rawBody =
      await request.text();

    const signature =
      request.headers.get(
        "x-razorpay-signature"
      );

    /* ======================================================
       Signature Validation
    ====================================================== */

    if (
      !verifyWebhookSignature(
        rawBody,
        signature
      )
    ) {
      console.error(
        "Invalid Razorpay webhook signature."
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid webhook signature.",
        },
        {
          status: 400,
        }
      );
    }

    /* ======================================================
       Parse Payload
    ====================================================== */

    const payload =
      JSON.parse(rawBody);

    const event =
      payload.event;

    /* ======================================================
       Database
    ====================================================== */

    await connectDB();

    /* ======================================================
       Payment Captured
    ====================================================== */

    if (
      event ===
      "payment.captured"
    ) {
      const payment =
        payload.payload
          ?.payment
          ?.entity;

      if (!payment) {
        return NextResponse.json({
          success: true,
        });
      }

      const donation =
        await Donation.findOne({
          razorpayOrderId:
            payment.order_id,
        });

      if (donation) {
        donation.razorpayPaymentId =
          payment.id;

        donation.paymentMethod =
          payment.method || "";

        donation.transactionId =
          payment.acquirer_data
            ?.bank_transaction_id ||
          payment.id;

        donation.bankTransactionId =
          payment.acquirer_data
            ?.bank_transaction_id ||
          "";

        donation.status =
          "CAPTURED";

        donation.webhookProcessed =
          true;

        donation.lastWebhookEvent =
          event;

        await donation.save();
      }
    }

    /* ======================================================
       Order Paid
    ====================================================== */

    if (
      event === "order.paid"
    ) {
      const order =
        payload.payload
          ?.order
          ?.entity;

      const payment =
        payload.payload
          ?.payment
          ?.entity;

      if (order) {
        const donation =
          await Donation.findOne({
            razorpayOrderId:
              order.id,
          });

        if (donation) {
          donation.status =
            "CAPTURED";

          if (payment) {
            donation.razorpayPaymentId =
              payment.id;

            donation.paymentMethod =
              payment.method || "";

            donation.transactionId =
              payment.acquirer_data
                ?.bank_transaction_id ||
              payment.id;
          }

          donation.webhookProcessed =
            true;

          donation.lastWebhookEvent =
            event;

          await donation.save();
        }
      }
    }

    /* ======================================================
       Payment Failed
    ====================================================== */

    if (
      event ===
      "payment.failed"
    ) {
      const payment =
        payload.payload
          ?.payment
          ?.entity;

      if (payment) {
        const donation =
          await Donation.findOne({
            razorpayOrderId:
              payment.order_id,
          });

        if (donation) {
          donation.status =
            "FAILED";

          donation.razorpayPaymentId =
            payment.id || "";

          donation.failureReason =
            payment.error_description ||
            "";

          donation.failureCode =
            payment.error_code ||
            "";

          donation.webhookProcessed =
            true;

          donation.lastWebhookEvent =
            event;

          await donation.save();
        }
      }
    }

    /* ======================================================
       Success Response
    ====================================================== */

    return NextResponse.json({
      success: true,
      received: true,
    });
  } catch (error) {
    console.error(
      "RAZORPAY WEBHOOK ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Webhook processing failed.",
      },
      {
        status: 500,
      }
    );
  }
}