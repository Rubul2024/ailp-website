"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import { useRouter } from "next/navigation";

import styles from "./Header.module.css";

export default function HeaderActions() {
  const router = useRouter();

  const [loggedIn, setLoggedIn] = useState(false);

  /* ==========================================================
     Check Member Login
  ========================================================== */

  useEffect(() => {
    checkMember();
  }, []);

  async function checkMember() {
    try {
      const response = await fetch(
        "/api/member/me",
        {
          credentials: "include",
          cache: "no-store",
        }
      );

      const data = await response.json();

      setLoggedIn(
        data.authenticated === true
      );
    } catch (error) {
      console.error(
        "Member session check failed:",
        error
      );

      setLoggedIn(false);
    }
  }

  /* ==========================================================
     Logout
  ========================================================== */

  async function handleLogout() {
    try {
      await fetch(
        "/api/auth/logout",
        {
          method: "POST",
          credentials: "include",
        }
      );

      setLoggedIn(false);

      router.push("/");

      router.refresh();
    } catch (error) {
      console.error("Logout Error:", error);

      alert("Logout failed.");
    }
  }

  /* ==========================================================
     Header Actions
  ========================================================== */

  return (
    <div className={styles.actions}>
      {loggedIn ? (
        <>
          {/* Dashboard */}

          <Link
            href="/member/dashboard"
            className={styles.joinButton}
          >
            Dashboard
          </Link>

          {/* Profile */}

          <Link
            href="/member/profile"
            className={styles.donateButton}
          >
            My Profile
          </Link>

          {/* Logout */}

          <button
            onClick={handleLogout}
            className={styles.logoutButton}
          >
            Logout
          </button>
        </>
      ) : (
        <>
          {/* Join AILP */}

          <Link
            href="/member/register"
            className={styles.joinButton}
          >
            Join AILP
          </Link>

          {/* Member Login */}

          <Link
            href="/member/login"
            className={styles.memberButton}
          >
            Member Login
          </Link>

          {/* Donate */}

          <Link
            href="/donate"
            className={styles.donateButton}
          >
            Donate
          </Link>
        </>
      )}
    </div>
  );
}