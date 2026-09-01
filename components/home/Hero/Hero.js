"use client";

/* ==========================================================
   Hero Section
   Lesson 24A
========================================================== */

import Image from "next/image";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      {/* ===============================
        Background Decorations
    =============================== */}

      <div className={styles.blurOne}></div>

      <div className={styles.blurTwo}></div>

      <div className={styles.circleOne}></div>

      <div className={styles.circleTwo}></div>

      {/* ==========================================
          Main Container
      ========================================== */}
      <div className={styles.container}>
        {/* ==========================================
            Left Side Content
        ========================================== */}
        <div className={styles.content}>
          {/* Small Badge */}
          <span className={styles.badge}>🇮🇳 ALL INDIA LABOUR PARTY</span>

          {/* Main Heading */}
          <h1 className={styles.title}>
            Building a Stronger Future
            <br />
            for Every Worker
          </h1>

          {/* Description */}
          <p className={styles.description}>
            Together we work towards employment, equality, social justice and a
            stronger India for every citizen.
          </p>

          {/* ==========================================
    Hero Action Buttons
========================================== */}
          <div className={styles.actions}>
            <a href="/join-membership" className={styles.primaryButton}>
              Join AILP
            </a>

            <a href="/about" className={styles.secondaryButton}>
              Learn More
            </a>
          </div>

          {/* ==========================================
    Hero Statistics
========================================== */}
          <div className={styles.stats}>
            <div className={styles.statCard}>
              <h3>50L+</h3>
              <p>Members</p>
            </div>

            <div className={styles.statCard}>
              <h3>20+</h3>
              <p>States</p>
            </div>

            <div className={styles.statCard}>
              <h3>150+</h3>
              <p>Districts</p>
            </div>
          </div>
        </div>

        {/* ==========================================
            Right Side Image
        ========================================== */}

        {/* ==========================================
    Hero Image Area
========================================== */}

        <div className={styles.imageWrapper}>
          {/* Main Hero Image */}

          <Image
            src="/images/hero/hero.jpg"
            alt="All India Labour Party"
            fill
            priority
            className={styles.image}
          />

          {/* ==========================================
      Floating Card 1
  ========================================== */}

          <div className={styles.cardTop}>
            <span className={styles.cardIcon}>⭐</span>

            <div>
              <h4>50L+ Members</h4>

              <p>Growing across India</p>
            </div>
          </div>

          {/* ==========================================
      Floating Card 2
  ========================================== */}

          <div className={styles.cardBottom}>
            <span className={styles.cardIcon}>✔</span>

            <div>
              <h4>Employment First</h4>

              <p>Building better opportunities</p>
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
