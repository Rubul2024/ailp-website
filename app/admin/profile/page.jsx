"use client";

import { useEffect, useState } from "react";

import styles from "./Profile.module.css";

export default function ProfilePage() {
  const [admin, setAdmin] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      setLoading(true);

      setError("");

      const response = await fetch("/api/admin/profile", {
        credentials: "include",
      });

      const data = await response.json();

      if (!data.success) {
        setError(data.message);

        return;
      }

      setAdmin(data.admin);
    } catch {
      setError("Unable to load profile.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className={styles.loading}>
        <h2>Loading Profile...</h2>
      </div>
    );
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.title}>
          <h1>My Profile</h1>

          <p>View administrator information</p>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.profileTop}>
          <div className={styles.avatar}>
            {admin.name?.charAt(0).toUpperCase()}
          </div>

          <div className={styles.info}>
            <h2>{admin.name}</h2>

            <p>{admin.email}</p>
          </div>
        </div>

        <div className={styles.grid}>
          <div className={styles.group}>
            <label>Name</label>

            <input className={styles.input} value={admin.name} readOnly />
          </div>

          <div className={styles.group}>
            <label>Email</label>

            <input className={styles.input} value={admin.email} readOnly />
          </div>

          <div className={styles.group}>
            <label>Role</label>

            <input className={styles.input} value="Administrator" readOnly />
          </div>

          <div className={styles.group}>
            <label>Status</label>

            <input className={styles.input} value="Active" readOnly />
          </div>
        </div>

        <div className={styles.footer}>
          <button className={styles.button}>Edit Profile</button>
        </div>
      </div>
    </div>
  );
}
