"use client";

/* ==========================================================
   AILP GALLERY PAGE
========================================================== */

import { useMemo, useState } from "react";

import GalleryHero from "@/components/gallery/GalleryHero/GalleryHero";
import GalleryFilters from "@/components/gallery/GalleryFilters/GalleryFilters";
import GalleryGrid from "@/components/gallery/GalleryGrid/GalleryGrid";
import GalleryLightbox from "@/components/gallery/GalleryLightbox/GalleryLightbox";

import styles from "./Gallery.module.css";

/* ==========================================================
   Temporary Gallery Data

   Later this can come from MongoDB / Admin Panel.
========================================================== */

const galleryData = [
  {
    id: 1,
    title: "AILP Public Meeting",
    category: "Events",
    src: "/images/gallery/gallery-1.jpg",
  },

  {
    id: 2,
    title: "Workers' Outreach Programme",
    category: "Workers",
    src: "/images/gallery/gallery-2.jpg",
  },

  {
    id: 3,
    title: "AILP Leadership",
    category: "Leadership",
    src: "/images/gallery/gallery-3.jpg",
  },

  {
    id: 4,
    title: "Community Engagement",
    category: "Community",
    src: "/images/gallery/gallery-4.jpg",
  },

  {
    id: 5,
    title: "Public Awareness Campaign",
    category: "Campaigns",
    src: "/images/gallery/gallery-5.jpg",
  },

  {
    id: 6,
    title: "AILP Members",
    category: "Members",
    src: "/images/gallery/gallery-6.jpg",
  },

  {
    id: 7,
    title: "Workers' Rights Campaign",
    category: "Campaigns",
    src: "/images/gallery/gallery-7.jpg",
  },

  {
    id: 8,
    title: "Community Programme",
    category: "Community",
    src: "/images/gallery/gallery-8.jpg",
  },

  {
    id: 9,
    title: "AILP Event",
    category: "Events",
    src: "/images/gallery/gallery-9.jpg",
  },

  {
    id: 10,
    title: "Party Members Together",
    category: "Members",
    src: "/images/gallery/gallery-10.jpg",
  },

  {
    id: 11,
    title: "Leadership Interaction",
    category: "Leadership",
    src: "/images/gallery/gallery-11.jpg",
  },

  {
    id: 12,
    title: "Public Outreach",
    category: "Community",
    src: "/images/gallery/gallery-12.jpg",
  },
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] =
    useState("All");

  const [selectedIndex, setSelectedIndex] =
    useState(null);

  const filteredImages = useMemo(() => {
    if (activeCategory === "All") {
      return galleryData;
    }

    return galleryData.filter(
      (image) =>
        image.category === activeCategory
    );
  }, [activeCategory]);

  function openLightbox(index) {
    setSelectedIndex(index);
  }

  function closeLightbox() {
    setSelectedIndex(null);
  }

  function showPrevious() {
    setSelectedIndex((current) => {
      if (current === null) {
        return null;
      }

      return current === 0
        ? filteredImages.length - 1
        : current - 1;
    });
  }

  function showNext() {
    setSelectedIndex((current) => {
      if (current === null) {
        return null;
      }

      return current ===
        filteredImages.length - 1
        ? 0
        : current + 1;
    });
  }

  return (
    <main className={styles.page}>
      {/* ==================================================
          HERO
      ================================================== */}

      <GalleryHero />

      {/* ==================================================
          GALLERY
      ================================================== */}

      <section
        id="gallery"
        className={styles.gallerySection}
      >
        <div className={styles.container}>
          <div className={styles.heading}>
            <span>OUR GALLERY</span>

            <h2>
              Stories Through
              <strong> Moments</strong>
            </h2>

            <p>
              A collection of moments from AILP activities,
              campaigns, meetings, community programmes and
              public engagement.
            </p>
          </div>

          <GalleryFilters
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />

          <GalleryGrid
            images={filteredImages}
            onImageClick={openLightbox}
          />
        </div>
      </section>

      {/* ==================================================
          LIGHTBOX
      ================================================== */}

      {selectedIndex !== null && (
        <GalleryLightbox
          images={filteredImages}
          currentIndex={selectedIndex}
          onClose={closeLightbox}
          onPrevious={showPrevious}
          onNext={showNext}
        />
      )}
    </main>
  );
}