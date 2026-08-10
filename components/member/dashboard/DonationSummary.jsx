"use client";

/* ==========================================================
   Donation Summary
========================================================== */

import {
  IndianRupee,
  HeartHandshake,
} from "lucide-react";

import styles from "./Dashboard.module.css";

export default function DonationSummary({
  member,
}) {
  return (
    <section className={styles.panel}>
      <div className={styles.panelHeader}>
        <HeartHandshake size={22} />

        <h2>Donation Summary</h2>
      </div>

      <div className={styles.summaryGrid}>
        <div className={styles.summaryCard}>
          <IndianRupee size={24} />

          <h3>
            ₹
            {member.totalDonation || 0}
          </h3>

          <span>Total Donation</span>
        </div>

        <div className={styles.summaryCard}>
          <IndianRupee size={24} />

          <h3>
            ₹
            {member.highestDonation || 0}
          </h3>

          <span>Highest Donation</span>
        </div>

        <div className={styles.summaryCard}>
          <HeartHandshake size={24} />

          <h3>
            {member.donationCount || 0}
          </h3>

          <span>Total Donations</span>
        </div>
      </div>
    </section>
  );
}