"use client";

import { useEffect, useRef, useState } from "react";

import Link from "next/link";
import Image from "next/image";

import {
  Search,
  Bell,
  ChevronDown,
  User,
  CreditCard,
  Settings,
  LogOut,
} from "lucide-react";

import styles from "./Header.module.css";

export default function Header() {
  const [dashboard, setDashboard] = useState(null);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [showDropdown, setShowDropdown] = useState(false);

  const dropdownRef = useRef(null);

  /* ==========================================================
     Load Dashboard Data
  ========================================================== */

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      const response = await fetch(
        "/api/member/dashboard",
        {
          credentials: "include",
        }
      );

      const data = await response.json();

      if (data.success) {
        setDashboard(data.dashboard);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  /* ==========================================================
     Close Dropdown
  ========================================================== */

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
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
     Logout
  ========================================================== */

  async function handleLogout() {
    try {
      await fetch("/api/member/logout", {
        method: "POST",
      });

      window.location.href = "/member/login";
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <header className={styles.header}>
      {/* ==========================================
          Left
      ========================================== */}

      <div className={styles.left}>
        <h1>Member Dashboard</h1>

        <p>
          Welcome back
          {dashboard?.fullName
            ? `, ${dashboard.fullName}`
            : ""}
        </p>
      </div>

      {/* ==========================================
          Search
      ========================================== */}

      <div className={styles.searchBox}>
        <Search size={18} />

        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
        />
      </div>

      {/* ==========================================
          Right
      ========================================== */}

      <div className={styles.right}>
        {/* Notification */}

        <button className={styles.notification}>
          <Bell size={22} />

          <span className={styles.badge}>
            3
          </span>
        </button>

        {/* Profile */}

        <div
          className={styles.profileWrapper}
          ref={dropdownRef}
        >
          <button
            className={styles.profileButton}
            onClick={() =>
              setShowDropdown(
                !showDropdown
              )
            }
          >
            <Image
              src={
                dashboard?.photo?.url ||
                "/images/avatar.png"
              }
              alt="Member"
              width={46}
              height={46}
              className={styles.avatar}
            />

            <div className={styles.profileInfo}>
              <h4>
                {loading
                  ? "Loading..."
                  : dashboard?.fullName}
              </h4>

              <span>
                {dashboard?.membershipId ||
                  "New Member"}
              </span>
            </div>

            <ChevronDown size={18} />
          </button>

          {showDropdown && (
            <div className={styles.dropdown}>
              <Link href="/member/profile">
                <User size={18} />
                My Profile
              </Link>

              <Link href="/member/card">
                <CreditCard size={18} />
                Membership Card
              </Link>

              <Link href="/member/settings">
                <Settings size={18} />
                Settings
              </Link>

              <hr />

              <button
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