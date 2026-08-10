"use client";

/* ==========================================================
   AILP NEWS PAGE
========================================================== */

import { useMemo, useState } from "react";

import NewsHero from "@/components/news/NewsHero/NewsHero";
import NewsFilters from "@/components/news/NewsFilters/NewsFilters";
import NewsGrid from "@/components/news/NewsGrid/NewsGrid";

import styles from "./News.module.css";

/* ==========================================================
   Temporary News Data

   Later this will come from MongoDB / Admin Panel.
========================================================== */

const newsData = [
  {
    id: 1,
    title:
      "All India Labour Party Reaffirms Commitment to Workers' Rights",
    slug: "ailp-reaffirms-commitment-to-workers-rights",
    category: "Workers",
    date: "August 8, 2026",
    image: "/images/news/news-1.jpg",
    excerpt:
      "AILP continues its efforts to promote employment, dignity, equality and stronger opportunities for workers across India.",
  },

  {
    id: 2,
    title:
      "AILP Expands Community Engagement and Public Outreach",
    slug: "ailp-expands-community-engagement",
    category: "Party Updates",
    date: "August 5, 2026",
    image: "/images/news/news-2.jpg",
    excerpt:
      "The party continues strengthening grassroots engagement and encouraging greater public participation.",
  },

  {
    id: 3,
    title:
      "Employment and Social Justice Remain at the Heart of AILP",
    slug: "employment-and-social-justice-ailp",
    category: "Campaigns",
    date: "August 2, 2026",
    image: "/images/news/news-3.jpg",
    excerpt:
      "AILP highlights the importance of employment opportunities, social security and equal participation.",
  },

  {
    id: 4,
    title:
      "AILP Members Participate in Community Development Activities",
    slug: "ailp-members-community-development",
    category: "Events",
    date: "July 28, 2026",
    image: "/images/news/news-4.jpg",
    excerpt:
      "Members and volunteers continue participating in activities focused on community development and public welfare.",
  },

  {
    id: 5,
    title:
      "Building Stronger Communities Through Public Participation",
    slug: "building-stronger-communities",
    category: "Party Updates",
    date: "July 24, 2026",
    image: "/images/news/news-5.jpg",
    excerpt:
      "AILP believes meaningful public participation is essential to building stronger and more inclusive communities.",
  },

  {
    id: 6,
    title:
      "Workers' Dignity and Equality: AILP's Continuing Mission",
    slug: "workers-dignity-and-equality",
    category: "Workers",
    date: "July 20, 2026",
    image: "/images/news/news-6.jpg",
    excerpt:
      "The party continues to focus on dignity, equality and opportunity for workers and citizens.",
  },
];

export default function NewsPage() {
  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("All");

  const filteredNews = useMemo(() => {
    const searchTerm = search
      .trim()
      .toLowerCase();

    return newsData.filter((item) => {
      const matchesCategory =
        category === "All" ||
        item.category === category;

      const matchesSearch =
        !searchTerm ||
        item.title.toLowerCase().includes(searchTerm) ||
        item.excerpt.toLowerCase().includes(searchTerm) ||
        item.category.toLowerCase().includes(searchTerm);

      return (
        matchesCategory &&
        matchesSearch
      );
    });
  }, [search, category]);

  return (
    <main className={styles.page}>
      {/* ==================================================
          HERO
      ================================================== */}

      <NewsHero />

      {/* ==================================================
          LATEST NEWS
      ================================================== */}

      <section
        id="latest-news"
        className={styles.newsSection}
      >
        <div className={styles.container}>
          <div className={styles.heading}>
            <span>LATEST NEWS</span>

            <h2>
              Stay Updated With
              <strong> AILP</strong>
            </h2>

            <p>
              Discover the latest news, activities, campaigns
              and updates from the All India Labour Party.
            </p>
          </div>

          <NewsFilters
            search={search}
            setSearch={setSearch}
            category={category}
            setCategory={setCategory}
          />

          <NewsGrid news={filteredNews} />
        </div>
      </section>
    </main>
  );
}