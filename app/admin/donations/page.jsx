/* ==========================================================
   AILP ADMIN DONATIONS PAGE
========================================================== */

import AdminDonations from "@/components/admin/donations/AdminDonations";

export const metadata = {
  title: "Donations | AILP Admin",
  description:
    "Manage All India Labour Party donations.",
};

export default function DonationsPage() {
  return <AdminDonations />;
}