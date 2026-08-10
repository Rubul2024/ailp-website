"use client";

import styles from "./WhyJoin.module.css";
import whyJoinData from "./whyJoinData";

export default function WhyJoin() {
  return (
    <section className={styles.whyJoin}>
      {/* Background Effects */}
      <div className={styles.blueGlow}></div>
      <div className={styles.orangeGlow}></div>
      <div className={styles.grid}></div>

      <div className={styles.container}>
        {/* Heading */}

        <div className={styles.heading}>
          <span className={styles.badge}>WHY JOIN AILP</span>

          <h2>
            Together We Can Build
            <br />A Better India
          </h2>

          <p>
            Join a movement dedicated to workers' rights, employment, social
            justice, and inclusive national development.
          </p>
        </div>

        {/* Cards */}

        <div className={styles.gridCards}>
          {whyJoinData.map((item) => (
            <article key={item.id} className={styles.card}>
              <div className={styles.icon}>{item.icon}</div>

              <h3>{item.title}</h3>

              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </div>

      <div className={styles.statsSection}>
        <div className={styles.statCard}>
          <h3>25,000+</h3>
          <p>Citizens Connected</p>
        </div>

        <div className={styles.statCard}>
          <h3>150+</h3>
          <p>District Volunteers</p>
        </div>

        <div className={styles.statCard}>
          <h3>50+</h3>
          <p>Awareness Campaigns</p>
        </div>
      </div>

      <div className={styles.ctaSection}>
        <h3>Become Part of the Change</h3>

        <p>
          Every member strengthens our mission to build a more just, inclusive,
          and progressive India.
        </p>

        <div className={styles.ctaButtons}>
          <a href="/join" className={styles.joinButton}>
            Join AILP
          </a>

          <a href="/about" className={styles.learnButton}>
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
}
