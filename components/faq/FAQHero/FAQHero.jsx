"use client";

import { Search, MessageCircleQuestion } from "lucide-react";

import styles from "./FAQHero.module.css";

export default function FAQHero({ searchValue = "", onSearch }) {
  return (
    <section className={styles.hero}>
      {/* Background Effects */}

      <div className={styles.blurBlue}></div>

      <div className={styles.blurOrange}></div>

      <div className={styles.grid}></div>

      {/* Content */}

      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.icon}>
            <MessageCircleQuestion size={28} />
          </div>

          <span className={styles.badge}>
            HELP & INFORMATION
          </span>

          <h1>
            Frequently Asked
            <strong> Questions</strong>
          </h1>

          <p>
            Find answers to common questions about the
            All India Labour Party, membership, participation,
            donations and our work.
          </p>

          {/* Search */}

          <div className={styles.searchBox}>
            <Search size={21} />

            <input
              type="search"
              value={searchValue}
              onChange={(event) =>
                onSearch?.(event.target.value)
              }
              placeholder="Search your question..."
              aria-label="Search frequently asked questions"
            />
          </div>
        </div>
      </div>
    </section>
  );
}