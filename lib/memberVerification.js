/* ==========================================================
   Public membership verification
   Used by the QR verification page (/verify/[membershipId])
   and its JSON API. Returns ONLY details already printed on
   the front of the ID card — never mobile, date of birth,
   address or email, since anyone can scan a card.
========================================================== */

import connectDB from "@/lib/mongodb";
import Member from "@/models/Member";
import { getPhotoUrl } from "@/lib/memberProfile";

const ID_RE = /^[A-Z0-9-]{4,32}$/;

/** Normalise a membership ID taken from a URL. Returns "" if invalid. */
export function normaliseMembershipId(raw) {
  let value = String(raw ?? "");
  try {
    value = decodeURIComponent(value);
  } catch {
    // keep the raw value
  }
  value = value.trim().toUpperCase();
  return ID_RE.test(value) ? value : "";
}

/**
 * Look up a member for public verification.
 * @returns {Promise<{ status: "invalid" | "not_found" | "inactive" | "registered" | "active", member?: object }>}
 */
export async function verifyMembership(rawId) {
  const membershipId = normaliseMembershipId(rawId);
  if (!membershipId) return { status: "invalid" };

  await connectDB();

  const doc = await Member.findOne({ membershipId })
    .select("fullName membershipId photo district state joinDate createdAt cardGenerated cardGeneratedAt isActive verified verifiedDate")
    .lean();

  if (!doc) return { status: "not_found", membershipId };

  const member = {
    fullName: doc.fullName,
    membershipId: doc.membershipId,
    designation: "Party Member",
    photo: getPhotoUrl(doc.photo) || null,
    district: doc.district || "",
    state: doc.state || "",
    memberSince: doc.joinDate || doc.createdAt || null,
    cardIssuedOn: doc.cardGenerated ? doc.cardGeneratedAt || null : null,
    verifiedByOffice: Boolean(doc.verified),
  };

  if (doc.isActive === false) return { status: "inactive", membershipId, member };
  if (!doc.cardGenerated) return { status: "registered", membershipId, member };
  return { status: "active", membershipId, member };
}
