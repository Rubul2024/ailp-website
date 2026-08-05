"use client";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";

/* ==========================================================
   AILP Leadership Section
   Module 6 - Lesson 29A
========================================================== */

import Image from "next/image";
import Link from "next/link";
import styles from "./Leadership.module.css";
import leadershipData from "./leadershipData";

export default function Leadership() {
  return (
    <section id="leadership" className={styles.section}>
      <div className={styles.container}>
        {/* ==========================
            Section Heading
        ========================== */}

        <div className={styles.heading}>
          <span className={styles.badge}>OUR LEADERSHIP</span>

          <h2>
            Meet The Leaders
            <br />
            Driving Positive Change
          </h2>

          <p>
            Our leadership team is committed to strengthening workers' rights,
            promoting social justice, and building a stronger future for every
            citizen of India.
          </p>
        </div>

        {/* ==========================
            Leadership Cards
        ========================== */}

        <div className={styles.grid}>
          {leadershipData.map((leader) => (
            <article key={leader.id} className={styles.card}>
              {/* Leader Image */}

              <div className={styles.imageWrapper}>
                <Image
                  src={leader.image}
                  alt={leader.name}
                  fill
                  className={styles.image}
                />
              </div>

              {/* Leader Details */}

              <div className={styles.content}>
                <span className={styles.designation}>{leader.designation}</span>

                <h3>{leader.name}</h3>

                <p>{leader.description}</p>

                <div className={styles.socials}>
                  <a href={leader.social.facebook}>
                    <FaFacebookF />
                  </a>

                  <a href={leader.social.twitter}>
                    <FaXTwitter />
                  </a>

                  <a href={leader.social.instagram}>
                    <FaInstagram />
                  </a>

                  <a href={leader.social.linkedin}>
                    <FaLinkedinIn />
                  </a>
                </div>

                <Link href={leader.profile} className={styles.button}>
                  View Profile →
                </Link>
                
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
