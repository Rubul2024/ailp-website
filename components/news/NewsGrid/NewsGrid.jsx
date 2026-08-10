import NewsCard from "../NewsCard/NewsCard";

import styles from "./NewsGrid.module.css";

export default function NewsGrid({ news }) {
  if (!news.length) {
    return (
      <div className={styles.empty}>
        <h3>No news found</h3>

        <p>
          We couldn&apos;t find any news matching your search.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {news.map((item) => (
        <NewsCard
          key={item.id}
          news={item}
        />
      ))}
    </div>
  );
}