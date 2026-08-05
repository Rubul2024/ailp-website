"use client";

import styles from "./Subscribe.module.css";

export default function Subscribe() {
  return (
    <section className={styles.subscribe}>
      <div className={styles.container}>

        {/* Left */}

        <div className={styles.left}>

          <span className={styles.badge}>
            STAY CONNECTED
          </span>

          <h2>
            Stay Updated With
            <br />
            AILP News
          </h2>

          <p>
            Subscribe to receive important announcements,
            campaign updates, worker welfare initiatives,
            upcoming events and the latest news directly
            in your inbox.
          </p>

        </div>

        {/* Right */}

        <div className={styles.right}>

          <form className={styles.form}>

            <div className={styles.inputWrapper}>

              <span className={styles.icon}>
                📧
              </span>

              <input
                type="email"
                placeholder="Enter your email address"
              />

            </div>

            <button type="submit">
              Subscribe →
            </button>

          </form>

          <div className={styles.trust}>

            <span>✔ Weekly Updates</span>

            <span>✔ No Spam</span>

            <span>✔ Unsubscribe Anytime</span>

          </div>

        </div>

      </div>
    </section>
  );
}