"use client";

/* ==========================================================
   Member Header
   All India Labour Party
   Production Ready
========================================================== */

import { useState } from "react";

import { useRouter } from "next/navigation";

import {
  Menu,
  Search,
  Bell,
  UserCircle2,
  ChevronDown,
  CalendarDays,
} from "lucide-react";

import styles from "./MemberHeader.module.css";

export default function MemberHeader({ memberName = "Member", onMenuClick }) {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  /* ==========================================================
     Logout
  ========================================================== */

  async function handleLogout() {
    try {
      await fetch("/api/member/logout", {
        method: "POST",
        credentials: "include",
      });

      router.push("/member/login");

      router.refresh();
    } catch (error) {
      console.error(error);

      alert("Logout failed.");
    }
  }

  /* ==========================================================
     Navigation
  ========================================================== */

  function goTo(path) {
    setOpen(false);

    router.push(path);
  }

  return (
    <header className={styles.header}>
      {/* ==========================================
          Left
      ========================================== */}

      <div className={styles.left}>
  <button
  className={styles.mobileButton}
  onClick={() => {
    console.log("MENU CLICKED");
    onMenuClick?.();
  }}
>
  <Menu size={24} />
</button>

        <div>
          <h1>
            Welcome, <span>{memberName}</span>
          </h1>

          <div className={styles.date}>
            <CalendarDays size={16} />

            {today}
          </div>
        </div>
      </div>

      {/* ==========================================
          Search
      ========================================== */}

      <div className={styles.searchBox}>
        <Search size={18} />

        <input type="text" placeholder="Search..." />
      </div>

      {/* ==========================================
          Right
      ========================================== */}

      <div className={styles.right}>
        {/* Notification */}

        <button className={styles.notification}>
          <Bell size={20} />

          <span className={styles.badge}>3</span>
        </button>

        {/* Profile */}

        <div className={styles.profile}>
          <button
            className={styles.profileButton}
            onClick={() => setOpen(!open)}
          >
            <UserCircle2 size={42} />

            <div>
              <strong>{memberName}</strong>

              <small>AILP Member</small>
            </div>

            <ChevronDown size={18} />
          </button>

          {open && (
            <div className={styles.dropdown}>
              <button onClick={() => goTo("/member/profile")}>
                My Profile
              </button>

              <button onClick={() => goTo("/member/card")}>
                Membership Card
              </button>

              <button onClick={() => goTo("/member/settings")}>Settings</button>

              <button className={styles.logout} onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
