"use client";

/* ==========================================================
   NEWS FILTERS
========================================================== */

import { Search } from "lucide-react";

import styles from "./NewsFilters.module.css";

export default function NewsFilters({
  search,
  setSearch,
  category,
  setCategory,
}) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.searchBox}>
        <Search size={19} />

        <input
          type="search"
          placeholder="Search news..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          aria-label="Search news"
        />
      </div>

      <div className={styles.categories}>
        <button
          type="button"
          className={category === "All" ? styles.active : ""}
          onClick={() => setCategory("All")}
        >
          All
        </button>

        <button
          type="button"
          className={category === "Party Updates" ? styles.active : ""}
          onClick={() => setCategory("Party Updates")}
        >
          Party Updates
        </button>

        <button
          type="button"
          className={category === "Campaigns" ? styles.active : ""}
          onClick={() => setCategory("Campaigns")}
        >
          Campaigns
        </button>

        <button
          type="button"
          className={category === "Workers" ? styles.active : ""}
          onClick={() => setCategory("Workers")}
        >
          Workers
        </button>

        <button
          type="button"
          className={category === "Events" ? styles.active : ""}
          onClick={() => setCategory("Events")}
        >
          Events
        </button>
      </div>
    </div>
  );
}