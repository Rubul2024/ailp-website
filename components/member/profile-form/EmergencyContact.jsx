"use client";

/* ==========================================================
   Emergency Contact
   All India Labour Party
   Modern Professional Member Portal
========================================================== */

import {
  ShieldAlert,
  UserRound,
  Phone,
  HeartHandshake,
} from "lucide-react";

import styles from "../ProfileForm.module.css";

export default function EmergencyContact({
  formData,
  handleChange,
}) {
  return (
    <section className={styles.profileSection}>
      {/* ==================================================
          Section Header
      ================================================== */}

      <div className={styles.sectionHeader}>
        <div className={styles.sectionHeaderContent}>
          {/* Section Icon */}

          <div className={styles.sectionIcon}>
            <ShieldAlert size={21} />
          </div>

          <div>
            <h2>Emergency Contact</h2>

            <p>
              Provide someone we can contact in case of
              an emergency.
            </p>
          </div>
        </div>
      </div>

      {/* ==================================================
          Form Fields
      ================================================== */}

      <div className={styles.grid}>
        {/* ================================================
            Emergency Contact Name
        ================================================= */}

        <div className={styles.inputGroup}>
          <label htmlFor="emergencyName">
            <UserRound size={16} />

            <span>Contact Name</span>
          </label>

          <input
            id="emergencyName"
            name="emergencyName"
            type="text"
            value={formData.emergencyName || ""}
            onChange={handleChange}
            placeholder="Enter emergency contact name"
            autoComplete="off"
          />
        </div>

        {/* ================================================
            Relationship
        ================================================= */}

        <div className={styles.inputGroup}>
          <label htmlFor="relationship">
            <HeartHandshake size={16} />

            <span>Relationship</span>
          </label>

          <select
            id="relationship"
            name="relationship"
            value={formData.relationship || ""}
            onChange={handleChange}
          >
            <option value="">
              Select Relationship
            </option>

            <option value="Father">
              Father
            </option>

            <option value="Mother">
              Mother
            </option>

            <option value="Spouse">
              Spouse
            </option>

            <option value="Son">
              Son
            </option>

            <option value="Daughter">
              Daughter
            </option>

            <option value="Brother">
              Brother
            </option>

            <option value="Sister">
              Sister
            </option>

            <option value="Relative">
              Relative
            </option>

            <option value="Friend">
              Friend
            </option>

            <option value="Other">
              Other
            </option>
          </select>
        </div>

        {/* ================================================
            Emergency Mobile
        ================================================= */}

        <div className={styles.inputGroup}>
          <label htmlFor="emergencyMobile">
            <Phone size={16} />

            <span>Emergency Mobile Number</span>
          </label>

          <input
            id="emergencyMobile"
            name="emergencyMobile"
            type="tel"
            inputMode="numeric"
            maxLength={10}
            value={formData.emergencyMobile || ""}
            onChange={(event) => {
              const value = event.target.value
                .replace(/\D/g, "")
                .slice(0, 10);

              handleChange({
                target: {
                  name: "emergencyMobile",
                  value,
                },
              });
            }}
            placeholder="Enter 10-digit mobile number"
            autoComplete="tel"
          />

          <span className={styles.helperText}>
            Enter a mobile number that can be reached
            during an emergency.
          </span>
        </div>
      </div>

      {/* ==================================================
          Emergency Notice
      ================================================== */}

      <div className={styles.emergencyNotice}>
        <ShieldAlert size={17} />

        <span>
          Please make sure the emergency contact details
          are accurate and up to date.
        </span>
      </div>
    </section>
  );
}