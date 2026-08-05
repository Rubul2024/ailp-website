"use client";
import Image from "next/image";

/* ==========================================================
   AILP Footer
   Module 10 - Lesson 33B
========================================================== */

import Link from "next/link";
import styles from "./Footer.module.css";

import { quickLinks, resources, contact } from "./footerData";

import SocialLinks from "./SocialLinks";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      {/* ==========================================
          Top Footer
      ========================================== */}

      <div className={styles.container}>
        {/* ==========================================
            Column 1
        ========================================== */}

        <div className={styles.column}>
          <Link href="/" className={styles.logo}>
            <Image
              src="/images/logo/logo.png"
              alt="All India Labour Party"
              width={180}
              height={60}
              priority
            />
          </Link>

          <p className={styles.description}>
            Working for workers, employment, equality and social justice.
            Together we are building a stronger and more inclusive India.
          </p>
        </div>

        {/* ==========================================
            Column 2
        ========================================== */}

        <div className={styles.column}>
          <h3>Quick Links</h3>

          <ul>
            {quickLinks.map((item) => (
              <li key={item.title}>
                <Link href={item.href}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ==========================================
            Column 3
        ========================================== */}

        <div className={styles.column}>
          <h3>Resources</h3>

          <ul>
            {resources.map((item) => (
              <li key={item.title}>
                <Link href={item.href}>{item.title}</Link>
              </li>
            ))}
          </ul>

          <Link href="/donate" className={styles.donateButton}>
            Donate Now
          </Link>
        </div>

        {/* ==========================================
            Column 4
        ========================================== */}

        <div className={styles.column}>
          <h3>Contact</h3>

          <ul className={styles.contactList}>
            <li>📍 Your Office Address</li>

            <li>
              📞
              <a href="tel:+911234567890">+91 12345 67890</a>
            </li>

            <li>
              ✉<a href="mailto:info@ailp.org">info@ailp.org</a>
            </li>

            <li>
              🕒 Mon - Sat
              <br />
              9:00 AM – 6:00 PM
            </li>
          </ul>
        </div>
      </div>

      {/* ==========================================
          Social Media
      ========================================== */}

      <div className={styles.socialWrapper}>
        <SocialLinks />
      </div>

      {/* ==========================================
          Bottom Footer
      ========================================== */}

      <div className={styles.bottom}>
        <p>
          © {new Date().getFullYear()} All India Labour Party. All Rights
          Reserved.
        </p>

        <div className={styles.bottomLinks}>
          <Link href="/privacy-policy">Privacy Policy</Link>

          <Link href="/terms">Terms & Conditions </Link>

          <Link href="/disclaimer">Disclaimer</Link>

          <Link href="/sitemap">Sitemap</Link>
        </div>
      </div>
      <button
        className={styles.scrollTop}
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          })
        }
        aria-label="Back to Top"
      >
        ↑
      </button>
    </footer>
  );
}
