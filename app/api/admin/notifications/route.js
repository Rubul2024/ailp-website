/* ==========================================================
   Admin Notifications API
   Real pending-action counts for the header notification bell
========================================================== */
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import verifyAdmin from "@/lib/verifyAdmin";
import Member from "@/models/Member";
import Contact from "@/models/Contact";
import Donation from "@/models/Donation";

export async function GET(request) {
  try {
    const auth = verifyAdmin(request);
    if (!auth.success) {
      return NextResponse.json({ success: false, message: auth.message }, { status: 401 });
    }

    await connectDB();

    const [unreadContacts, pendingDonations, unverifiedMembers, latestContacts] = await Promise.all([
      Contact.countDocuments({ isRead: false }),
      Donation.countDocuments({ status: "pending" }),
      Member.countDocuments({ verified: false }),
      Contact.find({ isRead: false })
        .sort({ createdAt: -1 })
        .limit(5)
        .select("name subject createdAt"),
    ]);

    const items = [];

    if (unreadContacts > 0) {
      items.push({
        type: "contact",
        label: `${unreadContacts} unread citizen ${unreadContacts === 1 ? "message" : "messages"}`,
        href: "/admin/contacts",
        count: unreadContacts,
      });
    }

    if (pendingDonations > 0) {
      items.push({
        type: "donation",
        label: `${pendingDonations} donation ${pendingDonations === 1 ? "proof" : "proofs"} awaiting verification`,
        href: "/admin/donations",
        count: pendingDonations,
      });
    }

    if (unverifiedMembers > 0) {
      items.push({
        type: "member",
        label: `${unverifiedMembers} ${unverifiedMembers === 1 ? "member" : "members"} awaiting verification`,
        href: "/admin/members",
        count: unverifiedMembers,
      });
    }

    return NextResponse.json({
      success: true,
      total: unreadContacts + pendingDonations + unverifiedMembers,
      items,
      latestContacts,
    });
  } catch (error) {
    console.error("Admin Notifications Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to load notifications." },
      { status: 500 }
    );
  }
}
