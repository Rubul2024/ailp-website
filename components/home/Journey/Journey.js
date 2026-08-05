"use client";
import { useState } from "react";
import styles from "./Journey.module.css";

const timeline = [
  {
    year: "2024",
    title: "Foundation of AILP",
    description:
      "The All India Labour Party was established with the vision of protecting workers' rights and creating equal opportunities.",
  },
  {
    year: "2025",
    title: "Membership Expansion",
    description:
      "Launching nationwide membership campaigns to strengthen the organization and connect with citizens across India.",
  },
  {
    year: "2026",
    title: "Employment Initiatives",
    description:
      "Promoting skill development, employment opportunities, and labour welfare programs for sustainable growth.",
  },
  {
    year: "Future",
    title: "Building a Stronger India",
    description:
      "Working continuously towards social justice, dignity, and inclusive national development.",
  },
];

export default function Journey() {
  const [activeIndex, setActiveIndex] = useState(0);

  const active = timeline[activeIndex];
  return (
    <section className={styles.journey}>
      {/* Background Decorations */}
      <div className={styles.blueBlur}></div>
      <div className={styles.orangeBlur}></div>
      <div className={styles.grid}></div>

      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.heading}>
          <span className={styles.badge}>OUR JOURNEY</span>

          <h2>
            Building A Strong
            <br />
            Movement Together
          </h2>

          <p>
            Every great movement begins with a vision. Our journey reflects our
            commitment to workers, employment, equality, and nation building.
          </p>
        </div>

        {/* Timeline */}
        <div className={styles.timelineWrapper}>
          <div className={styles.timelineLine}></div>

          <div className={styles.timeline}>
            {timeline.map((item, index) => (
              <button
                key={item.year}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`${styles.timelineItem} ${
                  activeIndex === index ? styles.active : ""
                }`}
              >
                <div className={styles.circle}></div>

                <span>{item.year}</span>
              </button>
            ))}
          </div>

          <div className={styles.activeCard}>
            <span className={styles.activeYear}>{active.year}</span>

            <h3>{active.title}</h3>

            <p>{active.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
