/*
==========================================================
Campaign Card Component

Displays ONE campaign.

This component is reusable.

Today:
Receives data from Campaigns.js

Future:
Receives data from MongoDB API.

==========================================================
*/

import Image from "next/image";
import Link from "next/link";

import { FaArrowRight } from "react-icons/fa6";

import styles from "./CampaignCard.module.css";

export default function CampaignCard({ campaign }) {
  return (
    <article className={styles.card}>
      {/* ======================================
          Campaign Image
      ======================================= */}

      <div className={styles.imageWrapper}>
        <Image
          src={campaign.image}
          alt={campaign.title}
          width={700}
          height={450}
          className={styles.image}
        />

        {/* Category */}

        <span className={styles.category}>
          {campaign.category}
        </span>

        {/* Status */}

        <span
          className={`${styles.status} ${
            campaign.status === "Upcoming"
              ? styles.upcoming
              : styles.active
          }`}
        >
          {campaign.status}
        </span>
      </div>

      {/* ======================================
          Content
      ======================================= */}

      <div className={styles.content}>
        <h3>{campaign.title}</h3>

        <p>{campaign.description}</p>

        {/* Footer */}

        <div className={styles.footer}>
          <Link
            href={campaign.link}
            className={styles.button}
          >
            {campaign.buttonText}

            <FaArrowRight />
          </Link>
        </div>
      </div>
    </article>
  );
}