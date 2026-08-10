"use client";

/* ==========================================================
   AILP Party President
========================================================== */

import Image from "next/image";
import styles from "./PartyPresident.module.css";

export default function PartyPresident() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* ========================================
            Image
        ======================================== */}

        <div className={styles.imageWrapper}>
          <div className={styles.imageCard}>
            <Image
              src="/images/leadership/president.jpg"
              alt="President of All India Labour Party"
              fill
              className={styles.image}
            />
          </div>

          <div className={styles.experienceCard}>
            <strong>AILP</strong>
            <span>National Leadership</span>
          </div>
        </div>

        {/* ========================================
            Content
        ======================================== */}

        <div className={styles.content}>
          <span className={styles.badge}>
            NATIONAL PRESIDENT
          </span>

          <h2>
            Leadership that
            <br />
            <span>puts people first.</span>
          </h2>

          <p>
            The President of the All India Labour Party
            provides leadership to the organisation and
            works towards advancing its commitment to
            workers, employment, equality and social
            justice.
          </p>

          <p>
            Through public participation, organisational
            development and grassroots engagement,
            our leadership works to build a stronger
            political voice for citizens across India.
          </p>

          <div className={styles.quote}>
            <span>“</span>

            <p>
              Together, with dignity, opportunity and
              justice, we can build a stronger India.
            </p>
          </div>

          <div className={styles.signature}>
            <div className={styles.signatureLine}></div>

            <strong>National President</strong>

            <span>All India Labour Party</span>
          </div>
        </div>
      </div>
    </section>
  );
}