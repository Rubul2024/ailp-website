/* ==========================================================
   AILP ADMIN DONATION CSV EXPORT
========================================================== */

import { NextResponse } from "next/server";

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
   CSV ESCAPE
========================================================== */

function escapeCSV(value) {
  if (
    value === null ||
    value === undefined
  ) {
    return "";
  }

  const stringValue =
    String(value);

  return `"${stringValue.replace(
    /"/g,
    '""'
  )}"`;
}

/* ==========================================================
   GET
========================================================== */

export async function GET(request) {
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
          message:
            "Unauthorized access.",
        },
        {
          status: 401,
        }
      );
    }

    /* ======================================================
       Database
    ====================================================== */

    await connectDB();

    /* ======================================================
       URL Parameters
    ====================================================== */

    const { searchParams } =
      new URL(request.url);

    const status =
      searchParams.get("status") || "";

    const startDate =
      searchParams.get("startDate") || "";

    const endDate =
      searchParams.get("endDate") || "";

    /* ======================================================
       Query
    ====================================================== */

    const query = {};

    if (status) {
      query.status =
        status.toUpperCase();
    }

    if (
      startDate ||
      endDate
    ) {
      query.createdAt = {};

      if (startDate) {
        query.createdAt.$gte =
          new Date(
            `${startDate}T00:00:00.000Z`
          );
      }

      if (endDate) {
        query.createdAt.$lte =
          new Date(
            `${endDate}T23:59:59.999Z`
          );
      }
    }

    /* ======================================================
       Fetch Donations
    ====================================================== */

    const donations =
      await Donation.find(query)
        .sort({
          createdAt: -1,
        })
        .select(
          [
            "receiptNumber",
            "fullName",
            "email",
            "mobile",
            "amount",
            "currency",
            "paymentMethod",
            "razorpayOrderId",
            "razorpayPaymentId",
            "transactionId",
            "status",
            "createdAt",
          ].join(" ")
        )
        .lean();

    /* ======================================================
       CSV Header
    ====================================================== */

    const headers = [
      "Receipt",
      "Donor Name",
      "Email",
      "Mobile",
      "Amount",
      "Currency",
      "Payment Method",
      "Razorpay Order ID",
      "Razorpay Payment ID",
      "Transaction ID",
      "Status",
      "Date",
    ];

    /* ======================================================
       CSV Rows
    ====================================================== */

    const rows =
      donations.map(
        (donation) => [
          donation.receiptNumber,

          donation.fullName,

          donation.email,

          donation.mobile,

          donation.amount,

          donation.currency,

          donation.paymentMethod,

          donation.razorpayOrderId,

          donation.razorpayPaymentId,

          donation.transactionId,

          donation.status,

          donation.createdAt
            ? new Date(
                donation.createdAt
              ).toLocaleString("en-IN")
            : "",
        ]
          .map(escapeCSV)
          .join(",")
      );

    /* ======================================================
       CSV Content
    ====================================================== */

    const csv = [
      headers
        .map(escapeCSV)
        .join(","),

      ...rows,
    ].join("\n");

    /* ======================================================
       Response
    ====================================================== */

    return new NextResponse(
      csv,
      {
        status: 200,

        headers: {
          "Content-Type":
            "text/csv; charset=utf-8",

          "Content-Disposition":
            `attachment; filename="ailp-donations-${Date.now()}.csv"`,

          "Cache-Control":
            "no-store",
        },
      }
    );
  } catch (error) {
    console.error(
      "ADMIN DONATION EXPORT ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to export donations.",
      },
      {
        status: 500,
      }
    );
  }
}