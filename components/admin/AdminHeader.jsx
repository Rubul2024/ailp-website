"use client";

import { useEffect, useRef, useState } from "react";

import { useRouter } from "next/navigation";

import {
  Bell,
  Search,
  UserCircle2,
  ChevronDown,
  LogOut,
  Settings,
  User,
  ShieldCheck,
} from "lucide-react";

import styles from "./AdminHeader.module.css";

export default function AdminHeader({
  title = "Admin Panel",
  subtitle = "All India Labour Party",
}) {
  const router = useRouter();

  const dropdownRef = useRef(null);

  const [open, setOpen] = useState(false);

  const [admin, setAdmin] = useState(null);

  const [loading, setLoading] = useState(true);

  const [loggingOut, setLoggingOut] = useState(false);

  /* ==========================================================
     LOAD CURRENT ADMIN
  ========================================================== */

  useEffect(() => {
    async function loadAdmin() {
      try {
        const response = await fetch("/api/admin/me", {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        });

        const data = await response.json();

        if (response.ok && data.success) {
          setAdmin(data.admin);
        }
      } catch (error) {
        console.error("Unable to load admin:", error);
      } finally {
        setLoading(false);
      }
    }

    loadAdmin();
  }, []);

  /* ==========================================================
     CLOSE DROPDOWN WHEN CLICKING OUTSIDE
  ========================================================== */

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  /* ==========================================================
     LOGOUT
  ========================================================== */

  async function handleLogout() {
    if (loggingOut) {
      return;
    }

    try {
      setLoggingOut(true);

      const response = await fetch(
        "/api/admin/logout",
        {
          method: "POST",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (data.success) {
        setOpen(false);

        router.replace("/admin/login");

        router.refresh();
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error(
        "Admin logout error:",
        error
      );
    } finally {
      setLoggingOut(false);
    }
  }

  /* ==========================================================
     FORMAT ROLE
  ========================================================== */

  function formatRole(role) {
    if (!role) {
      return "Administrator";
    }

    if (role === "super-admin") {
      return "Super Admin";
    }

    return "Administrator";
  }

  /* ==========================================================
     ADMIN DISPLAY DATA
  ========================================================== */

  const adminName =
    admin?.name || "Administrator";

  const adminEmail =
    admin?.email || "";

  const adminRole =
    formatRole(admin?.role);

  return (
    <header className={styles.header}>
      {/* ====================================================
          LEFT
      ==================================================== */}

      <div className={styles.left}>
        <div className={styles.titleWrapper}>
          <h1>{title}</h1>

          <p>{subtitle}</p>
        </div>
      </div>

      {/* ====================================================
          CENTER SEARCH
      ==================================================== */}

      <div className={styles.center}>
        <div className={styles.searchBox}>
          <Search
            size={18}
            className={styles.searchIcon}
          />

          <input
            type="text"
            placeholder="Search members, donations..."
            className={styles.searchInput}
            aria-label="Search admin panel"
          />
        </div>
      </div>

      {/* ====================================================
          RIGHT
      ==================================================== */}

      <div className={styles.right}>
        {/* ==================================================
            NOTIFICATIONS
        ================================================== */}

        <button
          type="button"
          className={styles.notification}
          aria-label="Notifications"
        >
          <Bell size={20} />

          <span className={styles.dot}></span>
        </button>

        {/* ==================================================
            PROFILE
        ================================================== */}

        <div
          className={styles.profile}
          ref={dropdownRef}
        >
          <button
            type="button"
            className={styles.profileButton}
            onClick={() => setOpen(!open)}
            aria-label="Open administrator menu"
            aria-expanded={open}
          >
            {admin?.avatar ? (
              <img
                src={admin.avatar}
                alt={adminName}
                className={styles.avatar}
              />
            ) : (
              <UserCircle2 size={42} />
            )}

            <ChevronDown
              size={18}
              className={
                open
                  ? styles.chevronOpen
                  : ""
              }
            />
          </button>

          {/* ==================================================
              DROPDOWN
          ================================================== */}

          {open && (
            <div className={styles.dropdown}>
              {/* ==================================================
                  PROFILE HEADER
              ================================================== */}

              <div className={styles.dropdownHeader}>
                <div className={styles.dropdownAvatar}>
                  {admin?.avatar ? (
                    <img
                      src={admin.avatar}
                      alt={adminName}
                    />
                  ) : (
                    <UserCircle2 size={34} />
                  )}
                </div>

                <div className={styles.adminInfo}>
                  <strong>
                    {loading
                      ? "Loading..."
                      : adminName}
                  </strong>

                  <span>
                    {loading
                      ? "Please wait..."
                      : adminEmail}
                  </span>

                  {!loading && admin?.role && (
                    <small>
                      <ShieldCheck size={13} />

                      {adminRole}
                    </small>
                  )}
                </div>
              </div>

              {/* ==================================================
                  MY PROFILE
              ================================================== */}

              <button
                type="button"
                className={styles.dropdownItem}
                onClick={() => {
                  router.push(
                    "/admin/profile"
                  );

                  setOpen(false);
                }}
              >
                <User size={18} />

                <span>My Profile</span>
              </button>

              {/* ==================================================
                  SETTINGS
              ================================================== */}

              <button
                type="button"
                className={styles.dropdownItem}
                onClick={() => {
                  router.push(
                    "/admin/settings"
                  );

                  setOpen(false);
                }}
              >
                <Settings size={18} />

                <span>Settings</span>
              </button>

              {/* ==================================================
                  LOGOUT
              ================================================== */}

              <button
                type="button"
                className={`${styles.dropdownItem} ${styles.logoutItem}`}
                onClick={handleLogout}
                disabled={loggingOut}
              >
                <LogOut size={18} />

                <span>
                  {loggingOut
                    ? "Logging out..."
                    : "Logout"}
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}