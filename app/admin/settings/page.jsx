"use client";

import { useState } from "react";

import styles from "./Setting.module.css";

export default function SettingPage() {

  const [saved, setSaved] = useState(false);

  function handleSubmit(event) {

    event.preventDefault();

    setSaved(true);

    setTimeout(() => {

      setSaved(false);

    }, 3000);

  }

  return (

    <div className={styles.page}>

      <div className={styles.header}>

        <div className={styles.title}>

          <h1>

            Settings

          </h1>

          <p>

            Configure your administration panel.

          </p>

        </div>

      </div>

      <form

        className={styles.card}

        onSubmit={handleSubmit}

      >

        {saved && (

          <div className={styles.success}>

            Settings saved successfully.

          </div>

        )}

        {/* Admin */}

        <div className={styles.section}>

          <h2>

            Administrator

          </h2>

          <div className={styles.grid}>

            <div className={styles.group}>

              <label>

                Name

              </label>

              <input

                className={styles.input}

                defaultValue="Administrator"

              />

            </div>

            <div className={styles.group}>

              <label>

                Email

              </label>

              <input

                className={styles.input}

                defaultValue="admin@ailp.in"

              />

            </div>

          </div>

        </div>

        {/* Password */}

        <div className={styles.section}>

          <h2>

            Change Password

          </h2>

          <div className={styles.grid}>

            <div className={styles.group}>

              <label>

                Current Password

              </label>

              <input

                type="password"

                className={styles.input}

              />

            </div>

            <div className={styles.group}>

              <label>

                New Password

              </label>

              <input

                type="password"

                className={styles.input}

              />

            </div>

          </div>

        </div>

        {/* Website */}

        <div className={styles.section}>

          <h2>

            Website Information

          </h2>

          <div className={styles.grid}>

            <div className={`${styles.group} ${styles.full}`}>

              <label>

                Website Title

              </label>

              <input

                className={styles.input}

                defaultValue="All India Labour Party"

              />

            </div>

            <div className={`${styles.group} ${styles.full}`}>

              <label>

                Website Description

              </label>

              <textarea

                className={`${styles.input} ${styles.textarea}`}

                defaultValue="Official Website of All India Labour Party."

              />

            </div>

          </div>

        </div>

        {/* Security */}

        <div className={styles.section}>

          <h2>

            Security

          </h2>

          <div className={styles.switch}>

            <input

              type="checkbox"

              defaultChecked

            />

            <span>

              Enable Two-Factor Authentication (Future)

            </span>

          </div>

        </div>

        <div className={styles.footer}>

          <button

            className={styles.button}

            type="submit"

          >

            Save Settings

          </button>

        </div>

      </form>

    </div>

  );

}