"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import { useRouter } from "next/navigation";

import styles from "./Header.module.css";

export default function HeaderActions() {
  const router = useRouter();

  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    checkMember();
  }, []);

  async function checkMember() {
    try {
      const response = await fetch(
        "/api/member/me",

        {
          credentials: "include",
        },
      );

      const data = await response.json();

      setLoggedIn(data.success);
    } catch {
      setLoggedIn(false);
    }
  }

  async function handleLogout() {
    try {
      await fetch(
        "/api/auth/logout",

        {
          method: "POST",

          credentials: "include",
        },
      );

      router.push("/");

      router.refresh();
    } catch {
      alert("Logout failed.");
    }
  }

  return (
    <div className={styles.actions}>
      {loggedIn ? (
        <>
          <Link href="/member/dashboard" className={styles.joinButton}>
            Dashboard
          </Link>

          <Link href="/member/profile" className={styles.donateButton}>
            My Profile
          </Link>

          <button onClick={handleLogout} className={styles.logoutButton}>
            Logout
          </button>
        </>
      ) : (
        <>
          <Link href="/member/register" className={styles.joinButton}>
            Join AILP
          </Link>

          <Link href="/member/login" className={styles.memberButton}>
            Member Login
          </Link>

          <Link href="/donate" className={styles.donateButton}>
            Donate
          </Link>
        </>
      )}
    </div>
  );
}
