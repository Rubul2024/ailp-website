"use client";

/* ==========================================================
   Shared Auth Text Input
   All India Labour Party
========================================================== */

import styles from "./AuthInput.module.css";

export default function AuthInput({
  id,
  label,
  labelAction,
  icon: Icon,
  error,
  ...inputProps
}) {
  return (
    <div className={styles.inputGroup}>
      <div className={styles.labelRow}>
        <label htmlFor={id} className={styles.inputLabel}>
          {label}
        </label>
        {labelAction}
      </div>
      <div className={`${styles.inputWrapper} ${error ? styles.inputWrapperError : ""}`}>
        {Icon && <Icon size={18} className={styles.fieldIcon} aria-hidden="true" />}
        <input
          id={id}
          className={styles.fieldInput}
          aria-invalid={error ? "true" : "false"}
          {...inputProps}
        />
      </div>
    </div>
  );
}
