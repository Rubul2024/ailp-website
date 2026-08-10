"use client";

import Link from "next/link";

import styles from "./MissionCTA.module.css";

export default function MissionCTA() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <span>BE PART OF THE JOURNEY</span>

          <h2>
            Together, We Can
            <br />
            Build a Stronger Future
          </h2>

          <p>
            Meaningful change begins when people
            participate. Join the All India Labour
            Party and contribute to a better future.
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