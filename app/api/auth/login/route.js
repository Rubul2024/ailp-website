/* ==========================================================
   Member Login API
   - Sign in with email OR registered mobile number
   - Locks the account for 15 minutes after 5 failed attempts
   - "Remember me" extends the session from 7 to 30 days
========================================================== */

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import connectDB from "@/lib/mongodb";
import { setMemberSession } from "@/lib/memberSession";
import Member from "@/models/Member";

const MAX_ATTEMPTS = 5;
const LOCK_MINUTES = 15;
const INVALID = "Incorrect email/mobile number or password.";

function fail(message, status) {
  return NextResponse.json({ success: false, message }, { status });
}

/* Build a query that matches the identifier as an email or a mobile
   number in any of the formats members commonly store it in. */
function identifierQuery(identifier) {
  const value = identifier.trim();

  if (value.includes("@")) {
    return { email: value.toLowerCase() };
  }

  const digits = value.replace(/\D/g, "");
  if (digits.length < 10) return null;

  const last10 = digits.slice(-10);
  return {
    mobile: { $in: [value, digits, last10, `+91${last10}`, `91${last10}`, `+91 ${last10}`, `0${last10}`] },
  };
}

export async function POST(request) {
  try {
    let body;
    try {
      body = await request.json();
    } catch {
      return fail("Invalid request.", 400);
    }

    // `email` is kept for backward compatibility with older clients.
    const identifier = String(body.identifier ?? body.email ?? "").slice(0, 120);
    const password = String(body.password ?? "");
    const remember = Boolean(body.remember);

    if (!identifier.trim() || !password) {
      return fail("Please enter your email/mobile number and password.", 400);
    }

    const query = identifierQuery(identifier);
    if (!query) {
      return fail("Enter a valid email address or 10-digit mobile number.", 400);
    }

    await connectDB();

    const member = await Member.findOne(query);

    if (!member) {
      return fail(INVALID, 401);
    }

    if (member.lockUntil && member.lockUntil > new Date()) {
      const minutes = Math.ceil((member.lockUntil - Date.now()) / 60000);
      return fail(
        `Too many failed attempts. Please try again in ${minutes} minute${minutes === 1 ? "" : "s"} or reset your password.`,
        429
      );
    }

    if (!member.isActive) {
      return fail("Your account has been disabled. Please contact the party office.", 403);
    }

    const validPassword = await bcrypt.compare(password, member.password);

    if (!validPassword) {
      const attempts = (member.loginAttempts || 0) + 1;
      const locked = attempts >= MAX_ATTEMPTS;

      await Member.updateOne(
        { _id: member._id },
        locked
          ? { $set: { loginAttempts: 0, lockUntil: new Date(Date.now() + LOCK_MINUTES * 60000) } }
          : { $set: { loginAttempts: attempts } }
      );

      if (locked) {
        return fail(`Too many failed attempts. Your account is locked for ${LOCK_MINUTES} minutes.`, 429);
      }

      const left = MAX_ATTEMPTS - attempts;
      return fail(
        left <= 2 ? `${INVALID} ${left} attempt${left === 1 ? "" : "s"} left before your account is locked.` : INVALID,
        401
      );
    }

    await Member.updateOne(
      { _id: member._id },
      { $set: { lastLogin: new Date(), loginAttempts: 0, lockUntil: null } }
    );

    const response = NextResponse.json({ success: true, message: "Signed in." });
    return setMemberSession(response, member, { remember });
  } catch (error) {
    console.error("Member login error:", error);
    return fail("Something went wrong on our side. Please try again.", 500);
  }
}
