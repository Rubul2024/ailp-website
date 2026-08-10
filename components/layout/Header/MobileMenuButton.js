"use client";

/* ==========================================================
   AILP PUBLIC WEBSITE
   MOBILE MENU BUTTON

   All India Labour Party
   Production Ready
========================================================== */

import { Menu } from "lucide-react";

import styles from "./Header.module.css";


/* ==========================================================
   COMPONENT
========================================================== */

export default function MobileMenuButton({
  onClick,
}) {
  return (
    <button
      type="button"
      className={styles.mobileButton}
      onClick={onClick}
      aria-label="Open navigation menu"
      aria-haspopup="true"
    >
      <Menu
        size={24}
        strokeWidth={2.2}
        aria-hidden="true"
      />
    </button>
  );
}