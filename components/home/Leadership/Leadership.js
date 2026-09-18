"use client";
import { useEffect, useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";

/* ==========================================================
   AILP Leadership Section
========================================================== */

import styles from "./Leadership.module.css";
import leadershipData from "./leadershipData";

function toCardShape(member) {
  return {
    id: member._id,
    name: member.name,
    designation: member.designation,
    image: member.photo,
    description: member.description,
    profile: member.profileUrl || "",
    social: {
      facebook: member.socials?.facebook || "",
      twitter: member.socials?.twitter || "",
      instagram: member.socials?.instagram || "",
      linkedin: member.socials?.linkedin || "",
    },
  };
}

export default function Leadership() {
  const [leaders, setLeaders] = useState(leadershipData);

  useEffect(() => {
    async function fetchLeadership() {
      try {
        const res = await fetch(`/api/leadership?t=${Date.now()}`, {
          cache: "no-store",
        });
        const data = await res.json();
        const members = (data?.members || [])
          .filter((m) => m.showOnHome)
          .map(toCardShape);

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
          {leaders.map((leader) => {
            const hasSocials = Object.values(leader.social || {}).some(
              (link) => link && link !== "#"
            );

            return (
              <article key={leader.id || leader.name} className={styles.card}>
                {/* Leader Image */}

                <div className={styles.imageWrapper}>
                  <img
                    src={leader.image || "/images/leadership/leader-1.jpeg"}
                    alt={leader.name}
                    className={styles.image}
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      e.currentTarget.nextSibling.style.display = "flex";
                    }}
                  />
                  <div className={styles.imageFallback} style={{ display: "none" }}>
                    {leader.name?.charAt(0)?.toUpperCase() || "A"}
                  </div>
                </div>

                {/* Leader Details */}

                <div className={styles.content}>
                  <span className={styles.designation}>{leader.designation}</span>

                  <h3>{leader.name}</h3>

                  <p>{leader.description}</p>

                  {hasSocials && (
                    <div className={styles.socials}>
                      {leader.social.facebook && leader.social.facebook !== "#" && (
                        <a href={leader.social.facebook} target="_blank" rel="noopener noreferrer">
                          <FaFacebookF />
                        </a>
                      )}

                      {leader.social.twitter && leader.social.twitter !== "#" && (
                        <a href={leader.social.twitter} target="_blank" rel="noopener noreferrer">
                          <FaXTwitter />
                        </a>
                      )}

                      {leader.social.instagram && leader.social.instagram !== "#" && (
                        <a href={leader.social.instagram} target="_blank" rel="noopener noreferrer">
                          <FaInstagram />
                        </a>
                      )}

                      {leader.social.linkedin && leader.social.linkedin !== "#" && (
                        <a href={leader.social.linkedin} target="_blank" rel="noopener noreferrer">
                          <FaLinkedinIn />
                        </a>
                      )}
                    </div>
                  )}

                  {leader.profile && (
                    <a href={leader.profile} className={styles.button}>
                      View Profile →
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
