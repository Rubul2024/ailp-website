"use client";

/* ==========================================================
   Member Information
   All India Labour Party
   Production Ready
========================================================== */

import {
  User,
  CreditCard,
  Phone,
  MapPin,
  CalendarDays,
} from "lucide-react";

import styles from "../MembershipCard.module.css";

export default function MemberInformation({
  member,
}) {
  return (
    <div className={styles.information}>
      {/* Name */}

      <div className={styles.infoRow}>
        <User size={18} />

        <div>
          <label>Member Name</label>

          <h3>
            {member?.fullName || "N/A"}
          </h3>
        </div>
      </div>

      {/* Membership ID */}

      <div className={styles.infoRow}>
        <CreditCard size={18} />

        <div>
          <label>Membership ID</label>

          <h3>
            {member?.membershipId ||
              "Pending"}
          </h3>
        </div>
      </div>

      {/* Mobile */}

      <div className={styles.infoRow}>
        <Phone size={18} />

        <div>
          <label>Mobile</label>

          <h3>
            {member?.mobile || "-"}
          </h3>
        </div>
      </div>

      {/* Address */}

      <div className={styles.infoRow}>
        <MapPin size={18} />

        <div>
          <label>District / State</label>

          <h3>
            {member?.district || "-"},{" "}
            {member?.state || "-"}
          </h3>
        </div>
      </div>

      {/* Join Date */}

      <div className={styles.infoRow}>
        <CalendarDays size={18} />

        <div>
          <label>Joining Date</label>

          <h3>
            {member?.joinDate
              ? new Date(
                  member.joinDate
                ).toLocaleDateString(
                  "en-IN"
                )
              : "Pending"}
          </h3>
        </div>
      </div>
    </div>
  );
}