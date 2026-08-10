"use client";

/* ==========================================================
   Profile Completion
========================================================== */

import styles from "./Dashboard.module.css";

export default function ProfileCompletion({
  member,
}) {
  const percentage =
    member.profilePercentage || 0;

  return (
    <section className={styles.progressCard}>
      <h2>
        Profile Completion
      </h2>

      <div className={styles.progressCircle}>
        <svg
          width="140"
          height="140"
        >
          <circle
            cx="70"
            cy="70"
            r="58"
            stroke="#E5E7EB"
            strokeWidth="12"
            fill="none"
          />

          <circle
            cx="70"
            cy="70"
            r="58"
            stroke="#2563EB"
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="364"
            strokeDashoffset={
              364 -
              (364 *
                percentage) /
                100
            }
            transform="rotate(-90 70 70)"
          />
        </svg>

        <div className={styles.percent}>
          <h3>
            {percentage}%
          </h3>

          <span>
            Completed
          </span>
        </div>
      </div>

      <p>
        Complete your profile to
        unlock all member benefits.
      </p>
    </section>
  );
}