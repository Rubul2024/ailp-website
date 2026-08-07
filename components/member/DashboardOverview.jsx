"use client";

import { useEffect, useState } from "react";

import {
  User,
  CreditCard,
  BadgeCheck,
  IndianRupee,
  CalendarDays,
  MapPin,
} from "lucide-react";

import styles from "./DashboardOverview.module.css";

export default function DashboardOverview() {
  const [member, setMember] = useState(null);

  const [loading, setLoading] = useState(true);

  /* ==========================================================
     Load Member Information
  ========================================================== */

  useEffect(() => {
    async function loadMember() {
      try {
        const response = await fetch("/api/member/me", {
          credentials: "include",
        });

        const data = await response.json();

        if (data.success) {
          setMember(data.member);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadMember();
  }, []);

  /* ==========================================================
     Profile Completion
  ========================================================== */

  function calculateProfileProgress() {
    if (!member) return 0;

    const fields = [
      member.fullName,
      member.email,
      member.mobile,
      member.membershipId,
      member.photo,
      member.state,
      member.district,
    ];

    const completed = fields.filter(Boolean).length;

    return Math.round((completed / fields.length) * 100);
  }

  const profileProgress = calculateProfileProgress();

  return (
    <div className={styles.wrapper}>
      {/* ==========================================
          Welcome Banner
      ========================================== */}

      <section className={styles.banner}>
        <div>
          <h2>
            Welcome Back{" "}
            {loading
              ? ""
              : `, ${member?.fullName}`}
            👋
          </h2>

          <p>
            Welcome to the All India Labour
            Party Member Portal.
          </p>
        </div>
      </section>

      {/* ==========================================
          Cards
      ========================================== */}

      <section className={styles.grid}>
        {/* Membership ID */}

        <div className={styles.card}>
          <CreditCard
            className={styles.icon}
            size={34}
          />

          <h3>Membership ID</h3>

          <h4>
            {loading
              ? "Loading..."
              : member?.membershipId ||
                "Pending"}
          </h4>
        </div>

        {/* Status */}

        <div className={styles.card}>
          <BadgeCheck
            className={styles.icon}
            size={34}
          />

          <h3>Status</h3>

          <span
            className={styles.status}
          >
            {loading
              ? "Loading..."
              : member?.membershipStatus}
          </span>
        </div>

        {/* Donation */}

        <div className={styles.card}>
          <IndianRupee
            className={styles.icon}
            size={34}
          />

          <h3>Total Donation</h3>

          <h4>
            ₹
            {loading
              ? "0"
              : member?.totalDonation ||
                0}
          </h4>
        </div>

        {/* Join Date */}

        <div className={styles.card}>
          <CalendarDays
            className={styles.icon}
            size={34}
          />

          <h3>Join Date</h3>

          <h4>
            {loading
              ? "Loading..."
              : member?.joinDate
              ? new Date(
                  member.joinDate
                ).toLocaleDateString(
                  "en-IN"
                )
              : "Pending"}
          </h4>
        </div>

        {/* Location */}

        <div className={styles.card}>
          <MapPin
            className={styles.icon}
            size={34}
          />

          <h3>Location</h3>

          <h4>
            {loading
              ? "Loading..."
              : `${member?.district || "-"}, ${
                  member?.state || "-"
                }`}
          </h4>
        </div>

        {/* Profile */}

        <div className={styles.card}>
          <User
            className={styles.icon}
            size={34}
          />

          <h3>Profile Completion</h3>

          <div
            className={
              styles.progressBar
            }
          >
            <div
              className={
                styles.progress
              }
              style={{
                width: `${profileProgress}%`,
              }}
            />
          </div>

          <strong>
            {profileProgress}%
          </strong>
        </div>
      </section>
    </div>
  );
}