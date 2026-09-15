/* ==========================================================
   Admin Donations Review API — List
   All India Labour Party
========================================================== */

import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Donation from "@/models/Donation";
import verifyAdmin from "@/lib/verifyAdmin";

export async function GET(request) {
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

    const search = searchParams.get("search")?.trim() || "";
    const status = searchParams.get("status")?.trim().toLowerCase() || "";
    const startDate = searchParams.get("startDate") || "";
    const endDate = searchParams.get("endDate") || "";

    const page = Math.max(Number(searchParams.get("page")) || 1, 1);
    const limit = Math.min(Math.max(Number(searchParams.get("limit")) || 20, 1), 100);
    const skip = (page - 1) * limit;

    const query = {};

    if (status && ["pending", "verified", "rejected"].includes(status)) {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { donorName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
        { utrNumber: { $regex: search, $options: "i" } },
      ];
    }

    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(`${startDate}T00:00:00.000Z`);
      if (endDate) query.createdAt.$lte = new Date(`${endDate}T23:59:59.999Z`);
    }

    const [total, pendingCount, verifiedCount, rejectedCount, donations] = await Promise.all([
      Donation.countDocuments(query),
      Donation.countDocuments({ status: "pending" }),
      Donation.countDocuments({ status: "verified" }),
      Donation.countDocuments({ status: "rejected" }),
      Donation.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("member", "fullName membershipId")
        .lean(),
    ]);

    const totalPages = Math.ceil(total / limit) || 1;

    return NextResponse.json({
      success: true,
      donations,
      stats: {
        pending: pendingCount,
        verified: verifiedCount,
        rejected: rejectedCount,
        total: pendingCount + verifiedCount + rejectedCount,
      },
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    });
  } catch (error) {
    console.error("Admin Donations List Error:", error);
    return NextResponse.json(
      { success: false, message: "Unable to fetch donations." },
      { status: 500 }
    );
  }
}
