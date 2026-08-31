/* ==========================================================
   Admin Contact Messages API - Search, Filter, Status & Delete
========================================================== */
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import verifyAdmin from "@/lib/verifyAdmin";
import Contact from "@/models/Contact";

export const dynamic = "force-dynamic";

/* ==========================================
   GET Contact Inquiries
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
    const filter = searchParams.get("filter")?.trim() || "ALL"; // ALL | UNREAD | READ
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.max(1, parseInt(searchParams.get("limit") || "10", 10));

    const query = {};

    if (filter === "UNREAD") {
      query.isRead = false;
    } else if (filter === "READ") {
      query.isRead = true;
    }

    if (search) {
      const searchRegex = new RegExp(search, "i");
      query.$or = [
        { name: searchRegex },
        { email: searchRegex },
        { mobile: searchRegex },
        { subject: searchRegex },
        { message: searchRegex },
      ];
    }

    const skip = (page - 1) * limit;

    const [messages, totalCount, unreadCount] = await Promise.all([
      Contact.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Contact.countDocuments(query),
      Contact.countDocuments({ isRead: false }),
    ]);

    return NextResponse.json({
      success: true,
      messages,
      unreadCount,
      pagination: {
        total: totalCount,
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit) || 1,
      },
    });
  } catch (error) {
    console.error("Admin Contact GET Error:", error);
    return NextResponse.json({ success: false, message: "Internal server error." }, { status: 500 });
  }
}

/* ==========================================
   PATCH: Mark as Read / Unread
========================================== */
export async function PATCH(request) {
  try {
    const auth = verifyAdmin(request);
    if (!auth.success) {
      return NextResponse.json({ success: false, message: auth.message }, { status: 401 });
    }

    await connectDB();
    const { id, isRead } = await request.json();

    if (!id) {
      return NextResponse.json({ success: false, message: "Message ID is required." }, { status: 400 });
    }

    const updated = await Contact.findByIdAndUpdate(
      id,
      { $set: { isRead: Boolean(isRead) } },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ success: false, message: "Message not found." }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: `Message marked as ${isRead ? "read" : "unread"}.`,
      contact: updated,
    });
  } catch (error) {
    console.error("Admin Contact PATCH Error:", error);
    return NextResponse.json({ success: false, message: "Internal server error." }, { status: 500 });
  }
}

/* ==========================================
   DELETE: Remove Contact Message
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
      return NextResponse.json({ success: false, message: "Message ID is required." }, { status: 400 });
    }

    const deleted = await Contact.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ success: false, message: "Message not found." }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Message deleted successfully.",
    });
  } catch (error) {
    console.error("Admin Contact DELETE Error:", error);
    return NextResponse.json({ success: false, message: "Internal server error." }, { status: 500 });
  }
}