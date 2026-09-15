/* ==========================================================
   Admin Donations Review API — Detail / Approve / Reject
   All India Labour Party
========================================================== */

import { NextResponse } from "next/server";
import mongoose from "mongoose";

import connectDB from "@/lib/mongodb";
import Donation from "@/models/Donation";
import Member from "@/models/Member";
import verifyAdmin from "@/lib/verifyAdmin";

export async function GET(request, { params }) {
  try {
    const auth = verifyAdmin(request);
    if (!auth.success) {
      return NextResponse.json(
        { success: false, message: auth.message },
        { status: 401 }
      );
    }

    await connectDB();

    const { id } = await params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid donation id." },
        { status: 400 }
      );
    }

    const donation = await Donation.findById(id)
      .populate("member", "fullName membershipId email mobile")
      .lean();

    if (!donation) {
      return NextResponse.json(
        { success: false, message: "Donation not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, donation });
  } catch (error) {
    console.error("Admin Donation Detail Error:", error);
    return NextResponse.json(
      { success: false, message: "Unable to fetch donation." },
      { status: 500 }
    );
  }
}

export async function PATCH(request, { params }) {
  try {
    const auth = verifyAdmin(request);
    if (!auth.success) {
      return NextResponse.json(
        { success: false, message: auth.message },
        { status: 401 }
      );
    }

    await connectDB();

    const { id } = await params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid donation id." },
        { status: 400 }
      );
    }

    const { action, rejectionReason = "" } = await request.json();

    if (!["approve", "reject"].includes(action)) {
      return NextResponse.json(
        { success: false, message: "Invalid action." },
        { status: 400 }
      );
    }

    const donation = await Donation.findById(id);
    if (!donation) {
      return NextResponse.json(
        { success: false, message: "Donation not found." },
        { status: 404 }
      );
    }

    if (donation.status !== "pending") {
      return NextResponse.json(
        { success: false, message: `This donation has already been ${donation.status}.` },
        { status: 409 }
      );
    }

    if (action === "approve") {
      donation.status = "verified";
      donation.verifiedBy = auth.admin.adminId;
      donation.verifiedAt = new Date();
      await donation.save();

      if (donation.member) {
        const member = await Member.findById(donation.member);
        if (member) {
          member.totalDonation = (member.totalDonation || 0) + donation.amount;
          member.donationCount = (member.donationCount || 0) + 1;
          member.lastDonation = new Date();
          member.highestDonation = Math.max(member.highestDonation || 0, donation.amount);
          await member.save();
        }
      }
    } else {
      donation.status = "rejected";
      donation.verifiedBy = auth.admin.adminId;
      donation.verifiedAt = new Date();
      donation.rejectionReason = rejectionReason?.trim() || "";
      await donation.save();
    }

    return NextResponse.json({
      success: true,
      message: action === "approve" ? "Donation approved." : "Donation rejected.",
      donation,
    });
  } catch (error) {
    console.error("Admin Donation Review Error:", error);
    return NextResponse.json(
      { success: false, message: "Unable to update donation." },
      { status: 500 }
    );
  }
}
