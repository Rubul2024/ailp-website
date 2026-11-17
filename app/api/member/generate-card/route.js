/* ==========================================================
   Generate Membership ID Card
   Validates the profile has everything the card prints,
   assigns the membership ID + QR if needed, and stores the PDF.
   Safe to call again to refresh an existing card.
========================================================== */

import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Member from "@/models/Member";
import verifyMember from "@/utils/verifyMember";
import { getCardReadiness } from "@/lib/memberProfile";
import { ensureMembershipIdentity, renderAndStoreCardPdf } from "@/lib/memberCard";

export async function POST(request) {
  try {
    const auth = verifyMember(request);
    if (!auth.success) {
      return NextResponse.json({ success: false, message: auth.message }, { status: 401 });
    }

    await connectDB();

    const member = await Member.findById(auth.memberId);
    if (!member) {
      return NextResponse.json({ success: false, message: "Member not found." }, { status: 404 });
    }

    const readiness = getCardReadiness(member);
    if (!readiness.ready) {
      return NextResponse.json(
        {
          success: false,
          message: `Please complete your profile first: ${readiness.missing.map((m) => m.label).join(", ")}.`,
          missing: readiness.missing,
        },
        { status: 400 }
      );
    }

    await ensureMembershipIdentity(member);
    await renderAndStoreCardPdf(member);

    member.cardGenerated = true;
    member.cardGeneratedAt = new Date();
    member.profileCompleted = true;
    if (member.membershipStatus === "REGISTERED" || member.membershipStatus === "PROFILE_COMPLETED") {
      member.membershipStatus = "CARD_GENERATED";
    }

    await member.save();

    const fresh = member.toObject();
    delete fresh.password;

    return NextResponse.json({
      success: true,
      message: "Your ID card is ready.",
      member: fresh,
    });
  } catch (error) {
    console.error("Generate Card Error:", error);
    return NextResponse.json(
      { success: false, message: "Unable to generate your ID card right now. Please try again." },
      { status: 500 }
    );
  }
}
