"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  const dropdownRef = useRef(null);

  const [member, setMember] = useState(null);

  const [loading, setLoading] = useState(true);

  const [showDropdown, setShowDropdown] = useState(false);

  const [search, setSearch] = useState("");

  /* ==========================================================
     Load Member
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
     Close Dropdown
  ========================================================== */

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }

    function handleEscape(event) {
      if (event.key === "Escape") {
        setShowDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);

      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

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
    }
  }

  return (
    <header className={styles.header}>
      {/* Left */}

      <div className={styles.left}>
        <h1>Member Dashboard</h1>

        <p>
          Welcome back
          {member ? `, ${member.fullName}` : ""}
        </p>
      </div>

      {/* Search */}

      <div className={styles.searchBox}>
        <Search size={18} />

        <input
          type="text"
          placeholder="Search dashboard..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      {/* Right */}

      <div className={styles.right} ref={dropdownRef}>
        {/* Notification */}

        <button className={styles.notification}>
          <Bell size={22} />

          <span className={styles.badge}>3</span>
        </button>

        {/* Profile */}

        <button
          className={styles.profileButton}
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <Image
            src={member?.photo?.url || "/images/avatar.png"}
            alt="Member"
            width={46}
            height={46}
            className={styles.avatar}
          />

          <div className={styles.profileInfo}>
            <h4>{loading ? "Loading..." : member?.fullName}</h4>

            <span>{member?.membershipId || "Membership Pending"}</span>
          </div>

          <ChevronDown size={18} />
        </button>

        {/* Dropdown */}

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

            <button onClick={handleLogout}>
              <LogOut size={18} />
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
