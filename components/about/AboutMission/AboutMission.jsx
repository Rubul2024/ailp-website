"use client";

/* ==========================================================
   AILP ABOUT MISSION
   All India Labour Party
========================================================== */

import Link from "next/link";

import {
  Target,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

import styles from "./AboutMission.module.css";

/* ==========================================================
   Mission Points
========================================================== */

const missionPoints = [
  "Promote meaningful employment opportunities.",
  "Protect the dignity and rights of workers.",
  "Support equality and social justice.",
  "Encourage responsible public participation.",
  "Strengthen communities through opportunity.",
  "Work towards an inclusive and progressive India.",
];

/* ==========================================================
   Component
========================================================== */

export default function AboutMission() {
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
          Main Container
      ==================================================== */}

      <div className={styles.container}>
        {/* ==================================================
            Mission Visual
        ================================================== */}

        <div className={styles.visual}>
          <div className={styles.visualCard}>
            <div className={styles.visualIcon}>
              <Target size={38} />
            </div>

            <span>OUR MISSION</span>

            <strong>
              Work With Purpose.
              <br />
              Serve With Responsibility.
            </strong>

            <p>
              Building a stronger future through
              employment, equality and social justice.
            </p>
          </div>

          <div
            className={styles.circle}
            aria-hidden="true"
          />

          <div
            className={styles.smallCircle}
            aria-hidden="true"
          />
        </div>

        {/* ==================================================
            Content
        ================================================== */}

        <div className={styles.content}>
          <span className={styles.eyebrow}>
            OUR MISSION
          </span>

          <h2>
            Creating Opportunity,
            <span> Dignity and Social Justice</span>
          </h2>

          <p className={styles.intro}>
            Our mission is to work towards a society where
            citizens and workers have meaningful opportunities
            to participate, contribute and build a better
            future for themselves and their communities.
          </p>

          <p>
            We believe that progress should be inclusive.
            Through public participation, constructive
            engagement and responsible leadership, we seek
            to contribute towards stronger communities and
            a stronger India.
          </p>

          {/* ==================================================
              Mission List
          ================================================== */}

          <div className={styles.points}>
            {missionPoints.map((point) => (
              <div
                key={point}
                className={styles.point}
              >
                <CheckCircle2 size={19} />

                <span>{point}</span>
              </div>
            ))}
          </div>

          {/* ==================================================
              CTA
          ================================================== */}

          <Link
            href="/join"
            className={styles.button}
          >
            Join the Movement

            <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
}