"use client";

/* ==========================================================
   AILP ABOUT HERO
   All India Labour Party
   Modern Public Website
   ========================================================== */

import Image from "next/image";
import Link from "next/link";

import styles from "./AboutHero.module.css";

/* ==========================================================
   Component
========================================================== */

export default function AboutHero() {
  return (
    <section className={styles.hero}>
      {/* ======================================================
          Background Decorations
      ====================================================== */}

      <div
        className={styles.blurBlue}
        aria-hidden="true"
      />

      <div
        className={styles.blurOrange}
        aria-hidden="true"
      />

      <div
        className={styles.gridPattern}
        aria-hidden="true"
      />

      {/* ======================================================
          Main Container
      ====================================================== */}

      <div className={styles.container}>
        {/* ====================================================
            Left — Image
        ==================================================== */}

        <div className={styles.imageColumn}>
          <div className={styles.imageWrapper}>
            <Image
              src="/images/about/about.jpg"
              alt="All India Labour Party"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className={styles.image}
            />

            {/* Image Overlay */}

            <div
              className={styles.imageOverlay}
              aria-hidden="true"
            />

            {/* Floating Badge */}

            <div className={styles.imageBadge}>
              <span className={styles.badgeIcon}>
                🇮🇳
              </span>

              <div>
                <strong>All India Labour Party</strong>

                <span>
                  Working for a stronger India
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ====================================================
            Right — Content
        ==================================================== */}

        <div className={styles.content}>
          {/* Small Badge */}

          <span className={styles.badge}>
            ABOUT AILP
          </span>

          {/* Heading */}

          <h1 className={styles.title}>
            Empowering Workers,
            <br />

            <span>
              Strengthening India
            </span>
          </h1>

          {/* Description */}

          <p className={styles.description}>
            All India Labour Party is committed to
            protecting workers' rights, creating
            employment opportunities, promoting
            social justice, and building an inclusive
            future where every citizen has the
            opportunity to grow with dignity.
          </p>

          <p className={styles.description}>
            We believe that a strong workforce is
            the foundation of a strong nation.
            Through policy, public participation,
            and community engagement, we strive
            to create lasting positive change.
          </p>

          {/* ==================================================
              Action Buttons
          ================================================== */}

          <div className={styles.actions}>
            <Link
              href="/mission"
              className={styles.primaryButton}
            >
              Our Mission
              <span aria-hidden="true">
                →
              </span>
            </Link>

            <Link
              href="/vision"
              className={styles.secondaryButton}
            >
              Our Vision
              <span aria-hidden="true">
                →
              </span>
            </Link>
          </div>

          {/* ==================================================
              Small Trust Indicators
          ================================================== */}

          <div className={styles.highlights}>
            <div className={styles.highlight}>
              <span>✓</span>
              <p>Workers' Rights</p>
            </div>

            <div className={styles.highlight}>
              <span>✓</span>
              <p>Employment</p>
            </div>

            <div className={styles.highlight}>
              <span>✓</span>
              <p>Social Justice</p>
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================
          Bottom Scroll Decoration
      ====================================================== */}

      <div
        className={styles.bottomGlow}
        aria-hidden="true"
      />
    </section>
  );
}