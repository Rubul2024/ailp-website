"use client";

/* ==========================================================
   GALLERY FILTERS
========================================================== */

import styles from "./GalleryFilters.module.css";

const categories = [
  "All",
  "Events",
  "Campaigns",
  "Leadership",
  "Members",
  "Community",
];

export default function GalleryFilters({
  activeCategory,
  setActiveCategory,
}) {
  return (
    <div className={styles.filters}>
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          className={
            activeCategory === category
              ? styles.active
              : ""
          }
          onClick={() =>
            setActiveCategory(category)
          }
        >
          {category}
        </button>
      ))}
    </div>
  );
}