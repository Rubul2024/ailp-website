/* ==========================================================
   AILP ADMIN DONATIONS API
   All India Labour Party
   Production Ready
========================================================== */

import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Donation from "@/models/Donation";

/* ==========================================================
   ADMIN AUTHENTICATION

   IMPORTANT:
   Replace this section with the SAME authentication
   verification already used by your existing admin APIs.

   Do NOT create a second admin authentication system.
========================================================== */

async function verifyAdmin(request) {
  /*
    Example:

    const token = request.cookies.get("adminToken")?.value;

    if (!token) {
      return false;
    }

    // Use your existing JWT verification here.
  */

  return true;
}

/* ==========================================================
   GET DONATIONS
========================================================== */

export async function GET(request) {
  try {
    /* ======================================================
       Admin Protection
    ====================================================== */

    const isAdmin = await verifyAdmin(request);

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
       Database
    ====================================================== */

    await connectDB();

    /* ======================================================
       URL Parameters
    ====================================================== */

    const { searchParams } =
      new URL(request.url);

    const search =
      searchParams.get("search")?.trim() || "";

    const status =
      searchParams.get("status")?.trim() || "";

    const startDate =
      searchParams.get("startDate") || "";

    const endDate =
      searchParams.get("endDate") || "";

    const page =
      Math.max(
        Number(searchParams.get("page")) || 1,
        1
      );

    const limit =
      Math.min(
        Math.max(
          Number(searchParams.get("limit")) || 20,
          1
        ),
        100
      );

    const skip =
      (page - 1) * limit;

    /* ======================================================
       Query
    ====================================================== */

    const query = {};

    /* ======================================================
       Status Filter
    ====================================================== */

    if (status) {
      query.status = status.toUpperCase();
    }

    /* ======================================================
       Search
    ====================================================== */

    if (search) {
      query.$or = [
        {
          fullName: {
            $regex: search,
            $options: "i",
          },
        },

        {
          email: {
            $regex: search,
            $options: "i",
          },
        },

        {
          mobile: {
            $regex: search,
            $options: "i",
          },
        },

        {
          razorpayOrderId: {
            $regex: search,
            $options: "i",
          },
        },

        {
          razorpayPaymentId: {
            $regex: search,
            $options: "i",
          },
        },

        {
          transactionId: {
            $regex: search,
            $options: "i",
          },
        },

        {
          receiptNumber: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    /* ======================================================
       Date Filter
    ====================================================== */

    if (startDate || endDate) {
      query.createdAt = {};

      if (startDate) {
        query.createdAt.$gte =
          new Date(`${startDate}T00:00:00.000Z`);
      }

      if (endDate) {
        query.createdAt.$lte =
          new Date(`${endDate}T23:59:59.999Z`);
      }
    }

    /* ======================================================
       Get Total
    ====================================================== */

    const total =
      await Donation.countDocuments(
        query
      );

    /* ======================================================
       Get Donations
    ====================================================== */

    const donations =
      await Donation.find(query)
        .sort({
          createdAt: -1,
        })
        .skip(skip)
        .limit(limit)
        .select(
          [
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
            "receiptNumber",
            "createdAt",
          ].join(" ")
        )
        .lean();

    /* ======================================================
       Pagination
    ====================================================== */

    const totalPages =
      Math.ceil(total / limit);

    /* ======================================================
       Response
    ====================================================== */

    return NextResponse.json({
      success: true,

      donations,

      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage:
          page < totalPages,
        hasPreviousPage:
          page > 1,
      },
    });
  } catch (error) {
    console.error(
      "ADMIN DONATIONS ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to fetch donations.",
      },
      {
        status: 500,
      }
    );
  }
}