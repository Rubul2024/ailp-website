"use client";

import Link from "next/link";

import {
  HeartHandshake,
  ArrowDown,
  ShieldCheck,
} from "lucide-react";

import styles from "./DonateHero.module.css";

export default function DonateHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.glowOne}></div>
      <div className={styles.glowTwo}></div>

      <div className={styles.container}>
        <div className={styles.content}>
          <span className={styles.badge}>
            <HeartHandshake size={16} />
            SUPPORT AILP
          </span>

          <h1>
            Your Support Can
            <span> Help Build Change</span>
          </h1>

          <p>
            Every contribution helps us strengthen our
            grassroots presence, support public engagement,
            and work towards employment, equality and social
            justice.
          </p>

          <div className={styles.actions}>
            <a
              href="#donate-form"
              className={styles.primaryButton}
            >
              Donate Now
              <ArrowDown size={18} />
            </a>

            <Link
              href="/mission"
              className={styles.secondaryButton}
            >
              Our Mission
            </Link>
          </div>

          <div className={styles.trust}>
            <ShieldCheck size={18} />

            <span>
              Secure payment processing and transparent
              donation records.
            </span>
          </div>
        </div>

        <div className={styles.visual}>
          <div className={styles.visualCard}>
            <div className={styles.icon}>
              <HeartHandshake size={32} />
            </div>

            <h3>
              Together,
              <br />
              We Can Make a Difference
            </h3>

            <p>
              Support the movement and help us reach more
              communities across India.
            </p>

            <div className={styles.progress}>
              <span></span>
            </div>

            <div className={styles.progressText}>
              <span>People Powered</span>
              <span>AILP</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}