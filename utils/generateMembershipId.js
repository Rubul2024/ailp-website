/* ==========================================================
   Generate Membership ID — AILP{year}{6-digit serial}

   Uses the highest existing serial for the year (not a count of
   members), so deleted members never cause a duplicate ID.
   Callers should still retry on a duplicate-key error in case two
   registrations land at the same moment.
========================================================== */

import Member from "@/models/Member";

export default async function generateMembershipId() {
  const prefix = `AILP${new Date().getFullYear()}`;

  const last = await Member.findOne({ membershipId: { $regex: `^${prefix}\\d{6}$` } })
    .sort({ membershipId: -1 })
    .select("membershipId")
    .lean();

  const serial = last ? parseInt(last.membershipId.slice(prefix.length), 10) + 1 : 1;

  return `${prefix}${String(serial).padStart(6, "0")}`;
}
