"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User,
  CreditCard,
  Settings,
  LogOut,
  ChevronDown,
  Bell,
  Search,
  Calendar,
  ShieldCheck,
} from "lucide-react";
import styles from "./MemberHeader.module.css";

export default function MemberHeader({ member }) {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      router.push("/member/login");
      router.refresh();
    } catch {
      router.push("/member/login");
    }
  };

  const currentDate = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const memberName = member?.fullName || "Member";
  const memberInitials = memberName
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <header className={styles.topHeader}>
      {/* Left: Greeting & Live Date */}
      <div className={styles.headerLeft}>
        <h2 className={styles.pageTitle}>
          Welcome, <span className={styles.blueAccent}>{memberName}</span>
        </h2>
        <div className={styles.dateRow}>
          <Calendar size={13} />
          <span>{currentDate}</span>
        </div>
      </div>

      {/* Middle: Universal Search Bar */}
      <div className={styles.searchContainer}>
        <Search size={16} className={styles.searchIcon} />
        <input
          type="text"
          placeholder="Search portal, announcements, schemes..."
          className={styles.searchInput}
        />
      </div>

      {/* Right: Notifications & Controlled Profile Menu */}
      <div className={styles.headerRight}>
        {/* Notification Bell */}
        <button type="button" className={styles.bellBtn} title="Notifications">
          <Bell size={18} />
          <span className={styles.badgeCount}>3</span>
        </button>

        {/* User Dropdown Trigger */}
        <div className={styles.userMenuWrapper} ref={dropdownRef}>
          <button
            type="button"
            className={`${styles.userPillBtn} ${dropdownOpen ? styles.pillActive : ""}`}
            onClick={() => setDropdownOpen((prev) => !prev)}
          >
            <div className={styles.avatarCircle}>
              {member?.photo ? (
                <img src={member.photo} alt={memberName} className={styles.avatarImg} />
              ) : (
                <span>{memberInitials || "M"}</span>
              )}
            </div>
            <div className={styles.userInfo}>
              <span className={styles.userName}>{memberName}</span>
              <span className={styles.userRole}>AILP Member</span>
            </div>
            <ChevronDown
              size={15}
              className={`${styles.chevron} ${dropdownOpen ? styles.chevronRotated : ""}`}
            />
          </button>

          {/* Controlled Floating Menu */}
          {dropdownOpen && (
            <div className={styles.dropdownMenu}>
              <div className={styles.dropdownHeader}>
                <strong>{memberName}</strong>
                <span className={styles.memberIdText}>
                  <ShieldCheck size={12} /> {member?.membershipId || "AILP Member"}
                </span>
              </div>

              <div className={styles.dropdownLinks}>
                <Link
                  href="/member/profile"
                  className={styles.menuItem}
                  onClick={() => setDropdownOpen(false)}
                >
                  <User size={15} />
                  <span>My Profile</span>
                </Link>

                <Link
                  href="/member/card"
                  className={styles.menuItem}
                  onClick={() => setDropdownOpen(false)}
                >
                  <CreditCard size={15} />
                  <span>Membership Card</span>
                </Link>

                <Link
                  href="/member/settings"
                  className={styles.menuItem}
                  onClick={() => setDropdownOpen(false)}
                >
                  <Settings size={15} />
                  <span>Settings</span>
                </Link>
              </div>

              <div className={styles.dropdownFooter}>
                <button
                  type="button"
                  className={styles.logoutBtn}
                  onClick={handleLogout}
                >
                  <LogOut size={15} />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}