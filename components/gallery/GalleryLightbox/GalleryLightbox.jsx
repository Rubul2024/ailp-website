"use client";

/* ==========================================================
   GALLERY LIGHTBOX
========================================================== */

import { useEffect } from "react";

import Image from "next/image";

import {
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import styles from "./GalleryLightbox.module.css";

export default function GalleryLightbox({
  images,
  currentIndex,
  onClose,
  onPrevious,
  onNext,
}) {
  const currentImage =
    images[currentIndex];

  useEffect(() => {
    if (!currentImage) {
      return;
    }

    document.body.style.overflow = "hidden";

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }

      if (event.key === "ArrowLeft") {
        onPrevious();
      }

      if (event.key === "ArrowRight") {
        onNext();
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.body.style.overflow = "";

      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [
    currentImage,
    onClose,
    onPrevious,
    onNext,
  ]);

  if (!currentImage) {
    return null;
  }

  return (
    <div
      className={styles.backdrop}
      onMouseDown={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Gallery image viewer"
    >
      <div
        className={styles.lightbox}
        onMouseDown={(event) =>
          event.stopPropagation()
        }
      >
        <button
          type="button"
          className={styles.close}
          onClick={onClose}
          aria-label="Close gallery"
        >
          <X size={24} />
        </button>

        <button
          type="button"
          className={`${styles.navigation} ${styles.previous}`}
          onClick={onPrevious}
          aria-label="Previous image"
        >
          <ChevronLeft size={28} />
        </button>

        <div className={styles.imageWrapper}>
          <Image
            src={currentImage.src}
            alt={currentImage.title}
            fill
            sizes="90vw"
            className={styles.image}
            priority
          />
        </div>

        <button
          type="button"
          className={`${styles.navigation} ${styles.next}`}
          onClick={onNext}
          aria-label="Next image"
        >
          <ChevronRight size={28} />
        </button>

        <div className={styles.info}>
          <span>
            {currentImage.category}
          </span>

          <h2>{currentImage.title}</h2>

          <p>
            {currentIndex + 1} / {images.length}
          </p>
        </div>
      </div>
    </div>
  );
}