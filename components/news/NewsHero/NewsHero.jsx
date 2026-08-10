/* ==========================================================
   AILP NEWS HERO
========================================================== */

import Link from "next/link";
import { ArrowRight, Newspaper } from "lucide-react";

import styles from "./NewsHero.module.css";

export default function NewsHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.glowOne}></div>
      <div className={styles.glowTwo}></div>

      <div className={styles.container}>
        <div className={styles.content}>
          <span className={styles.badge}>
            <Newspaper size={16} />
            AILP NEWS & UPDATES
          </span>

          <h1>
            Latest News,
            <span> Updates & Stories</span>
          </h1>

          <p>
            Stay informed about the latest activities, initiatives,
            campaigns and developments from the All India Labour Party.
          </p>

          <Link href="#latest-news" className={styles.button}>
            Explore Latest News
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}