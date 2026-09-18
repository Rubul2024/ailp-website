"use client";

/* ==========================================================
   AILP Party President
========================================================== */

import { useEffect, useState } from "react";
import styles from "./PartyPresident.module.css";

const DEFAULTS = {
  presidentName: "",
  presidentDesignation: "National President",
  presidentBadge: "NATIONAL PRESIDENT",
  presidentPhoto: "/images/leadership/president.jpeg",
  presidentBio1:
    "The President of the All India Labour Party provides leadership to the organisation and works towards advancing its commitment to workers, employment, equality and social justice.",
  presidentBio2:
    "Through public participation, organisational development and grassroots engagement, our leadership works to build a stronger political voice for citizens across India.",
  presidentQuote:
    "Together, with dignity, opportunity and justice, we can build a stronger India.",
  presidentSignatureTitle: "National President",
  presidentSignatureOrg: "All India Labour Party",
};

export default function PartyPresident() {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    async function fetchLeadership() {
      try {
        const res = await fetch(`/api/leadership?t=${Date.now()}`, {
          cache: "no-store",
        });
        const data = await res.json();
        if (data.success && data.settings) {
          setSettings(data.settings);
        }
      } catch (err) {
        console.error("Failed to load leadership settings:", err);
      }
    }
    fetchLeadership();
  }, []);

  const presidentName = settings?.presidentName || DEFAULTS.presidentName;
  const presidentBadge = settings?.presidentBadge || DEFAULTS.presidentBadge;
  const presidentPhoto = settings?.presidentPhoto || DEFAULTS.presidentPhoto;
  const presidentBio1 = settings?.presidentBio1 || DEFAULTS.presidentBio1;
  const presidentBio2 = settings?.presidentBio2 || DEFAULTS.presidentBio2;
  const presidentQuote = settings?.presidentQuote || DEFAULTS.presidentQuote;
  const presidentSignatureTitle = settings?.presidentSignatureTitle || DEFAULTS.presidentSignatureTitle;
  const presidentSignatureOrg = settings?.presidentSignatureOrg || DEFAULTS.presidentSignatureOrg;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* ========================================
            Image
        ======================================== */}

        <div className={styles.imageWrapper}>
          <div className={styles.imageCard}>
            <img
              src={presidentPhoto}
              alt={presidentName || "President of All India Labour Party"}
              className={styles.image}
              onError={(e) => {
                e.currentTarget.style.display = "none";
                e.currentTarget.nextSibling.style.display = "flex";
              }}
            />
            <div className={styles.imageFallback} style={{ display: "none" }}>
              {(presidentName || "A").charAt(0).toUpperCase()}
            </div>
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
            {presidentBadge}
          </span>

          {presidentName && (
            <strong className={styles.name}>{presidentName}</strong>
          )}

          <h2>
            Leadership that
            <br />
            <span>puts people first.</span>
          </h2>

          <p>{presidentBio1}</p>

          <p>{presidentBio2}</p>

          <div className={styles.quote}>
            <span>“</span>

            <p>{presidentQuote}</p>
          </div>

          <div className={styles.signature}>
            <div className={styles.signatureLine}></div>

            <strong>{presidentSignatureTitle}</strong>

            <span>{presidentSignatureOrg}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
