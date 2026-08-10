"use client";

/* ==========================================================
   Professional Information
   All India Labour Party
   Modern Professional Member Portal
========================================================== */

import {
  BriefcaseBusiness,
  GraduationCap,
  Droplets,
} from "lucide-react";

import styles from "../ProfileForm.module.css";

export default function ProfessionalInformation({
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
            <BriefcaseBusiness size={21} />
          </div>

          <div>
            <h2>Professional Information</h2>

            <p>
              Tell us about your occupation, education and
              blood group.
            </p>
          </div>
        </div>
      </div>

      {/* ==================================================
          Form Fields
      ================================================== */}

      <div className={styles.grid}>
        {/* ================================================
            Occupation
        ================================================= */}

        <div className={styles.inputGroup}>
          <label htmlFor="occupation">
            <BriefcaseBusiness size={16} />

            <span>Occupation</span>
          </label>

          <select
            id="occupation"
            name="occupation"
            value={formData.occupation || ""}
            onChange={handleChange}
          >
            <option value="">
              Select Occupation
            </option>

            <option value="Student">
              Student
            </option>

            <option value="Farmer">
              Farmer
            </option>

            <option value="Worker">
              Worker
            </option>

            <option value="Government Employee">
              Government Employee
            </option>

            <option value="Private Employee">
              Private Employee
            </option>

            <option value="Business">
              Business
            </option>

            <option value="Self Employed">
              Self Employed
            </option>

            <option value="Teacher">
              Teacher
            </option>

            <option value="Doctor">
              Doctor
            </option>

            <option value="Engineer">
              Engineer
            </option>

            <option value="Lawyer">
              Lawyer
            </option>

            <option value="Social Worker">
              Social Worker
            </option>

            <option value="Homemaker">
              Homemaker
            </option>

            <option value="Retired">
              Retired
            </option>

            <option value="Unemployed">
              Unemployed
            </option>

            <option value="Other">
              Other
            </option>
          </select>
        </div>

        {/* ================================================
            Education
        ================================================= */}

        <div className={styles.inputGroup}>
          <label htmlFor="education">
            <GraduationCap size={16} />

            <span>Education</span>
          </label>

          <select
            id="education"
            name="education"
            value={formData.education || ""}
            onChange={handleChange}
          >
            <option value="">
              Select Education
            </option>

            <option value="Below 10th">
              Below 10th
            </option>

            <option value="10th Pass">
              10th Pass
            </option>

            <option value="12th Pass">
              12th Pass
            </option>

            <option value="ITI">
              ITI
            </option>

            <option value="Diploma">
              Diploma
            </option>

            <option value="Graduate">
              Graduate
            </option>

            <option value="Post Graduate">
              Post Graduate
            </option>

            <option value="Professional Degree">
              Professional Degree
            </option>

            <option value="PhD">
              PhD
            </option>

            <option value="Other">
              Other
            </option>
          </select>
        </div>

        {/* ================================================
            Blood Group
        ================================================= */}

        <div className={styles.inputGroup}>
          <label htmlFor="bloodGroup">
            <Droplets size={16} />

            <span>Blood Group</span>
          </label>

          <select
            id="bloodGroup"
            name="bloodGroup"
            value={formData.bloodGroup || ""}
            onChange={handleChange}
          >
            <option value="">
              Select Blood Group
            </option>

            <option value="A+">
              A+
            </option>

            <option value="A-">
              A-
            </option>

            <option value="B+">
              B+
            </option>

            <option value="B-">
              B-
            </option>

            <option value="AB+">
              AB+
            </option>

            <option value="AB-">
              AB-
            </option>

            <option value="O+">
              O+
            </option>

            <option value="O-">
              O-
            </option>

            <option value="Unknown">
              Unknown
            </option>
          </select>

          <span className={styles.helperText}>
            This information can help during emergencies.
          </span>
        </div>
      </div>
    </section>
  );
}