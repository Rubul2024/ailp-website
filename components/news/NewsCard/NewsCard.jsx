import Link from "next/link";
import Image from "next/image";

import {
  ArrowUpRight,
  CalendarDays,
} from "lucide-react";

import styles from "./NewsCard.module.css";

export default function NewsCard({ news }) {
  return (
    <article className={styles.card}>
      <Link
        href={`/news/${news.slug}`}
        className={styles.imageLink}
      >
        <div className={styles.imageWrapper}>
          <Image
            src={news.image}
            alt={news.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
            className={styles.image}
          />

          <span className={styles.category}>
            {news.category}
          </span>
        </div>
      </Link>

      <div className={styles.content}>
        <div className={styles.date}>
          <CalendarDays size={15} />

          {news.date}
        </div>

        <h3>
          <Link href={`/news/${news.slug}`}>
            {news.title}
          </Link>
        </h3>

        <p>{news.excerpt}</p>

        <Link
          href={`/news/${news.slug}`}
          className={styles.readMore}
        >
          Read Full Story

          <ArrowUpRight size={17} />
        </Link>
      </div>
    </article>
  );
}