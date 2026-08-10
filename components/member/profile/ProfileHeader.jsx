"use client";

/* ==========================================================
   AILP Member Profile Header
   All India Labour Party
   Production Ready
========================================================== */

import { ShieldCheck } from "lucide-react";

import styles from "../ProfileForm.module.css";

export default function ProfileHeader() {
  return (
    <section className={styles.profileHero}>
      <div className={styles.profileHeroContent}>
        {/* ================================================
            Badge
        ================================================= */}

        <div className={styles.heroBadge}>
          <ShieldCheck size={17} />

          <span>AILP Member Portal</span>
        </div>

        {/* ================================================
            Heading
        ================================================= */}

        <h1 className={styles.heroTitle}>
          Complete Your
          <br />
          Membership Profile
        </h1>

        {/* ================================================
            Description
        ================================================= */}

        <p className={styles.heroDescription}>
          Complete your profile to generate your official
          All India Labour Party Digital Membership Card.
        </p>
      </div>
    </section>
  );
}