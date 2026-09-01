/* ==========================================================
   Admin Members Management API
   All India Labour Party (AILP)
   Production Ready
========================================================== */

import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Member from "@/models/Member";

export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const state = searchParams.get("state") || "";
    const status = searchParams.get("status") || "";
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
    const [members, totalFiltered, totalRegistered, activeCount, inactiveCount, distinctStates] =
      await Promise.all([
        Member.find(query)
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit)
          .select("-password")
          .lean(),
        Member.countDocuments(query),
        Member.countDocuments({}),
        Member.countDocuments({ isActive: true }),
        Member.countDocuments({ isActive: false }),
        Member.distinct("state"),
      ]);

    const totalPages = Math.ceil(totalFiltered / limit) || 1;

    // Return structured data matching all standard frontend expectations
    return NextResponse.json(
      {
        success: true,
        data: members,
        members: members, // Fallback key for compatibility
        pagination: {
          total: totalFiltered,
          totalPages,
          currentPage: page,
          limit,
        },
        stats: {
          totalRegistered,
          activeMembers: activeCount,
          inactiveMembers: inactiveCount,
          totalStates: distinctStates.filter(Boolean).length || 1,
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