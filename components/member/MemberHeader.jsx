"use client";

import { Bell, Menu, PanelLeft } from "lucide-react";
import styles from "./MemberHeader.module.css";

export default function MemberHeader({ onMenuClick }) {
  return (
    <header className={styles.topHeader}>
      {/* Left: Sidebar Toggle & Breadcrumb */}
      <div className={styles.headerLeftGroup}>
        <button
          type="button"
          className={styles.menuButton}
          onClick={onMenuClick}
          aria-label="Toggle navigation menu"
        >
          <Menu size={20} />
        </button>

        <button
          type="button"
          className={styles.collapseButton}
          onClick={onMenuClick}
          aria-label="Toggle sidebar"
        >
          <PanelLeft size={17} />
        </button>

        <span className={styles.breadcrumb}>Member Portal</span>
      </div>

      {/* Right: Notifications */}
      <div className={styles.headerRight}>
        <button type="button" className={styles.bellBtn} title="Notifications">
          <Bell size={18} />
          <span className={styles.badgeCount}>3</span>
        </button>
      </div>
    </header>
  );
}
