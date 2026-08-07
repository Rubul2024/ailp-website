/* ==========================================================
   Admin Newsletter Subscribers API
========================================================== */

import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import verifyAdmin from "@/lib/verifyAdmin";

import Newsletter from "@/models/Newsletter";

/* ==========================================================
   GET Newsletter Subscribers
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

    // URL Parameters
    const { searchParams } = new URL(request.url);

    const search = searchParams.get("search") || "";
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;

    const skip = (page - 1) * limit;

    // Search Filter
    const filter = search
      ? {
          email: {
            $regex: search,
            $options: "i",
          },
        }
      : {};

    // Query Database
    const [subscribers, totalSubscribers] = await Promise.all([
      Newsletter.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),

      Newsletter.countDocuments(filter),
    ]);

    return NextResponse.json({
      success: true,

      currentPage: page,

      totalPages: Math.ceil(totalSubscribers / limit),

      totalSubscribers,

      subscribers,
    });
  } catch (error) {
    console.error("Newsletter API Error:", error);

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