"use client";

import Link from "next/link";

import styles from "./VisionCTA.module.css";

export default function VisionCTA() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <span>OUR FUTURE IS BUILT TOGETHER</span>

          <h2>
            Be Part of
            <br />
            A Better Tomorrow
          </h2>

          <p>
            The future we envision requires
            participation, responsibility and collective
            action. Join us in building a stronger India.
          </p>

          <Link
            href="/join"
            className={styles.button}
          >
            Join AILP
          </Link>
        </div>
      </div>
    </section>
  );
}