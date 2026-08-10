"use client";

/* ==========================================================
   AILP National Leadership
========================================================== */

import Image from "next/image";
import styles from "./NationalLeadership.module.css";

const leaders = [
  {
    name: "National Leadership",
    role: "National Office",
    image: "/images/leadership/leader-1.jpg",
  },

  {
    name: "Senior Leadership",
    role: "National Organisation",
    image: "/images/leadership/leader-2.jpg",
  },

  {
    name: "State Leadership",
    role: "State Organisation",
    image: "/images/leadership/leader-3.jpg",
  },
];

export default function NationalLeadership() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.heading}>
          <span>OUR LEADERS</span>

          <h2>
            Working Together
            <br />
            for a Stronger AILP
          </h2>

          <p>
            Our leadership team represents the
            organisation at different levels and works
            together to strengthen our presence across
            India.
          </p>
        </div>

        <div className={styles.grid}>
          {leaders.map((leader) => (
            <article
              className={styles.card}
              key={leader.name}
            >
              <div className={styles.imageWrapper}>
                <Image
                  src={leader.image}
                  alt={leader.name}
                  fill
                  className={styles.image}
                />
              </div>

              <div className={styles.content}>
                <span>{leader.role}</span>

                <h3>{leader.name}</h3>

                <p>
                  Serving the organisation with
                  commitment, responsibility and
                  dedication.
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}