"use client";

/* ==========================================================
   GALLERY GRID
========================================================== */

import Image from "next/image";

import styles from "./GalleryGrid.module.css";

export default function GalleryGrid({
  images,
  onImageClick,
}) {
  if (!images.length) {
    return (
      <div className={styles.empty}>
        <h3>No Images Found</h3>

        <p>
          There are no gallery images in this category yet.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {images.map((image, index) => (
        <button
          key={image.id}
          type="button"
          className={`${styles.item} ${
            index % 5 === 0
              ? styles.featured
              : ""
          }`}
          onClick={() => onImageClick(index)}
          aria-label={`Open ${image.title}`}
        >
          <Image
            src={image.src}
            alt={image.title}
            fill
            sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
            className={styles.image}
          />

          <div className={styles.overlay}>
            <div>
              <span>{image.category}</span>

              <h3>{image.title}</h3>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}