/* ==========================================================
   Admin Newsletter API - Server-side Filter, Export, Status & Delete
========================================================== */
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import verifyAdmin from "@/lib/verifyAdmin";
import Newsletter from "@/models/Newsletter";

export const dynamic = "force-dynamic";

/* ==========================================
   GET Subscribers
========================================== */
export async function GET(request) {
  try {
    const auth = verifyAdmin(request);
    if (!auth.success) {
      return NextResponse.json({ success: false, message: auth.message }, { status: 401 });
    }

    await connectDB();

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search")?.trim() || "";
    const status = searchParams.get("status")?.trim() || "ALL";
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.max(1, parseInt(searchParams.get("limit") || "10", 10));
    const exportCsv = searchParams.get("export") === "true";

    const query = {};

    if (status && status !== "ALL") {
      query.status = status;
    }

    if (search) {
      query.email = new RegExp(search, "i");
    }

    if (exportCsv) {
      const allSubscribers = await Newsletter.find(query)
        .sort({ createdAt: -1 })
        .select("email status source createdAt");

      return NextResponse.json({
        success: true,
        subscribers: allSubscribers,
      });
    }

    const skip = (page - 1) * limit;

    const [subscribers, totalCount, activeCount] = await Promise.all([
      Newsletter.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Newsletter.countDocuments(query),
      Newsletter.countDocuments({ status: "Active" }),
    ]);

    return NextResponse.json({
      success: true,
      subscribers,
      activeCount,
      pagination: {
        total: totalCount,
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit) || 1,
      },
    });
  } catch (error) {
    console.error("Admin Newsletter GET Error:", error);
    return NextResponse.json({ success: false, message: "Internal server error." }, { status: 500 });
  }
}

/* ==========================================
   PATCH: Update Subscription Status
========================================== */
export async function PATCH(request) {
  try {
    const auth = verifyAdmin(request);
    if (!auth.success) {
      return NextResponse.json({ success: false, message: auth.message }, { status: 401 });
    }

    await connectDB();
    const { id, status } = await request.json();

    if (!id || !["Active", "Unsubscribed"].includes(status)) {
      return NextResponse.json({ success: false, message: "Invalid parameters." }, { status: 400 });
    }

    const updated = await Newsletter.findByIdAndUpdate(
      id,
      { $set: { status } },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ success: false, message: "Subscriber not found." }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: `Subscriber status set to ${status}.`,
      subscriber: updated,
    });
  } catch (error) {
    console.error("Admin Newsletter PATCH Error:", error);
    return NextResponse.json({ success: false, message: "Internal server error." }, { status: 500 });
  }
}

/* ==========================================
   DELETE: Remove Subscriber
========================================== */
export async function DELETE(request) {
  try {
    const auth = verifyAdmin(request);
    if (!auth.success) {
      return NextResponse.json({ success: false, message: auth.message }, { status: 401 });
    }

    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, message: "Subscriber ID is required." }, { status: 400 });
    }

    const deleted = await Newsletter.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ success: false, message: "Subscriber not found." }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Subscriber removed successfully.",
    });
  } catch (error) {
    console.error("Admin Newsletter DELETE Error:", error);
    return NextResponse.json({ success: false, message: "Internal server error." }, { status: 500 });
  }
}