"use client";

import styles from "../ProfileForm.module.css";

export default function BasicInformation({

  formData,

}) {

  return (

    <section className={styles.section}>

      <div className={styles.sectionHeader}>

        <div>

          <h2>

            Basic Information

          </h2>

          <p>

            These details are taken from your registration
            and cannot be edited here.

          </p>

        </div>

      </div>

      <div className={styles.grid}>

        {/* Full Name */}

        <div className={styles.inputGroup}>

          <label>

            Full Name

          </label>

          <input

            type="text"

            value={formData.fullName}

            disabled

            className={styles.readOnlyInput}

          />

        </div>

        {/* Email */}

        <div className={styles.inputGroup}>

          <label>

            Email Address

          </label>

          <input

            type="email"

            value={formData.email}

            disabled

            className={styles.readOnlyInput}

          />

        </div>

        {/* Mobile */}

        <div className={styles.inputGroup}>

          <label>

            Mobile Number

          </label>

          <input

            type="text"

            value={formData.mobile}

            disabled

            className={styles.readOnlyInput}

          />

        </div>

      </div>

    </section>

  );

}