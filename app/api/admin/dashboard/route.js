/* ==========================================================
   Admin Dashboard API
========================================================== */

import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import verifyAdmin from "@/lib/verifyAdmin";
import Member from "@/models/Member";
import Donation from "@/models/Donation";
import Contact from "@/models/Contact";
import Newsletter from "@/models/Newsletter";

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

    // Dashboard Statistics
    const [
      totalMembers,
      totalDonations,
      totalContacts,
      totalNewsletter,
    ] = await Promise.all([
      Member.countDocuments(),
      Donation.countDocuments(),
      Contact.countDocuments(),
      Newsletter.countDocuments(),
    ]);

    // Recent Members
    const recentMembers = await Member.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("fullName email membershipId createdAt");

    // Recent Donations
    const recentDonations = await Donation.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("name amount paymentStatus createdAt");

    // Recent Contacts
    const recentContacts = await Contact.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("name email subject createdAt");

    return NextResponse.json({
      success: true,

      statistics: {
        totalMembers,
        totalDonations,
        totalContacts,
        totalNewsletter,
      },

      recentMembers,
      recentDonations,
      recentContacts,
    });
  } catch (error) {
    console.error("Dashboard API Error:", error);

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