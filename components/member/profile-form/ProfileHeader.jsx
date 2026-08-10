"use client";

/* ==========================================================
   Profile Header
========================================================== */

import styles from "./Profile.module.css";

export default function ProfileHeader({
  profileCompletion = 86,
}) {
  return (
    <section className={styles.hero}>

      <div className={styles.heroContent}>

        <div>

          <span className={styles.badge}>
            Membership Profile
          </span>

          <h1>
            Complete Your
           
            Membership Profile
          </h1>

          <p>
            Complete your profile to generate
            your official Membership Card and
            access all member benefits.
          </p>

        </div>

        <div className={styles.progressCard}>

          <div className={styles.circle}>
            {profileCompletion}%
          </div>

          <div className={styles.progressInfo}>

            <strong>
              Profile Completion
            </strong>

            <span>
              Almost finished
            </span>

          </div>

        </div>

      </div>

    </section>
  );
}