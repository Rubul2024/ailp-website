"use client";

import styles from "./IndiaMap.module.css";

import stats from "./indiaData";
import Image from "next/image";
import Counter from "./Counter";

export default function IndiaMap() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* =========================
            Section Heading
        ========================= */}

        <div className={styles.heading}>
          <span className={styles.badge}>AILP ACROSS INDIA</span>

          <h2>
            Building A Strong Presence
            <br />
            Across Every State
          </h2>

          <p>
            Together we are creating a nationwide movement for workers,
            employment, equality and social justice.
          </p>
        </div>

        {/* =========================
            Content
        ========================= */}

        <div className={styles.content}>
          {/* Left Side */}

          <div className={styles.mapArea}>
            {/* India SVG will come in Lesson 30C */}

            <div className={styles.mapWrapper}>
              <Image
                src="/images/india/india-map.svg"
                alt="AILP Across India"
                width={650}
                height={650}
                className={styles.map}
                priority
              />
              <div className={styles.statusCard}>
                <span className={styles.statusDot}></span>
                Growing Nationwide
              </div>
            </div>
          </div>

          {/* Right Side */}

          <div className={styles.stats}>
            {stats.map((item) => (
              <div key={item.title} className={styles.card}>
                <h3>{item.number}</h3>

                <span>{item.title}</span>
              </div>
            ))}
          </div>


          <div className={styles.buttonWrapper}>
            <a href="/join" className={styles.button}>
              Join Our Movement →
            </a>
          </div>


        </div>
      </div>
    </section>
  );
}
