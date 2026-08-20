"use client";

/* ==========================================================
   AILP ABOUT VALUES
   All India Labour Party
   Modern Professional Public Website
========================================================== */

import {
  BriefcaseBusiness,
  Scale,
  UsersRound,
  HeartHandshake,
  GraduationCap,
  ShieldCheck,
} from "lucide-react";

import styles from "./AboutValues.module.css";

/* ==========================================================
   Values Data
========================================================== */

const values = [
  {
    number: "01",
    icon: BriefcaseBusiness,
    title: "Employment",
    description:
      "Promoting meaningful employment opportunities and supporting the dignity of work for citizens across India.",
  },

  {
    number: "02",
    icon: Scale,
    title: "Equality",
    description:
      "Working towards a society where every citizen has equal opportunity, dignity and a fair chance to progress.",
  },

  {
    number: "03",
    icon: UsersRound,
    title: "People First",
    description:
      "Keeping citizens, workers and communities at the centre of our public priorities and initiatives.",
  },

  {
    number: "04",
    icon: HeartHandshake,
    title: "Social Justice",
    description:
      "Standing for fairness, dignity, inclusion and a society where people can live and work with respect.",
  },

  {
    number: "05",
    icon: GraduationCap,
    title: "Opportunity",
    description:
      "Encouraging education, skills and opportunities that help individuals and communities build a better future.",
  },

  {
    number: "06",
    icon: ShieldCheck,
    title: "Responsible Leadership",
    description:
      "Promoting responsible participation, transparency and leadership focused on constructive public service.",
  },
];

/* ==========================================================
   Component
========================================================== */

export default function AboutValues() {
  return (
    <section className={styles.section}>
      {/* ====================================================
          Background Decorations
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
            OUR VALUES
          </span>

          <h2>
            Principles That
            <span> Guide Our Work</span>
          </h2>

          <p>
            Our values shape the way we engage with citizens,
            workers and communities while working towards a
            stronger and more inclusive India.
          </p>
        </div>

        {/* ==================================================
            Values Grid
        ================================================== */}

        <div className={styles.grid}>
          {values.map((value) => {
            const Icon = value.icon;

            return (
              <article
                key={value.number}
                className={styles.card}
              >
                {/* Number */}

                <span className={styles.number}>
                  {value.number}
                </span>

                {/* Icon */}

                <div className={styles.icon}>
                  <Icon size={25} />
                </div>

                {/* Content */}

                <div className={styles.cardContent}>
                  <h3>{value.title}</h3>

                  <p>{value.description}</p>
                </div>

                {/* Bottom Accent */}

                <div
                  className={styles.cardAccent}
                  aria-hidden="true"
                />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}