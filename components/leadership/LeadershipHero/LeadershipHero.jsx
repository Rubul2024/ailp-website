"use client";

/* ==========================================================
   AILP Leadership Hero
   ----------------------------------------------------------
   Public Website
   All India Labour Party
========================================================== */

import { useEffect, useState } from "react";
import styles from "./LeadershipHero.module.css";

const DEFAULT_HERO_IMAGE = "/images/leadership/leadership.jpeg";

export default function LeadershipHero() {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    async function fetchLeadership() {
      try {
        const res = await fetch(`/api/leadership?t=${Date.now()}`, {
          cache: "no-store",
        });
        const data = await res.json();
        if (data.success && data.settings) {
          setSettings(data.settings);
        }
      } catch (err) {
        console.error("Failed to load leadership settings:", err);
      }
    }
    fetchLeadership();
  }, []);

  const heroImage = settings?.heroImage || DEFAULT_HERO_IMAGE;
  const statPresidentCount = settings?.statPresidentCount || "01";
  const statStatesRepresented = settings?.statStatesRepresented || "20+";
  const statDistricts = settings?.statDistricts || "50+";

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
              <strong>{statPresidentCount}</strong>
              <span>National President</span>
            </div>

            <div className={styles.stat}>
              <strong>{statStatesRepresented}</strong>
              <span>States Represented</span>
            </div>

            <div className={styles.stat}>
              <strong>{statDistricts}</strong>
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
            <img
              src={heroImage}
              alt="All India Labour Party Leadership"
              className={styles.image}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
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
