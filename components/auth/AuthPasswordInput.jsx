"use client";

/* ==========================================================
   Shared Auth Password Input (with show/hide toggle)
   All India Labour Party
========================================================== */

import { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";

import styles from "./AuthInput.module.css";

export default function AuthPasswordInput({ id, label, labelAction, error, ...inputProps }) {
  const [visible, setVisible] = useState(false);

  return (
    <div className={styles.inputGroup}>
      <div className={styles.labelRow}>
        <label htmlFor={id} className={styles.inputLabel}>
          {label}
        </label>
        {labelAction}
      </div>
      <div className={`${styles.inputWrapper} ${error ? styles.inputWrapperError : ""}`}>
        <Lock size={18} className={styles.fieldIcon} aria-hidden="true" />
        <input
          id={id}
          type={visible ? "text" : "password"}
          className={styles.fieldInput}
          aria-invalid={error ? "true" : "false"}
          {...inputProps}
        />
        <button
          type="button"
          className={styles.eyeToggleBtn}
          onClick={() => setVisible((prev) => !prev)}
          aria-label={visible ? "Hide password" : "Show password"}
          aria-pressed={visible}
        >
          {visible ? <EyeOff size={18} aria-hidden="true" /> : <Eye size={18} aria-hidden="true" />}
        </button>
      </div>
    </div>
  );
}
