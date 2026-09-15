"use client";

/* ==========================================================
   Shared Authentication Layout
   All India Labour Party

   Structural pattern: form panel on the left (logo fixed at
   top, page-authored heading/fields below), a full-height
   photo panel on the right with a caption overlay.
========================================================== */

import Image from "next/image";

import styles from "./AuthLayout.module.css";

export default function AuthLayout({
  variant = "member", // "member" | "admin"
  imageSrc,
  imageCaption,
  children,
}) {
  return (
    <div className={styles.pageWrapper} data-variant={variant}>
      <div className={styles.authContainer}>
        {/* ================= LEFT FORM PANEL ================= */}
        <div className={styles.leftPanel}>
          <div className={styles.leftPanelInner}>
            <Image
              src="/images/ailp-symbol-logo.svg"
              alt="All India Labour Party emblem"
              width={40}
              height={40}
              className={styles.emblem}
              priority
            />

            {children}
          </div>
        </div>

        {/* ================= RIGHT PHOTO PANEL ================= */}
        <div className={styles.rightPanel}>
          {imageSrc && (
            <Image
              src={imageSrc}
              alt=""
              fill
              sizes="(max-width: 960px) 0px, 45vw"
              className={styles.rightImage}
              priority
            />
          )}
          <div className={styles.rightOverlay} />
          {imageCaption && (
            <div className={styles.rightCaption}>
              <span className={styles.captionDot} />
              <p>{imageCaption}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
