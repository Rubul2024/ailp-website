/* ==========================================================
   Member Registration API
   - Validates name, Indian mobile, email and password
   - Rejects duplicates (email, or mobile in any stored format)
   - Assigns a membership ID and signs the member in
========================================================== */

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import connectDB from "@/lib/mongodb";
import { setMemberSession } from "@/lib/memberSession";
import Member from "@/models/Member";
import generateMembershipId from "@/utils/generateMembershipId";

export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const NAME_RE = /^[\p{L} .'-]+$/u;

function fail(message, status = 400, field) {
  return NextResponse.json({ success: false, message, ...(field ? { field } : {}) }, { status });
}

export async function POST(request) {
  try {
    let body;
    try {
      body = await request.json();
    } catch {
      return fail("Invalid request.");
    }

    // Bot trap: real users never fill the hidden "website" field.
    if (body.website) {
      return fail("We couldn't create your account. Please try again.");
    }

    const fullName = String(body.fullName ?? body.name ?? "").trim().replace(/\s+/g, " ").slice(0, 100);
    const email = String(body.email ?? "").trim().toLowerCase().slice(0, 120);
    const digits = String(body.mobile ?? body.phone ?? "").replace(/\D/g, "");
    const mobile = digits.length > 10 ? digits.slice(-10) : digits;
    const password = String(body.password ?? "");
    const confirmPassword = body.confirmPassword === undefined ? password : String(body.confirmPassword);

    /* ---------- Validation ---------- */

    if (fullName.length < 2) return fail("Enter your full name.", 400, "fullName");
    if (!NAME_RE.test(fullName)) return fail("Use letters only in your name.", 400, "fullName");
    if (!/^[6-9]\d{9}$/.test(mobile)) return fail("Enter a valid 10-digit Indian mobile number.", 400, "mobile");
    if (!EMAIL_RE.test(email)) return fail("Enter a valid email address.", 400, "email");
    if (password.length < 8 || password.length > 128) return fail("Password must be 8 to 128 characters.", 400, "password");
    if (!/[A-Za-z]/.test(password) || !/\d/.test(password)) {
      return fail("Include at least one letter and one number in your password.", 400, "password");
    }
    if (password !== confirmPassword) return fail("Passwords don't match.", 400, "confirmPassword");
    if (body.acceptTerms === false) return fail("Please accept the terms to continue.", 400, "acceptTerms");

    await connectDB();

    /* ---------- Duplicates ---------- */

    const existing = await Member.findOne({
      $or: [{ email }, { mobile: { $in: [mobile, `+91${mobile}`, `91${mobile}`, `+91 ${mobile}`, `0${mobile}`] } }],
    })
      .select("email")
      .lean();

    if (existing) {
      return existing.email === email
        ? fail("An account with this email already exists. Try signing in instead.", 409, "email")
        : fail("An account with this mobile number already exists. Try signing in instead.", 409, "mobile");
    }

    /* ---------- Create (retry if two sign-ups grab the same ID) ---------- */

    const hashedPassword = await bcrypt.hash(password, 12);
    let member = null;

    for (let attempt = 0; attempt < 3 && !member; attempt++) {
      try {
        member = await Member.create({
          fullName,
          email,
          mobile,
          password: hashedPassword,
          membershipId: await generateMembershipId(),
          joinDate: new Date(),
          membershipStatus: "REGISTERED",
          profileCompleted: false,
          profilePercentage: 0,
          isActive: true,
          role: "member",
        });
      } catch (error) {
        if (error?.code === 11000 && error.keyPattern?.membershipId && attempt < 2) continue;
        throw error;
      }
    }

    const response = NextResponse.json(
      {
        success: true,
        message: "Account created.",
        membershipId: member.membershipId,
      },
      { status: 201 }
    );

    return setMemberSession(response, member);
  } catch (error) {
    if (error?.code === 11000) {
      if (error.keyPattern?.email) return fail("An account with this email already exists.", 409, "email");
      if (error.keyPattern?.mobile) return fail("An account with this mobile number already exists.", 409, "mobile");
    }

    console.error("Member registration error:", error);
    return fail("We couldn't create your account right now. Please try again in a moment.", 500);
  }
}
