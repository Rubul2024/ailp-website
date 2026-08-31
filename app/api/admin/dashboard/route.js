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
      recentMembers,
      recentContacts,
      donationSummary
    ] = await Promise.all([
      Member.countDocuments(),
      Member.countDocuments({ status: "Active" }),
      Contact.countDocuments(),
      Member.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select("memberId fullName email mobile district state status createdAt"),
      Contact.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select("name email subject message createdAt isRead"),
      Donation.find().sort({ createdAt: -1 }).limit(5)
    ]);

    // Compute metrics
    const totalDonations = donationSummary.length;
    const totalRevenue = donationSummary.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);

    return NextResponse.json({
      success: true,
      metrics: {
        totalMembers,
        activeMembers,
        totalContacts,
        totalDonations,
        totalRevenue,
      },
      feeds: {
        recentMembers,
        recentContacts,
        recentDonations: donationSummary,
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