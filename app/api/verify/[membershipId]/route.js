/* ==========================================================
   Verify Member API (public)
   GET /api/verify/:membershipId
========================================================== */

import { NextResponse } from "next/server";

import { verifyMembership } from "@/lib/memberVerification";

export const dynamic = "force-dynamic";

const MESSAGES = {
  invalid: "That is not a valid membership ID.",
  not_found: "No member found with this membership ID.",
  inactive: "This membership is not active.",
  registered: "Registered member. ID card not issued yet.",
  active: "Verified member of the All India Labour Party.",
};

export async function GET(request, { params }) {
  try {
    const { membershipId } = await params;
    const result = await verifyMembership(membershipId);

    const status = result.status === "invalid" ? 400 : result.status === "not_found" ? 404 : 200;

    return NextResponse.json(
      {
        success: result.status === "active" || result.status === "registered",
        status: result.status,
        message: MESSAGES[result.status],
        member: result.member || null,
      },
      { status, headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex" } }
    );
  } catch (error) {
    console.error("Verify Member Error:", error);
    return NextResponse.json(
      { success: false, status: "error", message: "Verification is temporarily unavailable. Please try again." },
      { status: 500 }
    );
  }
}
