"use client";

/* ==========================================================
   AILP Legal Page Component
   Shared component for:
   - Privacy Policy
   - Terms & Conditions
   - Disclaimer
========================================================== */

import Link from "next/link";

import styles from "./LegalPage.module.css";

export default function LegalPage({
  badge,
  title,
  description,
  lastUpdated,
  sections = [],
}) {
  return (
    <main className={styles.page}>
      {/* ==================================================
          Hero Section
      ================================================== */}

      <section className={styles.hero}>
        <div className={styles.heroGlowOne}></div>

        <div className={styles.heroGlowTwo}></div>

        <div className={styles.container}>
          <span className={styles.badge}>{badge}</span>

          <h1>{title}</h1>

          <p>{description}</p>

          {lastUpdated && (
            <div className={styles.updated}>
              Last Updated: {lastUpdated}
            </div>
          )}
        </div>
      </section>

      {/* ==================================================
          Main Content
      ================================================== */}

      <section className={styles.contentSection}>
        <div className={styles.contentContainer}>
          <article className={styles.contentCard}>
            {sections.map((section, index) => (
              <section
                key={section.title}
                className={styles.section}
              >
                <h2>
                  <span>
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {section.title}
                </h2>

                {/* Paragraphs */}

                {section.paragraphs?.map(
                  (paragraph, paragraphIndex) => (
                    <p key={paragraphIndex}>
                      {paragraph}
                    </p>
                  )
                )}

                {/* List */}

                {section.list && (
                  <ul>
                    {section.list.map((item, itemIndex) => (
                      <li key={itemIndex}>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            {/* ==================================================
                Contact CTA
            ================================================== */}

            <div className={styles.contactBox}>
              <div>
                <span>Need Help?</span>

                <h3>
                  Have questions about our policies?
                </h3>

                <p>
                  Contact the All India Labour Party team
                  for clarification or additional
                  information.
                </p>
              </div>

              <Link
                href="/contact"
                className={styles.contactButton}
              >
                Contact Us
              </Link>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}