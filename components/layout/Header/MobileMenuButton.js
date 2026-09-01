"use client";

import styles from "./Header.module.css";

export default function MobileMenuButton({ onClick }) {
  return (
    <button
      type="button"
      className={styles.mobileButton}
      onClick={onClick}
      aria-label="Open mobile navigation menu"
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "44px",
        height: "44px",
        minWidth: "44px",
        minHeight: "44px",
        padding: 0,
        marginLeft: "auto",
        backgroundColor: "rgba(255, 255, 255, 0.12)",
        border: "1px solid rgba(255, 255, 255, 0.25)",
        borderRadius: "10px",
        cursor: "pointer",
        flexShrink: 0,
        zIndex: 2100,
      }}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          width: "24px",
          height: "24px",
          stroke: "#ffffff",
          color: "#ffffff",
          display: "block",
          pointerEvents: "none",
        }}
      >
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="18" x2="21" y2="18" />
      </svg>
    </button>
  );
}