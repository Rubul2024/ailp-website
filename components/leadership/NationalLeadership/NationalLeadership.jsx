"use client";

/* ==========================================================
   AILP National Leadership
========================================================== */

import { useEffect, useState } from "react";
import styles from "./NationalLeadership.module.css";

const FALLBACK_LEADERS = [
  {
    _id: "fallback-1",
    name: "National Leadership",
    designation: "National Office",
    photo: "/images/leadership/leader-1.jpeg",
  },
  {
    _id: "fallback-2",
    name: "Senior Leadership",
    designation: "National Organisation",
    photo: "/images/leadership/leader-2.jpeg",
  },
  {
    _id: "fallback-3",
    name: "State Leadership",
    designation: "State Organisation",
    photo: "/images/leadership/leader-3.jpeg",
  },
];

export default function NationalLeadership() {
  const [leaders, setLeaders] = useState(FALLBACK_LEADERS);

  useEffect(() => {
    async function fetchLeadership() {
      try {
        const res = await fetch(`/api/leadership?t=${Date.now()}`, {
          cache: "no-store",
        });
        const data = await res.json();
        const members = (data?.members || []).filter((m) => m.showOnLeadershipPage);
        if (data.success && members.length > 0) {
          setLeaders(members);
        }
      } catch (err) {
        console.error("Failed to load leadership team:", err);
      }
    }
    fetchLeadership();
  }, []);

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
              key={leader._id || leader.name}
            >
              <div className={styles.imageWrapper}>
                {leader.photo ? (
                  <img
                    src={leader.photo}
                    alt={leader.name}
                    className={styles.image}
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      e.currentTarget.nextSibling.style.display = "flex";
                    }}
                  />
                ) : null}
                <div
                  className={styles.imageFallback}
                  style={{ display: leader.photo ? "none" : "flex" }}
                >
                  {leader.name?.charAt(0)?.toUpperCase() || "A"}
                </div>
              </div>

              <div className={styles.content}>
                <span>{leader.designation}</span>

                <h3>{leader.name}</h3>

                <p>
                  {leader.description ||
                    "Serving the organisation with commitment, responsibility and dedication."}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
