"use client";

/* ==========================================================
   Recent Activity
========================================================== */

import {
  Clock3,
  CheckCircle2,
} from "lucide-react";

import styles from "./Dashboard.module.css";

export default function RecentActivity({
  member,
}) {
  return (
    <section className={styles.activity}>
      <h2>Recent Activity</h2>

      <div className={styles.activityItem}>
        <CheckCircle2 size={18} />

        <div>
          <strong>
            Member Registration
          </strong>

          <p>
            Successfully joined All
            India Labour Party.
          </p>
        </div>
      </div>

      <div className={styles.activityItem}>
        <Clock3 size={18} />

        <div>
          <strong>
            Last Login
          </strong>

          <p>
            {member.lastLogin
              ? new Date(
                  member.lastLogin
                ).toLocaleString(
                  "en-IN"
                )
              : "First Login"}
          </p>
        </div>
      </div>
    </section>
  );
}