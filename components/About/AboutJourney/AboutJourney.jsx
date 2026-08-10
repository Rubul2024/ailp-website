"use client";

/* ==========================================================
   AILP ABOUT JOURNEY
   All India Labour Party
========================================================== */

import {
  Flag,
  UsersRound,
  MapPinned,
  Megaphone,
} from "lucide-react";

import styles from "./AboutJourney.module.css";

/* ==========================================================
   Journey Data

   Replace these milestone descriptions with the
   organisation's officially verified history when available.
========================================================== */

const journey = [
  {
    year: "FOUNDATION",
    icon: Flag,
    title: "A Vision for Workers and Citizens",
    description:
      "The movement is built around the principles of employment, equality, workers' dignity and social justice.",
  },

  {
    year: "COMMUNITY",
    icon: UsersRound,
    title: "Connecting With Communities",
    description:
      "The organisation focuses on engaging with workers, families and communities to understand their concerns and aspirations.",
  },

  {
    year: "EXPANSION",
    icon: MapPinned,
    title: "Growing Across India",
    description:
      "AILP continues to work towards building a broader network of members, supporters and community participation.",
  },

  {
    year: "THE FUTURE",
    icon: Megaphone,
    title: "Working Towards a Stronger India",
    description:
      "The journey continues with a focus on opportunity, responsible leadership, social justice and inclusive development.",
  },
];

/* ==========================================================
   Component
========================================================== */

export default function AboutJourney() {
  return (
    <section className={styles.section}>
      {/* ====================================================
          Background
      ==================================================== */}

      <div
        className={styles.blueGlow}
        aria-hidden="true"
      />

      <div
        className={styles.orangeGlow}
        aria-hidden="true"
      />

      {/* ====================================================
          Container
      ==================================================== */}

      <div className={styles.container}>
        {/* ==================================================
            Heading
        ================================================== */}

        <div className={styles.heading}>
          <span className={styles.eyebrow}>
            OUR JOURNEY
          </span>

          <h2>
            Moving Forward
            <span> Together</span>
          </h2>

          <p>
            Every movement begins with an idea. Our journey
            is shaped by people, participation and a shared
            commitment to building a stronger future.
          </p>
        </div>

        {/* ==================================================
            Timeline
        ================================================== */}

        <div className={styles.timeline}>
          {/* Central Line */}

          <div
            className={styles.line}
            aria-hidden="true"
          />

          {journey.map((item, index) => {
            const Icon = item.icon;

            const isEven =
              index % 2 === 0;

            return (
              <article
                key={item.year}
                className={`${styles.item} ${
                  isEven
                    ? styles.leftItem
                    : styles.rightItem
                }`}
              >
                {/* ==================================================
                    Timeline Marker
                ================================================== */}

                <div className={styles.marker}>
                  <Icon size={19} />
                </div>

                {/* ==================================================
                    Content Card
                ================================================== */}

                <div className={styles.card}>
                  <span className={styles.year}>
                    {item.year}
                  </span>

                  <h3>{item.title}</h3>

                  <p>{item.description}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}