"use client";


/* ==========================================================
   Join AILP CTA
   Module 9 - Lesson 32A
========================================================== */

import Link from "next/link";
import styles from "./JoinCTA.module.css";
import benefits from "./benefitsData";

export default function JoinCTA() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* ==========================
            Background Shapes
        ========================== */}

        <div className={styles.blurBlue}></div>
        <div className={styles.blurOrange}></div>

        {/* ==========================
            Content
        ========================== */}

        <div className={styles.content}>
          <span className={styles.badge}>JOIN AILP</span>

          <h2>
            Together, We Can Build
            <br />A Stronger India
          </h2>

          <p>
            Become a member of the All India Labour Party and contribute towards
            employment generation, workers' welfare, equality and social
            justice.
          </p>

          {/* ==========================
              Benefits
          ========================== */}

          <div className={styles.benefits}>
            {benefits.map((item) => (
              <div key={item.id} className={styles.benefit}>
                <span className={styles.check}>✓</span>

                {item.title}
              </div>
            ))}
          </div>

          {/* ==========================
              Buttons
          ========================== */}

          <div className={styles.actions}>
            <Link href="/join" className={styles.primaryButton}>
              <>
                Join AILP
                <span className={styles.arrow}>→</span>
              </>
            </Link>

            <Link href="/about" className={styles.secondaryButton}>
              <>
                Learn More
                <span className={styles.arrow}>→</span>
              </>
            </Link>
          </div>
        </div>
      </div>

   
    </section>
  );
}
