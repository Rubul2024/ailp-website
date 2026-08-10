"use client";

import { useState } from "react";
import styles from "./Journey.module.css";

/* ==========================================================
   AILP JOURNEY TIMELINE
   2018 - 2026
========================================================== */

const timeline = [
  {
    year: "2018",
    title: "Foundation of AILP",
    description:
      "The All India Labour Party was established in 2018 with a vision focused on workers' rights, employment, equality, social justice, and a stronger India.",
  },

  {
    year: "2019",
    title: "Building the Movement",
    description:
      "The organization continued building its foundation and strengthening its commitment towards workers, citizens, and inclusive development.",
  },

  {
    year: "2020",
    title: "Community Engagement",
    description:
      "The movement continued connecting with communities and promoting awareness around workers' welfare, employment, equality, and social justice.",
  },

  {
    year: "2021",
    title: "Workers & Social Welfare",
    description:
      "The focus continued on workers' dignity, employment opportunities, equality, and the welfare of communities across India.",
  },

  {
    year: "2022",
    title: "Expanding the Movement",
    description:
      "AILP continued working towards broader public participation and strengthening its organizational presence among citizens.",
  },

  {
    year: "2023",
    title: "Growing Public Participation",
    description:
      "The movement continued encouraging citizens to participate and contribute towards social, economic, and national development.",
  },

  {
    year: "2024",
    title: "Organizational Growth",
    description:
      "AILP continued its journey of organizational growth with a focus on workers' interests, public participation, and inclusive development.",
  },

  {
    year: "2025",
    title: "Membership Expansion",
    description:
      "The organization continued expanding membership and encouraging citizens to participate in its vision for workers, equality, and social justice.",
  },

  {
    year: "2026",
    title: "Moving Forward Together",
    description:
      "AILP continues working towards employment, workers' welfare, equality, social justice, dignity, and inclusive national development.",
  },
];

export default function Journey() {
  const [activeIndex, setActiveIndex] = useState(0);

  const active = timeline[activeIndex];

  return (
    <section className={styles.journey}>

      {/* ==================================================
          Background Decorations
      ================================================== */}

      <div className={styles.blueBlur}></div>

      <div className={styles.orangeBlur}></div>

      <div className={styles.grid}></div>

      {/* ==================================================
          Main Container
      ================================================== */}

      <div className={styles.container}>

        {/* ==================================================
            Section Header
        ================================================== */}

        <div className={styles.heading}>

          <span className={styles.badge}>
            OUR JOURNEY
          </span>

          <h2>
            Building A Strong
            <br />
            Movement Together
          </h2>

          <p>
            From our foundation in 2018 to the present day, our journey
            reflects our commitment to workers, employment, equality,
            social justice, and nation building.
          </p>

        </div>

        {/* ==================================================
            Timeline
        ================================================== */}

        <div className={styles.timelineWrapper}>

          {/* Timeline Line */}

          <div className={styles.timelineLine}></div>

          {/* Timeline Years */}

          <div className={styles.timeline}>

            {timeline.map((item, index) => (
              <button
                key={item.year}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`${styles.timelineItem} ${
                  activeIndex === index ? styles.active : ""
                }`}
                aria-label={`View ${item.year} milestone`}
                aria-pressed={activeIndex === index}
              >

                <div className={styles.circle}></div>

                <span>
                  {item.year}
                </span>

              </button>
            ))}

          </div>

          {/* ==================================================
              Active Timeline Card
          ================================================== */}

          <div className={styles.activeCard}>

            <span className={styles.activeYear}>
              {active.year}
            </span>

            <h3>
              {active.title}
            </h3>

            <p>
              {active.description}
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}