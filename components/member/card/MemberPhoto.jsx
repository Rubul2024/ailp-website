"use client";

/* ==========================================================
   Member Photo
   All India Labour Party
   Production Ready
========================================================== */

import Image from "next/image";

import { UserCircle2 } from "lucide-react";

import styles from "../MembershipCard.module.css";

export default function MemberPhoto({
  member,
}) {
  const photo =
    member?.photo?.url ||
    member?.photo ||
    "/images/avatar.png";

  return (
    <div className={styles.photoSection}>
      {/* ==========================================
          Member Photo
      ========================================== */}

      <div className={styles.photoWrapper}>
        {photo ? (
          <Image
            src={photo}
            alt={member?.fullName || "Member"}
            width={130}
            height={130}
            className={styles.memberPhoto}
            priority
          />
        ) : (
          <UserCircle2
            size={110}
            className={styles.defaultPhoto}
          />
        )}

        {/* ==========================================
            Online Indicator
        ========================================== */}

        <span
          className={styles.onlineIndicator}
        ></span>
      </div>

      {/* ==========================================
          Member Name
      ========================================== */}

      <h2 className={styles.memberName}>
        {member?.fullName ||
          "Member Name"}
      </h2>

      {/* ==========================================
          Membership Number
      ========================================== */}

      <p className={styles.memberId}>
        {member?.membershipId ||
          "Membership Pending"}
      </p>
    </div>
  );
}