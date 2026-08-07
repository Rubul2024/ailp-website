"use client";

import styles from "../ProfileForm.module.css";

export default function PersonalInformation({

  formData,

  handleChange,

}) {

  return (

    <section className={styles.section}>

      <div className={styles.sectionHeader}>

        <div>

          <h2>

            Personal Information

          </h2>

          <p>

            Please provide your personal details
            carefully.

          </p>

        </div>

      </div>

      <div className={styles.grid}>

        {/* Father Name */}

        <div className={styles.inputGroup}>

          <label>

            Father's Name

          </label>

          <input

            type="text"

            name="fatherName"

            placeholder="Enter Father's Name"

            value={formData.fatherName}

            onChange={handleChange}

          />

        </div>

        {/* Mother Name */}

        <div className={styles.inputGroup}>

          <label>

            Mother's Name

          </label>

          <input

            type="text"

            name="motherName"

            placeholder="Enter Mother's Name"

            value={formData.motherName}

            onChange={handleChange}

          />

        </div>

        {/* Date of Birth */}

        <div className={styles.inputGroup}>

          <label>

            Date of Birth

          </label>

          <input

            type="date"

            name="dateOfBirth"

            value={formData.dateOfBirth}

            onChange={handleChange}

          />

        </div>

        {/* Gender */}

        <div className={styles.inputGroup}>

          <label>

            Gender

          </label>

          <select

            name="gender"

            value={formData.gender}

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

          </select>

        </div>

      </div>

    </section>

  );

}