/* ==========================================================
   Submit Donation (Manual UPI + Proof Upload)
   All India Labour Party

   Works for both guest donors and logged-in members. If a
   valid memberToken cookie is present, the donation is
   linked to that member automatically.
========================================================== */
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Donation from "@/models/Donation";
import Member from "@/models/Member";
import verifyMember from "@/utils/verifyMember";

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    const {
      donorName,
      email = "",
      phone = "",
      amount,
      utrNumber = "",
      message = "",
      proofImage,
    } = body;

    if (!donorName?.trim()) {
      return NextResponse.json(
        { success: false, message: "Please enter your name." },
        { status: 400 }
      );
    }

    const donationAmount = Number(amount);
    if (!Number.isFinite(donationAmount) || donationAmount < 1) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid donation amount." },
        { status: 400 }
      );
    }

    if (email?.trim() && !isValidEmail(email)) {
      return NextResponse.json(
        { success: false, message: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!proofImage?.url) {
      return NextResponse.json(
        { success: false, message: "Please upload your payment screenshot." },
        { status: 400 }
      );
    }

    // Auto-link to a logged-in member, if any.
    let memberId = null;
    const auth = verifyMember(request);
    if (auth.success) {
      const member = await Member.findById(auth.memberId).select("_id");
      if (member) {
        memberId = member._id;
      }
    }

    const donation = await Donation.create({
      donorName: donorName.trim(),
      email: email?.trim().toLowerCase() || "",
      phone: phone?.trim() || "",
      amount: donationAmount,
      member: memberId,
      proofImage: {
        url: proofImage.url,
        publicId: proofImage.publicId || "",
      },
      utrNumber: utrNumber?.trim() || "",
      message: message?.trim() || "",
      status: "pending",
    });

    return NextResponse.json(
      {
        success: true,
        message:
          "Thank you! Your donation has been received and is pending verification by our team.",
        donation,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Donation Submit Error:", error);
    return NextResponse.json(
      { success: false, message: "Unable to submit donation. Please try again." },
      { status: 500 }
    );
  }
}
