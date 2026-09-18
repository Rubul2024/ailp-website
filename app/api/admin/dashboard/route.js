/* ==========================================================
   Admin Comprehensive Dashboard Feed API
========================================================== */
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import verifyAdmin from "@/lib/verifyAdmin";
import Member from "@/models/Member";
import Contact from "@/models/Contact";
import Donation from "@/models/Donation";

export async function GET(request) {
  try {
    const auth = verifyAdmin(request);
    if (!auth.success) {
      return NextResponse.json({ success: false, message: auth.message }, { status: 401 });
    }

    await connectDB();

    // Parallel aggregate count retrieval for high performance
    const [
      totalMembers,
      activeMembers,
      totalContacts,
      unreadContacts,
      recentMembers,
      recentContacts,
      totalDonations,
      pendingDonations,
      revenueAgg,
    ] = await Promise.all([
      Member.countDocuments(),
      Member.countDocuments({ verified: true }),
      Contact.countDocuments(),
      Contact.countDocuments({ isRead: false }),
      Member.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select("memberId membershipId fullName email mobile district state isActive verified createdAt"),
      Contact.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select("name email subject message createdAt isRead"),
      Donation.countDocuments({ status: "verified" }),
      Donation.countDocuments({ status: "pending" }),
      Donation.aggregate([
        { $match: { status: "verified" } },
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ]),
    ]);

    // Compute metrics
    const totalRevenue = revenueAgg[0]?.total || 0;

    return NextResponse.json({
      success: true,
      metrics: {
        totalMembers,
        activeMembers,
        totalContacts,
        unreadContacts,
        totalDonations,
        pendingDonations,
        totalRevenue,
      },
      feeds: {
        recentMembers,
        recentContacts,
      },
      serverTime: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Dashboard Aggregation Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch dashboard metrics." },
      { status: 500 }
    );
  }
}