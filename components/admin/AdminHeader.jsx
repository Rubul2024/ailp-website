"use client";

import { useEffect, useRef, useState } from "react";

import { useRouter } from "next/navigation";

import {
  Bell,
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

  const notifRef = useRef(null);

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
     VERIFY SESSION IS STILL VALID
     (catches an expired/deactivated admin and signs them out,
     even though no admin identity is displayed in this header)
  ========================================================== */

  useEffect(() => {
    async function verifySession() {
      try {
        const response = await fetch("/api/admin/me", {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        });

        if (response.status === 401 || response.status === 403) {
          router.replace("/admin/login");
        }
      } catch (error) {
        console.error("Unable to verify admin session:", error);
      }
    }

    verifySession();
  }, [router]);

  /* ==========================================================
     CLOSE NOTIFICATIONS WHEN CLICKING OUTSIDE
  ========================================================== */

  useEffect(() => {
    function handleClickOutside(event) {
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
      </div>
    </header>
  );
}
