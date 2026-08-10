"use client";

/* ==========================================================
   Member Settings Page
   All India Labour Party
   Production Ready
========================================================== */

import styles from "./Settings.module.css";

import {
  User,
  ShieldCheck,
  Bell,
  TriangleAlert,
} from "lucide-react";

export default function SettingsPage() {
  return (
    <div className={styles.page}>
      {/* ==========================================
          Header
      ========================================== */}

      <div className={styles.header}>
        <h1>Settings</h1>

        <p>
          Manage your account, security,
          notifications and privacy settings.
        </p>
      </div>

      {/* ==========================================
          Settings Cards
      ========================================== */}

      <div className={styles.grid}>
        {/* Account */}

        <div className={styles.card}>
          <div className={styles.icon}>
            <User size={28} />
          </div>

          <div className={styles.content}>
            <h2>Account Settings</h2>

            <p>
              Update your personal
              information and profile
              details.
            </p>

            <button disabled>
              Coming Soon
            </button>
          </div>
        </div>

        {/* Security */}

        <div className={styles.card}>
          <div className={styles.icon}>
            <ShieldCheck size={28} />
          </div>

          <div className={styles.content}>
            <h2>Security</h2>

            <p>
              Change your password and
              improve account security.
            </p>

            <button disabled>
              Coming Soon
            </button>
          </div>
        </div>

        {/* Notifications */}

        <div className={styles.card}>
          <div className={styles.icon}>
            <Bell size={28} />
          </div>

          <div className={styles.content}>
            <h2>Notifications</h2>

            <p>
              Configure email and system
              notification preferences.
            </p>

            <button disabled>
              Coming Soon
            </button>
          </div>
        </div>

        {/* Danger Zone */}

        <div className={styles.card}>
          <div className={styles.iconDanger}>
            <TriangleAlert size={28} />
          </div>

          <div className={styles.content}>
            <h2>Danger Zone</h2>

            <p>
              Logout from all devices and
              manage sensitive account
              actions.
            </p>

            <button
              className={styles.danger}
              disabled
            >
              Coming Soon
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}