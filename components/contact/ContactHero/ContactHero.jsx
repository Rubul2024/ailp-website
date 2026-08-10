"use client";

/* ==========================================================
   AILP Contact Hero
   All India Labour Party
========================================================== */

import styles from "./ContactHero.module.css";

export default function ContactHero() {
  return (
    <section className={styles.hero}>
      {/* Background Effects */}

      <div className={styles.blurBlue}></div>
      <div className={styles.blurOrange}></div>
      <div className={styles.gridPattern}></div>

      <div className={styles.container}>
        <span className={styles.badge}>
          CONTACT AILP
        </span>

        <h1>
          We’re Here to
          <br />
          <span>Listen & Connect</span>
        </h1>

        <p>
          Have a question, suggestion, concern or want to
          know more about the All India Labour Party?
          Get in touch with us. We would be happy to hear
          from you.
        </p>
      </div>
    </section>
  );
}