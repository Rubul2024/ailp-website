"use client";

/* ==========================================================
   Dashboard Statistics
   All India Labour Party
========================================================== */

import {
  UserCheck,
  BadgeCheck,
  CreditCard,
  IndianRupee,
} from "lucide-react";

import styles from "./Dashboard.module.css";

export default function DashboardStats({
  member,
}) {
  const stats = [
    {
      title: "Profile",

      value: member.profileCompleted
        ? "Completed"
        : "Pending",

      icon: UserCheck,

      className: styles.blue,
    },

    {
      title: "Status",

      value:
        member.membershipStatus ||
        "REGISTERED",

      icon: BadgeCheck,

      className: styles.green,
    },

    {
      title: "Membership ID",

      value:
        member.membershipId ||
        "Pending",

      icon: CreditCard,

      className: styles.orange,
    },

    {
      title: "Donation",

      value: `₹${member.totalDonation || 0}`,

      icon: IndianRupee,

      className: styles.purple,
    },
  ];

  return (
    <section className={styles.statsGrid}>
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className={styles.statCard}
          >
            <div
              className={`${styles.icon} ${item.className}`}
            >
              <Icon size={26} />
            </div>

            <div>
              <h3>{item.title}</h3>

              <p>{item.value}</p>
            </div>
          </div>
        );
      })}
    </section>
  );
}