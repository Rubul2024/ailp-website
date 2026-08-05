"use client";

/* ==========================================================
   About Section
   Module 3 - Lesson 25A
========================================================== */

import Image from "next/image";
import Link from "next/link";
import styles from "./About.module.css";

export default function About() {
  return (
    <section id="about" className={styles.about}>
      {/* ==========================================
      Background Decorations
  ========================================== */}

      <div className={styles.blurBlue}></div>

      <div className={styles.blurOrange}></div>

      <div className={styles.gridPattern}></div>

      <div className={styles.container}>
        {/* ================= Left Side ================= */}
        <div className={styles.imageWrapper}>
          <Image
            src="/images/about/about.jpg"
            alt="All India Labour Party"
            fill
            className={styles.image}
          />
        </div>

        {/* ================= Right Side ================= */}
        <div className={styles.content}>
          <span className={styles.badge}>ABOUT AILP</span>

          <h2 className={styles.title}>
            Empowering Workers,
            <br />
            Strengthening India
          </h2>

          <p className={styles.description}>
            All India Labour Party is committed to protecting workers' rights,
            creating employment opportunities, promoting social justice, and
            building an inclusive future where every citizen has the opportunity
            to grow with dignity.
          </p>

          <p className={styles.description}>
            We believe that a strong workforce is the foundation of a strong
            nation. Through policy, public participation, and community
            engagement, we strive to create lasting positive change.
          </p>

          <Link href="/about" className={styles.button}>
            Read Our Vision →
          </Link>
        </div>
      </div>
      
    </section>
  );
}

