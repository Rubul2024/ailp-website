"use client";

import Link from "next/link";

import styles from "./MissionHero.module.css";

export default function MissionHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.blurOne}></div>
      <div className={styles.blurTwo}></div>
      <div className={styles.grid}></div>

      <div className={styles.container}>
        <div className={styles.content}>
          <span className={styles.badge}>
            OUR MISSION
          </span>

          <h1>
            Working for
            <br />
            <span>People, Workers & India</span>
          </h1>

          <p>
            Our mission is to work towards employment,
            equality, dignity, social justice and
            meaningful opportunities for every citizen.
          </p>

          <div className={styles.actions}>
            <Link
              href="/join"
              className={styles.primaryButton}
            >
              Join AILP
            </Link>

            <Link
              href="/about"
              className={styles.secondaryButton}
            >
              About AILP
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}