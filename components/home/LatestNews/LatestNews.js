"use client";

/* ==========================================================
   Latest News Section
========================================================== */

import Image from "next/image";
import Link from "next/link";

import styles from "./LatestNews.module.css";
import newsData from "./newsData";

export default function LatestNews() {
  const featured = newsData[0];
  const latest = newsData.slice(1);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* ===========================
            Heading
        =========================== */}

        <div className={styles.heading}>
          <span className={styles.badge}>LATEST NEWS</span>

          <h2>
            Stay Updated With
            <br />
            AILP Activities
          </h2>

          <p>
            Follow the latest announcements, campaigns, meetings and activities
            of the All India Labour Party.
          </p>
        </div>

        {/* ===========================
            Featured News
        =========================== */}

        <div className={styles.featuredCard}>
          <div className={styles.featuredImage}>
            <div className={styles.ribbon}>Featured</div>
            <Image
              src={featured.image}
              alt={featured.title}
              fill
              className={styles.image}
            />
          </div>

          <div className={styles.featuredContent}>
            <span className={styles.category}>{featured.category}</span>

            <span className={styles.date}>{featured.date}</span>

            <h3>{featured.title}</h3>

            <p>{featured.description}</p>

            <Link href="/news" className={styles.readMore}>
              Read More →
            </Link>
          </div>
        </div>

        {/* ===========================
            News Grid
        =========================== */}

        <div className={styles.grid}>
          {latest.map((item) => (
            <div key={item.id} className={styles.card}>
              <div className={styles.cardImage}>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className={styles.image}
                />
              </div>

              <div className={styles.cardContent}>
                <div className={styles.meta}>
                  <span className={styles.category}>{item.category}</span>

                  <span className={styles.date}>📅 {item.date}</span>

                  <span className={styles.readTime}>⏱ {featured.readTime}</span>
                </div>

                <h4>{item.title}</h4>

                <p>{item.description}</p>

                <Link href="/news" className={styles.readMore}>
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* ===========================
            Button
        =========================== */}

        <div className={styles.buttonWrapper}>
          <Link href="/news" className={styles.button}>
            View All News
          </Link>
        </div>
      </div>
    </section>
  );
}
