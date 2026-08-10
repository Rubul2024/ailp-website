"use client";

/* ==========================================================
   Profile Submit Button
   All India Labour Party
   Modern Professional Member Portal
========================================================== */

import {
  Save,
  LoaderCircle,
  ShieldCheck,
} from "lucide-react";

import styles from "../ProfileForm.module.css";

export default function SubmitButton({ loading }) {
  return (
    <div className={styles.submitBar}>
      {/* ====================================================
          Security Information
      ==================================================== */}

      <div className={styles.submitInfo}>
        <div className={styles.submitInfoIcon}>
          <ShieldCheck size={20} />
        </div>

        <div className={styles.submitInfoContent}>
          <strong>
            Your information is secure
          </strong>

          <span>
            Review your details before saving your profile.
          </span>
        </div>
      </div>

      {/* ====================================================
          Save Profile Button
      ==================================================== */}

      <button
        type="submit"
        className={styles.submitButton}
        disabled={loading}
      >
        {loading ? (
          <>
            <LoaderCircle
              size={19}
              className={styles.spinner}
            />

            <span>
              Saving Profile...
            </span>
          </>
        ) : (
          <>
            <Save size={19} />

            <span>
              Save Profile
            </span>
          </>
        )}
      </button>
    </div>
  );
}