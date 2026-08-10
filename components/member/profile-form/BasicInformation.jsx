"use client";

/* ==========================================================
   AILP Basic Information
   All India Labour Party
   Production Ready
========================================================== */

import {
  User,
  Mail,
  Phone,
  CreditCard,
} from "lucide-react";

import styles from "../ProfileForm.module.css";

export default function BasicInformation({
  formData,
}) {
  return (
    <section className={styles.profileSection}>
      {/* ==================================================
          Section Header
      ================================================== */}

      <div className={styles.sectionHeader}>
        <div>
          <h2>Basic Information</h2>

          <p>
            These details are taken from your registration
            and cannot be edited.
          </p>
        </div>
      </div>

      {/* ==================================================
          Information Grid
      ================================================== */}

      <div className={styles.grid}>
        {/* ================================================
            Full Name
        ================================================= */}

        <div className={styles.inputGroup}>
          <label htmlFor="fullName">
            <User size={17} />

            <span>Full Name</span>
          </label>

          <input
            id="fullName"
            type="text"
            value={formData.fullName || ""}
            disabled
            className={styles.readOnlyInput}
          />
        </div>

        {/* ================================================
            Email
        ================================================= */}

        <div className={styles.inputGroup}>
          <label htmlFor="email">
            <Mail size={17} />

            <span>Email Address</span>
          </label>

          <input
            id="email"
            type="email"
            value={formData.email || ""}
            disabled
            className={styles.readOnlyInput}
          />
        </div>

        {/* ================================================
            Mobile
        ================================================= */}

        <div className={styles.inputGroup}>
          <label htmlFor="mobile">
            <Phone size={17} />

            <span>Mobile Number</span>
          </label>

          <input
            id="mobile"
            type="text"
            value={formData.mobile || ""}
            disabled
            className={styles.readOnlyInput}
          />
        </div>

        {/* ================================================
            Membership ID
        ================================================= */}

        <div className={styles.inputGroup}>
          <label htmlFor="membershipId">
            <CreditCard size={17} />

            <span>Membership ID</span>
          </label>

          <input
            id="membershipId"
            type="text"
            value={
              formData.membershipId ||
              "Will Generate Automatically"
            }
            disabled
            className={styles.readOnlyInput}
          />
        </div>
      </div>
    </section>
  );
}