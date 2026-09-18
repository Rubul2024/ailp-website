/* ==========================================================
   Admin Members Management API
   All India Labour Party (AILP)
   Production Ready
========================================================== */

import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import verifyAdmin from "@/lib/verifyAdmin";
import Member from "@/models/Member";

export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    const auth = verifyAdmin(request);
    if (!auth.success) {
      return NextResponse.json({ success: false, message: auth.message }, { status: 401 });
    }

    await connectDB();

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const state = searchParams.get("state") || "";
    const status = searchParams.get("status") || "";
    const isExport = searchParams.get("export") === "true";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const skip = (page - 1) * limit;

    // Build filter query
    const query = {};

    // Search by Name, Email, Mobile, or Membership ID
    if (search.trim()) {
      query.$or = [
        { fullName: { $regex: search.trim(), $options: "i" } },
        { email: { $regex: search.trim(), $options: "i" } },
        { mobile: { $regex: search.trim(), $options: "i" } },
        { membershipId: { $regex: search.trim(), $options: "i" } },
        { memberId: { $regex: search.trim(), $options: "i" } },
      ];
    }

    // State filter (only if selected)
    if (state && state !== "All States" && state !== "ALL") {
      query.state = { $regex: `^${state.trim()}$`, $options: "i" };
    }

    // Status filter
    if (status && status !== "All Statuses" && status !== "ALL") {
      if (status.toUpperCase() === "ACTIVE") {
        query.isActive = true;
      } else if (status.toUpperCase() === "INACTIVE") {
        query.isActive = false;
      } else {
        query.membershipStatus = status.toUpperCase();
      }
    }

    // Fetch members with pagination
    const membersQuery = Member.find(query)
      .sort({ createdAt: -1 })
      .select("-password")
      .lean();

    if (!isExport) {
      membersQuery.skip(skip).limit(limit);
    }

    const [members, totalFiltered, totalRegistered, activeCount, inactiveCount, distinctStates] =
      await Promise.all([
        membersQuery,
        Member.countDocuments(query),
        Member.countDocuments({}),
        Member.countDocuments({ isActive: true }),
        Member.countDocuments({ isActive: false }),
        Member.distinct("state"),
      ]);

    const totalPages = Math.ceil(totalFiltered / limit) || 1;
    const availableStates = distinctStates.filter(Boolean).sort();

    // Return structured data matching all standard frontend expectations
    return NextResponse.json(
      {
        success: true,
        data: members,
        members: members, // Fallback key for compatibility
        pagination: {
          total: totalFiltered,
          totalPages,
          page,
          limit,
        },
        availableStates,
        stats: {
          totalRegistered,
          activeMembers: activeCount,
          inactiveMembers: inactiveCount,
          totalStates: availableStates.length || 1,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Admin Members API Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to fetch members list.",
      },
      { status: 500 }
    );
  }
}

/* ==========================================================
   PATCH — Toggle Member Active Status
========================================================== */
export async function PATCH(request) {
  try {
    const auth = verifyAdmin(request);
    if (!auth.success) {
      return NextResponse.json({ success: false, message: auth.message }, { status: 401 });
    }

    await connectDB();

    const { id, isActive } = await request.json();

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Member ID is required." },
        { status: 400 }
      );
    }

    const updated = await Member.findByIdAndUpdate(
      id,
      { $set: { isActive: Boolean(isActive) } },
      { new: true }
    ).select("-password");

    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Member not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Member ${isActive ? "activated" : "deactivated"} successfully.`,
      member: updated,
    });
  } catch (error) {
    console.error("Admin Members PATCH Error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to update member status." },
      { status: 500 }
    );
  }
}