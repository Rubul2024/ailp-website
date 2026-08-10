"use client";

/* ==========================================================
   Address Information
   All India Labour Party
   Member Portal
========================================================== */

import {
  Globe,
  MapPinned,
  Landmark,
  Building2,
  Map,
  Home,
  Building,
  MapPin,
} from "lucide-react";

import styles from "../ProfileForm.module.css";

export default function AddressInformation({
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
            <MapPin size={21} />
          </div>

          <div>
            <h2>Address Information</h2>

            <p>
              Please provide your permanent residential
              address accurately.
            </p>
          </div>
        </div>
      </div>

      {/* ==================================================
          Address Fields
      ================================================== */}

      <div className={styles.grid}>
        {/* ================================================
            Country
        ================================================= */}

        <div className={styles.inputGroup}>
          <label htmlFor="country">
            <Globe size={17} />

            <span>Country</span>
          </label>

          <input
            id="country"
            type="text"
            name="country"
            value={formData.country || ""}
            onChange={handleChange}
          />
        </div>

        {/* ================================================
            State
        ================================================= */}

        <div className={styles.inputGroup}>
          <label htmlFor="state">
            <MapPinned size={17} />

            <span>State</span>
          </label>

          <input
            id="state"
            type="text"
            name="state"
            value={formData.state || ""}
            onChange={handleChange}
            placeholder="State"
          />
        </div>

        {/* ================================================
            District
        ================================================= */}

        <div className={styles.inputGroup}>
          <label htmlFor="district">
            <Landmark size={17} />

            <span>District</span>
          </label>

          <input
            id="district"
            type="text"
            name="district"
            value={formData.district || ""}
            onChange={handleChange}
            placeholder="District"
          />
        </div>

        {/* ================================================
            Assembly
        ================================================= */}

        <div className={styles.inputGroup}>
          <label htmlFor="assembly">
            <Building2 size={17} />

            <span>Assembly</span>
          </label>

          <input
            id="assembly"
            type="text"
            name="assembly"
            value={formData.assembly || ""}
            onChange={handleChange}
            placeholder="Assembly Constituency"
          />
        </div>

        {/* ================================================
            Block
        ================================================= */}

        <div className={styles.inputGroup}>
          <label htmlFor="block">
            <Map size={17} />

            <span>Block</span>
          </label>

          <input
            id="block"
            type="text"
            name="block"
            value={formData.block || ""}
            onChange={handleChange}
            placeholder="Block"
          />
        </div>

        {/* ================================================
            Village
        ================================================= */}

        <div className={styles.inputGroup}>
          <label htmlFor="village">
            <Home size={17} />

            <span>Village</span>
          </label>

          <input
            id="village"
            type="text"
            name="village"
            value={formData.village || ""}
            onChange={handleChange}
            placeholder="Village"
          />
        </div>

        {/* ================================================
            City / Town
        ================================================= */}

        <div className={styles.inputGroup}>
          <label htmlFor="city">
            <Building size={17} />

            <span>City / Town</span>
          </label>

          <input
            id="city"
            type="text"
            name="city"
            value={formData.city || ""}
            onChange={handleChange}
            placeholder="City"
          />
        </div>

        {/* ================================================
            PIN Code
        ================================================= */}

        <div className={styles.inputGroup}>
          <label htmlFor="pincode">
            <MapPin size={17} />

            <span>PIN Code</span>
          </label>

          <input
            id="pincode"
            type="text"
            name="pincode"
            value={formData.pincode || ""}
            onChange={handleChange}
            placeholder="PIN Code"
            inputMode="numeric"
            maxLength={6}
          />
        </div>
      </div>

      {/* ==================================================
          Full Address
      ================================================== */}

      <div className={styles.fullWidthField}>
        <div className={styles.inputGroup}>
          <label htmlFor="address">
            <MapPin size={17} />

            <span>Full Address</span>
          </label>

          <textarea
            id="address"
            name="address"
            value={formData.address || ""}
            onChange={handleChange}
            rows={5}
            placeholder="Enter your complete address..."
          />
        </div>
      </div>
    </section>
  );
}