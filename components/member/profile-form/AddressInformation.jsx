"use client";

import styles from "../ProfileForm.module.css";

export default function AddressInformation({

  formData,

  handleChange,

}) {

  return (

    <section className={styles.section}>

      <div className={styles.sectionHeader}>

        <div>

          <h2>

            Address Information

          </h2>

          <p>

            Enter your permanent residential address.

          </p>

        </div>

      </div>

      <div className={styles.grid}>

        {/* Country */}

        <div className={styles.inputGroup}>

          <label>

            Country

          </label>

          <input

            type="text"

            name="country"

            value={formData.country}

            onChange={handleChange}

          />

        </div>

        {/* State */}

        <div className={styles.inputGroup}>

          <label>

            State

          </label>

          <input

            type="text"

            name="state"

            placeholder="Enter State"

            value={formData.state}

            onChange={handleChange}

          />

        </div>

        {/* District */}

        <div className={styles.inputGroup}>

          <label>

            District

          </label>

          <input

            type="text"

            name="district"

            placeholder="Enter District"

            value={formData.district}

            onChange={handleChange}

          />

        </div>

        {/* Assembly */}

        <div className={styles.inputGroup}>

          <label>

            Assembly

          </label>

          <input

            type="text"

            name="assembly"

            placeholder="Enter Assembly"

            value={formData.assembly}

            onChange={handleChange}

          />

        </div>

        {/* Block */}

        <div className={styles.inputGroup}>

          <label>

            Block

          </label>

          <input

            type="text"

            name="block"

            placeholder="Enter Block"

            value={formData.block}

            onChange={handleChange}

          />

        </div>

        {/* Village */}

        <div className={styles.inputGroup}>

          <label>

            Village

          </label>

          <input

            type="text"

            name="village"

            placeholder="Enter Village"

            value={formData.village}

            onChange={handleChange}

          />

        </div>

        {/* City */}

        <div className={styles.inputGroup}>

          <label>

            City / Town

          </label>

          <input

            type="text"

            name="city"

            placeholder="Enter City"

            value={formData.city}

            onChange={handleChange}

          />

        </div>

        {/* Pincode */}

        <div className={styles.inputGroup}>

          <label>

            PIN Code

          </label>

          <input

            type="text"

            name="pincode"

            placeholder="Enter PIN Code"

            value={formData.pincode}

            onChange={handleChange}

          />

        </div>

      </div>

      <div className={styles.inputGroup}>

        <label>

          Full Address

        </label>

        <textarea

          rows="5"

          name="address"

          placeholder="House No, Road, Landmark..."

          value={formData.address}

          onChange={handleChange}

        />

      </div>

    </section>

  );

}