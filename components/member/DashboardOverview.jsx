"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import {
  User,
  BadgeCheck,
  CreditCard,
  IndianRupee,
  CalendarDays,
  ShieldCheck,
  Download,
  RefreshCw,
} from "lucide-react";

import styles from "./DashboardOverview.module.css";

export default function DashboardOverview() {
  const [loading, setLoading] = useState(true);

  const [dashboard, setDashboard] = useState(null);

  const [error, setError] = useState("");

  /* ==========================================================
     Load Dashboard
  ========================================================== */

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      setLoading(true);

      const response = await fetch(
        "/api/member/dashboard",
        {
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!data.success) {
        setError(data.message);
        return;
      }

      setDashboard(data.dashboard);
    } catch (error) {
      console.error(error);

      setError("Unable to load dashboard.");
    } finally {
      setLoading(false);
    }
  }

  /* ==========================================================
     Loading
  ========================================================== */

  if (loading) {
    return (
      <div className={styles.loading}>
        Loading Dashboard...
      </div>
    );
  }

  /* ==========================================================
     Error
  ========================================================== */

  if (error) {
    return (
      <div className={styles.error}>
        {error}
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      {/* ==========================================
          Statistics Cards
      ========================================== */}

      <div className={styles.grid}>
        {/* Member */}

        <div className={styles.card}>
          <User size={34} />

          <h4>Member</h4>

          <h3>{dashboard.fullName}</h3>
        </div>

        {/* Membership */}

        <div className={styles.card}>
          <BadgeCheck size={34} />

          <h4>Membership ID</h4>

          <h3>
            {dashboard.membershipId || "Pending"}
          </h3>
        </div>

        {/* Status */}

        <div className={styles.card}>
          <ShieldCheck size={34} />

          <h4>Status</h4>

          <h3>
            {dashboard.membershipStatus}
          </h3>
        </div>

        {/* Donation */}

        <div className={styles.card}>
          <IndianRupee size={34} />

          <h4>Total Donation</h4>

          <h3>
            ₹
            {dashboard.totalDonation?.toLocaleString()}
          </h3>
        </div>
      </div>

      {/* ==========================================
          Information
      ========================================== */}

      <div className={styles.infoSection}>
        <div className={styles.infoCard}>
          <h3>Membership Details</h3>

          <div className={styles.row}>
            <span>Profile Completed</span>

            <strong>
              {dashboard.profileCompleted
                ? "Yes"
                : "No"}
            </strong>
          </div>

          <div className={styles.row}>
            <span>Completion</span>

            <strong>
              {dashboard.profilePercentage}%
            </strong>
          </div>

          <div className={styles.row}>
            <span>Card Generated</span>

            <strong>
              {dashboard.cardGenerated
                ? "Yes"
                : "No"}
            </strong>
          </div>

          <div className={styles.row}>
            <span>Verified</span>

            <strong>
              {dashboard.verified
                ? "Verified"
                : "Pending"}
            </strong>
          </div>

          <div className={styles.row}>
            <span>Join Date</span>

            <strong>
              {dashboard.joinDate
                ? new Date(
                    dashboard.joinDate
                  ).toLocaleDateString()
                : "--"}
            </strong>
          </div>
        </div>

        {/* ==========================================
            Quick Actions
        ========================================== */}

        <div className={styles.infoCard}>
          <h3>Quick Actions</h3>

          <div className={styles.actions}>
            <Link href="/member/profile">
              Edit Profile
            </Link>

            <Link href="/member/card">
              View Membership Card
            </Link>

            <Link href="/member/donation">
              Make Donation
            </Link>

            {dashboard.cardGenerated && (
              <a
                href={dashboard.cardUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download size={18} />

                Download Card
              </a>
            )}

            <button
              onClick={loadDashboard}
            >
              <RefreshCw size={18} />

              Refresh Dashboard
            </button>
          </div>
        </div>
      </div>

      {/* ==========================================
          Donation Summary
      ========================================== */}

      <div className={styles.summary}>
        <div className={styles.summaryCard}>
          <CreditCard size={32} />

          <h4>Total Donations</h4>

          <h2>
            {dashboard.donationCount}
          </h2>
        </div>

        <div className={styles.summaryCard}>
          <IndianRupee size={32} />

          <h4>Highest Donation</h4>

          <h2>
            ₹
            {dashboard.highestDonation?.toLocaleString()}
          </h2>
        </div>

        <div className={styles.summaryCard}>
          <CalendarDays size={32} />

          <h4>Last Donation</h4>

          <h2>
            {dashboard.lastDonation
              ? new Date(
                  dashboard.lastDonation
                ).toLocaleDateString()
              : "--"}
          </h2>
        </div>
      </div>
    </div>
  );
}