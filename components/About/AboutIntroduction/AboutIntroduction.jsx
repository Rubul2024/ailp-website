"use client";

/* ==========================================================
   AILP ABOUT INTRODUCTION
   All India Labour Party
   Modern Public Website
   ========================================================== */

import Image from "next/image";
import Link from "next/link";

import {
  UsersRound,
  BriefcaseBusiness,
  Scale,
  HeartHandshake,
  ArrowRight,
} from "lucide-react";

import styles from "./AboutIntroduction.module.css";

/* ==========================================================
   Component
========================================================== */

export default function AboutIntroduction() {
  return (
    <section className={styles.section}>
      {/* ======================================================
          Background Decorations
      ====================================================== */}

      <div
        className={styles.blueGlow}
        aria-hidden="true"
      />

      <div
        className={styles.orangeGlow}
        aria-hidden="true"
      />

      {/* ======================================================
          Main Container
      ====================================================== */}

      <div className={styles.container}>
        {/* ====================================================
            Section Heading
        ==================================================== */}

        <div className={styles.sectionHeading}>
          <span className={styles.eyebrow}>
            WHO WE ARE
          </span>

          <h2>
            A Movement Built Around
            <span> People, Work &amp; Dignity</span>
          </h2>

          <p>
            All India Labour Party believes that every
            citizen deserves opportunity, dignity and a
            meaningful role in building the future of India.
          </p>
        </div>

        {/* ====================================================
            Main Content
        ==================================================== */}

        <div className={styles.contentGrid}>
          {/* ==================================================
              Image
          ================================================== */}

          <div className={styles.imageColumn}>
            <div className={styles.imageWrapper}>
              <Image
                src="/images/about/about-introduction.jpg"
                alt="All India Labour Party members and workers"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className={styles.image}
              />

              <div
                className={styles.imageOverlay}
                aria-hidden="true"
              />

              {/* Experience / Movement Badge */}

              <div className={styles.imageBadge}>
                <strong>AILP</strong>

                <span>
                  Working for a stronger India
                </span>
              </div>
            </div>

            {/* Decorative Shape */}

            <div
              className={styles.imageDecoration}
              aria-hidden="true"
            />
          </div>

          {/* ==================================================
              Text Content
          ================================================== */}

          <div className={styles.content}>
            <span className={styles.contentLabel}>
              OUR PURPOSE
            </span>

            <h3>
              Putting Workers and Citizens
              <span> at the Heart of Development</span>
            </h3>

            <p>
              We are committed to creating a society where
              employment opportunities, workers' rights,
              equality and social justice are given the
              importance they deserve.
            </p>

            <p>
              Our approach is centred on public
              participation, responsible leadership,
              community engagement and constructive
              solutions to the challenges faced by
              ordinary citizens.
            </p>

            <p>
              We believe that India's progress becomes
              stronger when its workers, families,
              communities and young people have the
              opportunity to participate and prosper.
            </p>

            {/* ==================================================
                Values
            ================================================== */}

            <div className={styles.values}>
              <div className={styles.valueItem}>
                <div className={styles.valueIcon}>
                  <UsersRound size={20} />
                </div>

                <div>
                  <h4>People First</h4>

                  <p>
                    Listening to citizens and communities.
                  </p>
                </div>
              </div>

              <div className={styles.valueItem}>
                <div className={styles.valueIcon}>
                  <BriefcaseBusiness size={20} />
                </div>

                <div>
                  <h4>Employment</h4>

                  <p>
                    Supporting meaningful work and opportunity.
                  </p>
                </div>
              </div>

              <div className={styles.valueItem}>
                <div className={styles.valueIcon}>
                  <Scale size={20} />
                </div>

                <div>
                  <h4>Equality</h4>

                  <p>
                    Promoting fairness, dignity and inclusion.
                  </p>
                </div>
              </div>

              <div className={styles.valueItem}>
                <div className={styles.valueIcon}>
                  <HeartHandshake size={20} />
                </div>

                <div>
                  <h4>Social Justice</h4>

                  <p>
                    Working towards a more just society.
                  </p>
                </div>
              </div>
            </div>

            {/* ==================================================
                Action
            ================================================== */}

            <div className={styles.action}>
              <Link
                href="/mission"
                className={styles.button}
              >
                Discover Our Mission

                <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}