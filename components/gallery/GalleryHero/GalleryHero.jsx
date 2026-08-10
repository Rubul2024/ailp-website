/* ==========================================================
   AILP GALLERY HERO
========================================================== */

import { Images, ArrowDown } from "lucide-react";

import styles from "./GalleryHero.module.css";

export default function GalleryHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.glowOne}></div>

      <div className={styles.glowTwo}></div>

      <div className={styles.container}>
        <div className={styles.content}>
          <span className={styles.badge}>
            <Images size={16} />
            AILP GALLERY
          </span>

          <h1>
            Moments That
            <span> Inspire Change</span>
          </h1>

          <p>
            Explore moments, events, campaigns and activities
            from the journey of the All India Labour Party.
          </p>

          <a
            href="#gallery"
            className={styles.button}
          >
            Explore Gallery
            <ArrowDown size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}