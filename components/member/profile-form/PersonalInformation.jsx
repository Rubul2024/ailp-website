"use client";

/* ==========================================================
   Personal Information
   All India Labour Party
   Modern Professional Member Portal
========================================================== */

import {
  UserRound,
  UsersRound,
  CalendarDays,
  VenusAndMars,
} from "lucide-react";

import styles from "../ProfileForm.module.css";

export default function PersonalInformation({
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
            <UserRound size={21} />
          </div>

          <div>
            <h2>Personal Information</h2>

            <p>
              Please provide your personal details exactly
              as they appear on your official documents.
            </p>
          </div>
        </div>
      </div>

      {/* ==================================================
          Form Fields
      ================================================== */}

      <div className={styles.grid}>
        {/* ================================================
            Father's Name
        ================================================= */}

        <div className={styles.inputGroup}>
          <label htmlFor="fatherName">
            <UsersRound size={16} />

            <span>Father's Name</span>
          </label>

          <input
            id="fatherName"
            name="fatherName"
            type="text"
            value={formData.fatherName || ""}
            onChange={handleChange}
            placeholder="Enter father's name"
            autoComplete="off"
          />
        </div>

        {/* ================================================
            Mother's Name
        ================================================= */}

        <div className={styles.inputGroup}>
          <label htmlFor="motherName">
            <UsersRound size={16} />

            <span>Mother's Name</span>
          </label>

          <input
            id="motherName"
            name="motherName"
            type="text"
            value={formData.motherName || ""}
            onChange={handleChange}
            placeholder="Enter mother's name"
            autoComplete="off"
          />
        </div>

        {/* ================================================
            Date of Birth
        ================================================= */}

        <div className={styles.inputGroup}>
          <label htmlFor="dateOfBirth">
            <CalendarDays size={16} />

            <span>Date of Birth</span>
          </label>

          <input
            id="dateOfBirth"
            name="dateOfBirth"
            type="date"
            value={formData.dateOfBirth || ""}
            onChange={handleChange}
            max={
              new Date()
                .toISOString()
                .split("T")[0]
            }
          />

          <span className={styles.helperText}>
            Please enter your date of birth as shown on
            your official document.
          </span>
        </div>

        {/* ================================================
            Gender
        ================================================= */}

        <div className={styles.inputGroup}>
          <label htmlFor="gender">
            <VenusAndMars size={16} />

            <span>Gender</span>
          </label>

          <select
            id="gender"
            name="gender"
            value={formData.gender || ""}
            onChange={handleChange}
          >
            <option value="">
              Select Gender
            </option>

            <option value="Male">
              Male
            </option>

            <option value="Female">
              Female
            </option>

            <option value="Other">
              Other
            </option>

            <option value="Prefer not to say">
              Prefer not to say
            </option>
          </select>
        </div>
      </div>
    </section>
  );
}