"use client";

/* ==========================================================
   Latest Announcements
   All India Labour Party
========================================================== */

import {
  Megaphone,
  CalendarDays,
} from "lucide-react";

import styles from "./Dashboard.module.css";

export default function LatestAnnouncements() {
  const announcements = [
    {
      title: "National Membership Drive 2026",
      date: "12 Aug 2026",
    },
    {
      title: "Labour Rights Awareness Campaign",
      date: "20 Aug 2026",
    },
    {
      title: "District Committee Meeting",
      date: "28 Aug 2026",
    },
  ];

  return (
    <section className={styles.panel}>
      <div className={styles.panelHeader}>
        <Megaphone size={22} />
        <h2>Latest Announcements</h2>
      </div>

      {announcements.map((item, index) => (
        <div
          key={index}
          className={styles.listItem}
        >
          <strong>{item.title}</strong>

          <span>
            <CalendarDays size={14} />
            {item.date}
          </span>
        </div>
      ))}
    </section>
  );
}