"use client";

import { useEffect, useRef, useState } from "react";

import { useRouter } from "next/navigation";

import {
  Bell,
  Search,
  UserCircle2,
  ChevronDown,
  LogOut,
  User,
  ShieldCheck,
  Menu,
  Inbox,
  CheckCheck,
} from "lucide-react";

import styles from "./AdminHeader.module.css";

export default function AdminHeader({
  title = "Admin Panel",
  subtitle = "All India Labour Party",
  onMenuClick,
}) {
  const router = useRouter();

  const dropdownRef = useRef(null);
  const notifRef = useRef(null);

  const [open, setOpen] = useState(false);

  const [admin, setAdmin] = useState(null);

  const [loading, setLoading] = useState(true);

  const [loggingOut, setLoggingOut] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  const [notifOpen, setNotifOpen] = useState(false);
  const [notifLoading, setNotifLoading] = useState(true);
  const [notifications, setNotifications] = useState({ total: 0, items: [] });

  /* ==========================================================
     LOAD NOTIFICATIONS
  ========================================================== */

  useEffect(() => {
    async function loadNotifications() {
      try {
        const response = await fetch("/api/admin/notifications", {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        });

        const data = await response.json();

        if (response.ok && data.success) {
          setNotifications({ total: data.total || 0, items: data.items || [] });
        }
      } catch (error) {
        console.error("Unable to load notifications:", error);
      } finally {
        setNotifLoading(false);
      }
    }

    loadNotifications();
  }, []);

  /* ==========================================================
     SEARCH
  ========================================================== */

  function handleSearchSubmit(event) {
    event.preventDefault();

    const query = searchQuery.trim();
    if (!query) return;

    router.push(`/admin/members?search=${encodeURIComponent(query)}`);
  }

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
        } else if (response.status === 401 || response.status === 403) {
          router.replace("/admin/login");
        }
      } catch (error) {
        console.error("Unable to load admin:", error);
      } finally {
        setLoading(false);
      }
    }

    loadAdmin();
  }, [router]);

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

      if (
        notifRef.current &&
        !notifRef.current.contains(event.target)
      ) {
        setNotifOpen(false);
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
        <button
          type="button"
          className={styles.menuButton}
          onClick={onMenuClick}
          aria-label="Toggle navigation menu"
        >
          <Menu size={22} />
        </button>

        <div className={styles.titleWrapper}>
          <h1>{title}</h1>

          <p>{subtitle}</p>
        </div>
      </div>

      {/* ====================================================
          CENTER SEARCH
      ==================================================== */}

      <div className={styles.center}>
        <form className={styles.searchBox} onSubmit={handleSearchSubmit}>
          <Search
            size={18}
            className={styles.searchIcon}
          />

          <input
            type="text"
            placeholder="Search members by name, ID, phone..."
            className={styles.searchInput}
            aria-label="Search members"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
      </div>

      {/* ====================================================
          RIGHT
      ==================================================== */}

      <div className={styles.right}>
        {/* ==================================================
            NOTIFICATIONS
        ================================================== */}

        <div className={styles.notifWrapper} ref={notifRef}>
          <button
            type="button"
            className={styles.notification}
            aria-label="Notifications"
            aria-expanded={notifOpen}
            onClick={() => setNotifOpen((prev) => !prev)}
          >
            <Bell size={20} />

            {notifications.total > 0 && (
              <span className={styles.dot}></span>
            )}
          </button>

          {notifOpen && (
            <div className={styles.notifDropdown}>
              <div className={styles.notifHeader}>
                <strong>Notifications</strong>
                {notifications.total > 0 && (
                  <span className={styles.notifCount}>{notifications.total}</span>
                )}
              </div>

              <div className={styles.notifList}>
                {notifLoading ? (
                  <div className={styles.notifEmpty}>Loading...</div>
                ) : notifications.items.length > 0 ? (
                  notifications.items.map((item) => (
                    <button
                      type="button"
                      key={item.type}
                      className={styles.notifItem}
                      onClick={() => {
                        router.push(item.href);
                        setNotifOpen(false);
                      }}
                    >
                      <Inbox size={16} />
                      <span>{item.label}</span>
                    </button>
                  ))
                ) : (
                  <div className={styles.notifEmpty}>
                    <CheckCheck size={18} />
                    <span>You're all caught up.</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

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