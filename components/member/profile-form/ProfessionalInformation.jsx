"use client";

import styles from "../ProfileForm.module.css";

export default function ProfessionalInformation({

  formData,

  handleChange,

}) {

  return (

    <section className={styles.section}>

      <div className={styles.sectionHeader}>

        <div>

          <h2>

            Professional Information

          </h2>

          <p>

            Tell us about your educational and professional background.

          </p>

        </div>

      </div>

      <div className={styles.grid}>

        {/* Occupation */}

        <div className={styles.inputGroup}>

          <label>

            Occupation

          </label>

          <input

            type="text"

            name="occupation"

            placeholder="Enter Occupation"

            value={formData.occupation}

            onChange={handleChange}

          />

        </div>

        {/* Education */}

        <div className={styles.inputGroup}>

          <label>

            Highest Qualification

          </label>

          <input

            type="text"

            name="education"

            placeholder="Enter Highest Qualification"

            value={formData.education}

            onChange={handleChange}

          />

        </div>

        {/* Blood Group */}

        <div className={styles.inputGroup}>

          <label>

            Blood Group

          </label>

          <select

            name="bloodGroup"

            value={formData.bloodGroup}

            onChange={handleChange}

          >

            <option value="">

              Select Blood Group

            </option>

            <option value="A+">A+</option>

            <option value="A-">A-</option>

            <option value="B+">B+</option>

            <option value="B-">B-</option>

            <option value="AB+">AB+</option>

            <option value="AB-">AB-</option>

            <option value="O+">O+</option>

            <option value="O-">O-</option>

          </select>

        </div>

      </div>

    </section>

  );

}