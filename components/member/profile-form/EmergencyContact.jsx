"use client";

import styles from "../ProfileForm.module.css";

export default function EmergencyContact({

  formData,

  handleChange,

}) {

  return (

    <section className={styles.section}>

      <div className={styles.sectionHeader}>

        <div>

          <h2>

            Emergency Contact

          </h2>

          <p>

            Provide a trusted person's contact details.

          </p>

        </div>

      </div>

      <div className={styles.grid}>

        {/* Contact Name */}

        <div className={styles.inputGroup}>

          <label>

            Contact Name

          </label>

          <input

            type="text"

            name="emergencyName"

            placeholder="Enter Contact Name"

            value={formData.emergencyName}

            onChange={handleChange}

          />

        </div>

        {/* Relationship */}

        <div className={styles.inputGroup}>

          <label>

            Relationship

          </label>

          <select

            name="relationship"

            value={formData.relationship}

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

            <option value="Brother">

              Brother

            </option>

            <option value="Sister">

              Sister

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

            <option value="Friend">

              Friend

            </option>

            <option value="Relative">

              Relative

            </option>

            <option value="Other">

              Other

            </option>

          </select>

        </div>

        {/* Mobile */}

        <div className={styles.inputGroup}>

          <label>

            Emergency Mobile Number

          </label>

          <input

            type="tel"

            name="emergencyMobile"

            placeholder="Enter Mobile Number"

            value={formData.emergencyMobile}

            onChange={handleChange}

          />

        </div>

      </div>

    </section>

  );

}