/* ==========================================================
   AILP Member Profile API
   GET  — current member (no password)
   POST — partial update (multipart). Only fields present in
          the request are changed; absent fields are left as-is.
========================================================== */

import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Member from "@/models/Member";
import verifyMember from "@/utils/verifyMember";
import uploadImageToCloudinary from "@/utils/uploadImageToCloudinary";
import { getCardReadiness, GENDER_OPTIONS, BLOOD_GROUP_OPTIONS } from "@/lib/memberProfile";
import {
  CARD_PRINTED_FIELDS,
  ensureMembershipIdentity,
  renderAndStoreCardPdf,
} from "@/lib/memberCard";

const MAX_PHOTO_BYTES = 2 * 1024 * 1024;

/* Text fields a member may update. Legacy fields stay editable
   through the API so older data is never stranded. */
const TEXT_FIELDS = [
  "fullName",
  "mobile",
  "gender",
  "bloodGroup",
  "state",
  "district",
  "assembly",
  "block",
  "village",
  "city",
  "pincode",
  "address",
  "fatherName",
  "motherName",
  "occupation",
  "education",
  "emergencyName",
  "emergencyMobile",
  "relationship",
];

function fail(message, status = 400) {
  return NextResponse.json({ success: false, message }, { status });
}

/* ==========================================================
   GET PROFILE
========================================================== */

export async function GET(request) {
  try {
    const auth = verifyMember(request);
    if (!auth.success) return fail(auth.message, 401);

    await connectDB();

    const member = await Member.findById(auth.memberId).select("-password");
    if (!member) return fail("Member not found.", 404);

    return NextResponse.json({ success: true, member });
  } catch (error) {
    console.error("GET Profile Error:", error);
    return fail("Internal Server Error", 500);
  }
}

/* ==========================================================
   POST / UPDATE PROFILE
========================================================== */

export async function POST(request) {
  try {
    const auth = verifyMember(request);
    if (!auth.success) return fail(auth.message, 401);

    await connectDB();

    const formData = await request.formData();
    const member = await Member.findById(auth.memberId);
    if (!member) return fail("Member not found.", 404);

    /* ---------- Text fields (partial update) ---------- */

    const updates = {};
    for (const key of TEXT_FIELDS) {
      const raw = formData.get(key);
      if (raw === null || typeof raw !== "string") continue;
      updates[key] = raw.trim().slice(0, 300);
    }

    if ("fullName" in updates && updates.fullName.length < 2) {
      return fail("Please enter your full name.");
    }

    if ("mobile" in updates) {
      const digits = updates.mobile.replace(/\D/g, "");
      if (digits.length < 10 || digits.length > 13) {
        return fail("Please enter a valid mobile number.");
      }
    }

    if ("gender" in updates && updates.gender && !GENDER_OPTIONS.includes(updates.gender)) {
      return fail("Please choose a valid gender.");
    }

    if ("bloodGroup" in updates && updates.bloodGroup && !BLOOD_GROUP_OPTIONS.includes(updates.bloodGroup)) {
      return fail("Please choose a valid blood group.");
    }

    if ("pincode" in updates && updates.pincode && !/^\d{6}$/.test(updates.pincode)) {
      return fail("Pincode must be 6 digits.");
    }

    Object.assign(member, updates);

    /* ---------- Date of birth ---------- */

    const dobRaw = formData.get("dateOfBirth");
    if (typeof dobRaw === "string") {
      if (!dobRaw.trim()) {
        member.dateOfBirth = null;
      } else {
        const dob = new Date(dobRaw);
        const age = (Date.now() - dob.getTime()) / (365.25 * 24 * 3600 * 1000);
        if (Number.isNaN(dob.getTime()) || age < 15 || age > 120) {
          return fail("Please enter a valid date of birth (age 15 or above).");
        }
        member.dateOfBirth = dob;
      }
    }

    /* ---------- Photo ---------- */

    const photo = formData.get("photo");
    if (photo && typeof photo === "object" && photo.size > 0) {
      if (!photo.type?.startsWith("image/")) return fail("Profile photo must be an image.");
      if (photo.size > MAX_PHOTO_BYTES) return fail("Profile photo must be smaller than 2 MB.");

      const uploaded = await uploadImageToCloudinary(
        Buffer.from(await photo.arrayBuffer()),
        "ailp/members/photos",
        member.membershipId || member._id.toString()
      );
      if (!uploaded?.url) throw new Error("Photo upload failed. Please try again.");

      member.photo = uploaded;
    }

    /* ---------- Membership identity & status ---------- */

    const readiness = getCardReadiness(member);
    member.profileCompleted = readiness.ready;
    member.profilePercentage = readiness.percent;

    let membershipCreated = false;
    if (readiness.ready && !member.membershipId) {
      await ensureMembershipIdentity(member);
      membershipCreated = true;
    }

    if (readiness.ready && member.membershipStatus === "REGISTERED") {
      member.membershipStatus = "PROFILE_COMPLETED";
    }

    const cardNeedsRefresh =
      member.cardGenerated && CARD_PRINTED_FIELDS.some((f) => member.isModified(f));

    await member.save();

    /* ---------- Refresh the stored card PDF (best effort) ----------
       Downloads are always rendered live, so a failure here never
       blocks the profile save. */
    if (cardNeedsRefresh) {
      try {
        await renderAndStoreCardPdf(member);
        await member.save();
      } catch (pdfError) {
        console.error("Card PDF refresh failed:", pdfError);
      }
    }

    const fresh = member.toObject();
    delete fresh.password;

    return NextResponse.json({
      success: true,
      message: membershipCreated
        ? `Profile complete. Your membership ID is ${member.membershipId}.`
        : "Profile saved.",
      membershipId: member.membershipId || null,
      member: fresh,
    });
  } catch (error) {
    if (error?.code === 11000 && error?.keyPattern?.mobile) {
      return fail("This mobile number is already registered to another member.", 409);
    }
    if (error?.name === "ValidationError") {
      return fail(Object.values(error.errors)[0]?.message || "Please check your details.");
    }

    console.error("POST Profile Error:", error);
    return fail(error.message || "Unable to save your profile. Please try again.", 500);
  }
}
