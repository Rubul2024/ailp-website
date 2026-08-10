"use client";

/* ==========================================================
   Verification Badge
   All India Labour Party
   Production Ready
========================================================== */

import {
  ShieldCheck,
  ShieldAlert,
  ShieldX,
  BadgeCheck,
} from "lucide-react";

import styles from "../MembershipCard.module.css";

export default function VerificationBadge({
  member,
}) {
  /* ==========================================================
     Badge Information
  ========================================================== */

  let icon = <ShieldAlert size={18} />;

  let title = "Profile Pending";

  let className = styles.pendingBadge;

  /* ==========================================================
     Verified
  ========================================================== */

  if (
    member?.verified &&
    member?.membershipStatus === "VERIFIED"
  ) {
    icon = <ShieldCheck size={18} />;

    title = "Verified Member";

    className = styles.verifiedBadge;
  }

  /* ==========================================================
     Card Generated
  ========================================================== */

  else if (
    member?.cardGenerated
  ) {
    icon = <BadgeCheck size={18} />;

    title = "Card Generated";

    className =
      styles.generatedBadge;
  }

  /* ==========================================================
     Inactive
  ========================================================== */

  else if (
    member?.isActive === false
  ) {
    icon = <ShieldX size={18} />;

    title = "Inactive Member";

    className = styles.inactiveBadge;
  }

  return (
    <div className={className}>
      {icon}

      <span>{title}</span>
    </div>
  );
}