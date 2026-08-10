"use client";

import Link from "next/link";

import styles from "./VisionHero.module.css";

export default function VisionHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.orbOne}></div>

      <div className={styles.orbTwo}></div>

      <div className={styles.container}>
        <div className={styles.content}>
          <span className={styles.badge}>
            OUR VISION
          </span>

          <h1>
            A Better India
            <br />
            <span>For Every Citizen</span>
          </h1>

          <p>
            We envision an India where every person
            has the opportunity to work, grow, live
            with dignity and contribute to the nation's
            progress.
          </p>

          <Link
            href="/join"
            className={styles.button}
          >
            Be Part of the Vision
          </Link>
        </div>
      </div>
    </section>
  );
}