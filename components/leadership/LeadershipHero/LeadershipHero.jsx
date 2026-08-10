"use client";

/* ==========================================================
   AILP Leadership Hero
   ----------------------------------------------------------
   Public Website
   All India Labour Party
========================================================== */

import Image from "next/image";
import styles from "./LeadershipHero.module.css";

export default function LeadershipHero() {
  return (
    <section className={styles.hero}>
      {/* ==========================================
          Background Effects
      ========================================== */}

      <div className={styles.blurBlue}></div>
      <div className={styles.blurOrange}></div>
      <div className={styles.gridPattern}></div>

      {/* ==========================================
          Main Content
      ========================================== */}

      <div className={styles.container}>
        {/* ========================================
            Left Content
        ======================================== */}

        <div className={styles.content}>
          <span className={styles.badge}>
            OUR LEADERSHIP
          </span>

          <h1 className={styles.title}>
            Leadership with
            <br />
            <span>Purpose & Responsibility</span>
          </h1>

          <p className={styles.description}>
            Meet the leaders working to strengthen the
            All India Labour Party and advance our
            commitment to employment, equality,
            workers' rights and social justice.
          </p>

          <div className={styles.stats}>
            <div className={styles.stat}>
              <strong>01</strong>
              <span>National President</span>
            </div>

            <div className={styles.stat}>
              <strong>20+</strong>
              <span>States Represented</span>
            </div>

            <div className={styles.stat}>
              <strong>50+</strong>
              <span>Districts</span>
            </div>
          </div>
        </div>

        {/* ========================================
            Right Image
        ======================================== */}

        <div className={styles.imageWrapper}>
          <div className={styles.imageGlow}></div>

          <div className={styles.imageCard}>
            <Image
              src="/images/leadership/leadership.jpg"
              alt="All India Labour Party Leadership"
              fill
              priority
              className={styles.image}
            />

            <div className={styles.imageOverlay}>
              <span>ALL INDIA LABOUR PARTY</span>
              <strong>Leadership</strong>
            </div>
          </div>

          <div className={styles.floatingCard}>
            <span className={styles.floatingIcon}>🇮🇳</span>

            <div>
              <strong>Serving India</strong>
              <span>With commitment and integrity</span>
            </div>
          </div>
        </div>
      </div>

      {/* ==========================================
          Scroll Indicator
      ========================================== */}

      <div className={styles.scrollIndicator}>
        <span></span>
      </div>
    </section>
  );
}