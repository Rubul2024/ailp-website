"use client";

/* ==========================================================
   Profile Progress Card
   All India Labour Party
   Dynamic Profile Completion
========================================================== */

import { CheckCircle2, CircleAlert, ShieldCheck } from "lucide-react";

import styles from "../ProfileForm.module.css";

export default function ProgressCard({
  percentage = 0,
  completed = 0,
  remaining = 0,
  total = 0,
}) {
  return (
  <section className={styles.progressCard}>

    <div className={styles.progressLeft}>

      <div
        className={styles.progressCircle}
        style={{
          "--progress-angle": `${percentage * 3.6}deg`,
        }}
      >
        <span>{percentage}%</span>
      </div>

      <div className={styles.progressTitle}>
        <span>Profile Completion</span>

        <strong>
          {completed} of {total} completed
        </strong>
      </div>

    </div>


    <div className={styles.progressDetails}>

      <div className={styles.progressTop}>
        <span>Profile Completion</span>

        <strong>{percentage}%</strong>
      </div>

      <div className={styles.progressTrack}>

        <div
          className={styles.progressFill}
          style={{
            "--progress": `${percentage}%`,
          }}
        />

      </div>

      <div className={styles.progressBottom}>

        <span>
          <CheckCircle2 size={15} />

          {completed} completed
        </span>

        <span>
          <CircleAlert size={15} />

          {remaining} remaining
        </span>

      </div>

    </div>


    <div className={styles.progressSecurity}>

      <ShieldCheck size={18} />

      <span>
        Keep your information
        up to date.
      </span>

    </div>

  </section>
);
}
