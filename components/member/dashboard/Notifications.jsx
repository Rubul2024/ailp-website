"use client";

/* ==========================================================
   Member Notifications
========================================================== */

import {
  Bell,
  CheckCircle2,
} from "lucide-react";

import styles from "./Dashboard.module.css";

export default function Notifications({
  member,
}) {
  const notifications = [
    member.profileCompleted
      ? "Your profile has been completed successfully."
      : "Please complete your profile.",

    member.cardGenerated
      ? "Your Membership Card is available."
      : "Generate your Membership Card.",

    "Welcome to the All India Labour Party.",
  ];

  return (
    <section className={styles.panel}>
      <div className={styles.panelHeader}>
        <Bell size={22} />

        <h2>Notifications</h2>
      </div>

      {notifications.map((item, index) => (
        <div
          key={index}
          className={styles.notification}
        >
          <CheckCircle2 size={18} />

          <p>{item}</p>
        </div>
      ))}
    </section>
  );
}