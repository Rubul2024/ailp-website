"use client";

/* ==========================================================
   AILP Leadership CTA
========================================================== */

import Link from "next/link";
import styles from "./LeadershipCTA.module.css";

export default function LeadershipCTA() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <span>BE PART OF THE JOURNEY</span>

          <h2>
            Together, We Can
            <br />
            Build a Stronger India
          </h2>

          <p>
            Join the All India Labour Party and become part of a growing
            movement working for employment, equality and social justice.
          </p>
        </div>

        <div className={styles.actions}>
          
          <Link href="/join-membership" className={styles.primary}>
            Join AILP
          </Link>

          <Link href="/contact" className={styles.secondary}>
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
