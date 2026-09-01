/* ==========================================================
   Member Registration API
   All India Labour Party (AILP)
   Production Ready
========================================================== */

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/mongodb";
import Member from "@/models/Member";
import generateMembershipId from "@/utils/generateMembershipId";

export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    /* ==========================================
       1. Connect Database & Drop Bad Index
    ========================================== */
    await connectDB();

    // Auto-fix: Safely drop legacy/conflicting 'memberId_1' index if present
    try {
      const collection = Member.collection;
      const indexes = await collection.indexes();
      const hasBadMemberIdIndex = indexes.some((idx) => idx.name === "memberId_1");
      if (hasBadMemberIdIndex) {
        await collection.dropIndex("memberId_1");
        console.log("Cleaned legacy memberId_1 index successfully.");
      }
    } catch (idxErr) {
      // Ignore if index already dropped or not found
    }

    /* ==========================================
       2. Parse JSON Request
    ========================================== */
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, message: "Invalid JSON format in request." },
        { status: 400 }
      );
    }

    const rawFullName = body.fullName || body.name || "";
    const rawEmail = body.email || "";
    const rawMobile = body.mobile || body.phone || "";
    const password = body.password || "";
    const confirmPassword = body.confirmPassword || password;

    const fullName = String(rawFullName).trim();
    const email = String(rawEmail).trim().toLowerCase();
    const mobile = String(rawMobile).trim().replace(/\s+/g, "");

    /* ==========================================
       3. Validation
    ========================================== */
    if (!fullName || !email || !mobile || !password) {
      return NextResponse.json(
        { success: false, message: "Please fill all required fields." },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { success: false, message: "Passwords do not match." },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, message: "Password must be at least 6 characters." },
        { status: 400 }
      );
    }

    const phoneCleaned = mobile.replace(/^(\+91|91|0)/, "");

    /* ==========================================
       4. Duplicate User Checks
    ========================================== */
    const existingMember = await Member.findOne({
      $or: [
        { email: email },
        { mobile: { $in: [mobile, phoneCleaned, `+91${phoneCleaned}`] } },
      ],
    }).lean();

    if (existingMember) {
      const isEmail = existingMember.email === email;
      return NextResponse.json(
        {
          success: false,
          message: isEmail
            ? "An account with this email already exists."
            : "An account with this mobile number already exists.",
        },
        { status: 409 }
      );
    }

    /* ==========================================
       5. Generate Guaranteed Unique Membership ID
    ========================================== */
    let finalId = null;
    try {
      if (typeof generateMembershipId === "function") {
        finalId = await generateMembershipId();
      }
    } catch (idErr) {
      console.warn("generateMembershipId helper warning:", idErr);
    }

    if (!finalId) {
      const timestamp = Date.now().toString().slice(-6);
      const randomDigits = Math.floor(1000 + Math.random() * 9000);
      finalId = `AILP-${timestamp}${randomDigits}`;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    /* ==========================================
       6. Save New Member Document
    ========================================== */
    const newMember = await Member.create({
      fullName,
      email,
      mobile: phoneCleaned,
      password: hashedPassword,
      membershipId: finalId,
      joinDate: new Date(),
      membershipStatus: "REGISTERED",
      profileCompleted: false,
      profilePercentage: 20,
      isActive: true,
      role: "member",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Registration completed successfully.",
        membershipId: newMember.membershipId,
        id: newMember._id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Member Registration API Error:", error);

    if (error.code === 11000) {
      const keyPattern = error.keyPattern || {};
      if (keyPattern.email) {
        return NextResponse.json(
          { success: false, message: "This email address is already registered." },
          { status: 409 }
        );
      }
      if (keyPattern.mobile) {
        return NextResponse.json(
          { success: false, message: "This mobile number is already registered." },
          { status: 409 }
        );
      }
      return NextResponse.json(
        { success: false, message: "An account with these details already exists." },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Internal Server Error occurred during registration.",
      },
      { status: 500 }
    );
  }
}