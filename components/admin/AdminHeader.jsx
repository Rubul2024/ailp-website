"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import {
  Bell,
  Search,
  UserCircle2,
  ChevronDown,
  LogOut,
  Settings,
  User,
} from "lucide-react";

import styles from "./AdminHeader.module.css";

export default function AdminHeader() {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  /* ==========================================
     Logout
  ========================================== */

  async function handleLogout() {
    try {
      const response = await fetch(
        "/api/admin/logout",

        {
          method: "POST",

          credentials: "include",
        },
      );

      const data = await response.json();

      if (data.success) {
        router.replace("/admin/login");

        router.refresh();
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <header className={styles.header}>
      {/* Left */}

      <div className={styles.left}>
        <div>
          <h1>Dashboard</h1>

          <p>Welcome back, Administrator</p>
        </div>
      </div>

      {/* Center */}

      <div className={styles.center}>
        <div className={styles.searchBox}>
          <Search size={18} className={styles.searchIcon} />

          <input
            type="text"
            placeholder="Search members, donations..."
            className={styles.searchInput}
          />
        </div>
      </div>

      {/* Right */}

      <div className={styles.right}>
        <button className={styles.notification}>
          <Bell size={20} />

          <span className={styles.dot}></span>
        </button>

        <div className={styles.profile}>
          <button
            className={styles.profileButton}
            onClick={() => setOpen(!open)}
          >
            <UserCircle2 size={42} />

            <ChevronDown size={18} />
          </button>

          {open && (
            <div className={styles.dropdown}>
              <div className={styles.dropdownHeader}>
                <strong>Administrator</strong>

                <span>admin@ailp.in</span>
              </div>

              <button
                className={styles.dropdownItem}
                onClick={() => {
                  router.push("/admin/profile");

                  setOpen(false);
                }}
              >
                <User size={18} />
                My Profile
              </button>

              <button
                className={styles.dropdownItem}
                onClick={() => {
                  router.push("/admin/setting");

                  setOpen(false);
                }}
              >
                <Settings size={18} />
                Settings
              </button>

              <button
                className={`${styles.dropdownItem} ${styles.logoutItem}`}
                onClick={handleLogout}
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
