"use client";

/* ==========================================================
   Member Dashboard
   All India Labour Party
   Production Ready
========================================================== */

import { useEffect, useState } from "react";

import styles from "./Dashboard.module.css";

/* ==========================================================
   Dashboard Components
========================================================== */

import WelcomeBanner from "@/components/member/dashboard/WelcomeBanner";

import DashboardStats from "@/components/member/dashboard/DashboardStats";

import ProfileCompletion from "@/components/member/dashboard/ProfileCompletion";

import QuickActions from "@/components/member/dashboard/QuickActions";

import RecentActivity from "@/components/member/dashboard/RecentActivity";

import LatestAnnouncements from "@/components/member/dashboard/LatestAnnouncements";

import Notifications from "@/components/member/dashboard/Notifications";

import DonationSummary from "@/components/member/dashboard/DonationSummary";

export default function MemberDashboard() {
  const [member, setMember] = useState(null);

  const [loading, setLoading] = useState(true);

  /* ==========================================================
     Load Member
  ========================================================== */

  useEffect(() => {
    loadMember();
  }, []);

  async function loadMember() {
    try {
      const response = await fetch(
        "/api/member/me",
        {
          credentials: "include",
        }
      );

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

  if (!member) {
    return (
      <div className={styles.error}>
        Unable to load dashboard.
      </div>
    );
  }

  /* ==========================================================
     Dashboard
  ========================================================== */

  return (
    <div className={styles.dashboard}>
      {/* ==========================================
          Welcome Banner
      ========================================== */}

      <WelcomeBanner member={member} />

      {/* ==========================================
          Statistics
      ========================================== */}

      <DashboardStats member={member} />

      {/* ==========================================
          Dashboard Grid
      ========================================== */}

      <div className={styles.dashboardGrid}>
        {/* ==========================================
            Left Column
        ========================================== */}

        <div className={styles.leftColumn}>
          <QuickActions />

          <RecentActivity member={member} />

          <LatestAnnouncements />
        </div>

        {/* ==========================================
            Right Column
        ========================================== */}

        <div className={styles.rightColumn}>
          <ProfileCompletion member={member} />

          <DonationSummary member={member} />

          <Notifications member={member} />
        </div>
      </div>
    </div>
  );
}