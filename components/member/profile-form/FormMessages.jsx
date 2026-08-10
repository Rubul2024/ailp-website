"use client";

/* ==========================================================
   Profile Form Messages
   All India Labour Party
   Modern Professional Member Portal
========================================================== */

import { CheckCircle2, AlertCircle, X } from "lucide-react";

import styles from "../ProfileForm.module.css";

export default function FormMessages({ success, error }) {
  /* ========================================================
     Nothing to display
  ======================================================== */

  if (!success && !error) {
    return null;
  }

  return (
    <div
      className={`${styles.message} ${success ? styles.success : styles.error}`}
      role="alert"
      aria-live="polite"
    >
      {/* ====================================================
          Success
      ==================================================== */}

      {success && (
        <>
          <CheckCircle2 size={22} className={styles.messageIcon} />

          <div className={styles.messageContent}>
            <strong>Profile Updated Successfully</strong>

            <span>{success}</span>
          </div>
        </>
      )}

      {/* ====================================================
          Error
      ==================================================== */}

      {error && (
        <>
          <AlertCircle size={22} className={styles.messageIcon} />

          <div className={styles.messageContent}>
            <strong>Unable to Update Profile</strong>

            <span>{error}</span>
          </div>
        </>
      )}
    </div>
  );
}
