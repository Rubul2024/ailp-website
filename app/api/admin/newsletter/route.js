/* ==========================================================
   Admin Newsletter Subscribers API
========================================================== */

import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import verifyAdmin from "@/lib/verifyAdmin";

import Newsletter from "@/models/Newsletter";

export const dynamic = "force-dynamic";

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
    const status = searchParams.get("status") || "ALL";
    const isExport = searchParams.get("export") === "true";
    const page = Math.max(1, Number(searchParams.get("page")) || 1);
    const limit = Math.max(1, Number(searchParams.get("limit")) || 10);

    const skip = (page - 1) * limit;

    // Search Filter
    const filter = {};

    if (search.trim()) {
      filter.email = {
        $regex: search.trim(),
        $options: "i",
      };
    }

    if (status && status !== "ALL") {
      filter.status = status;
    }

    // Query Database
    const query = Newsletter.find(filter).sort({ createdAt: -1 });

    if (!isExport) {
      query.skip(skip).limit(limit);
    }

    const [subscribers, totalSubscribers, activeCount] = await Promise.all([
      query,
      Newsletter.countDocuments(filter),
      Newsletter.countDocuments({ status: "Active" }),
    ]);

    return NextResponse.json({
      success: true,

      subscribers,
      activeCount,

      pagination: {
        page,
        limit,
        total: totalSubscribers,
        totalPages: Math.ceil(totalSubscribers / limit) || 1,
      },
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

/* ==========================================================
   PATCH — Toggle Subscriber Status
========================================================== */

export async function PATCH(request) {
  try {
    const auth = verifyAdmin(request);

    if (!auth.success) {
      return NextResponse.json(
        { success: false, message: auth.message },
        { status: 401 }
      );
    }

    await connectDB();

    const { id, status } = await request.json();

    if (!id || !["Active", "Unsubscribed"].includes(status)) {
      return NextResponse.json(
        { success: false, message: "A valid subscriber id and status are required." },
        { status: 400 }
      );
    }

    const updated = await Newsletter.findByIdAndUpdate(
      id,
      { $set: { status } },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Subscriber not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Subscriber marked as ${status}.`,
      subscriber: updated,
    });
  } catch (error) {
    console.error("Newsletter PATCH Error:", error);

    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

/* ==========================================================
   DELETE — Remove Subscriber
========================================================== */

export async function DELETE(request) {
  try {
    const auth = verifyAdmin(request);

    if (!auth.success) {
      return NextResponse.json(
        { success: false, message: auth.message },
        { status: 401 }
      );
    }

    await connectDB();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Subscriber id is required." },
        { status: 400 }
      );
    }

    const deleted = await Newsletter.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, message: "Subscriber not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Subscriber deleted successfully.",
    });
  } catch (error) {
    console.error("Newsletter DELETE Error:", error);

    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
