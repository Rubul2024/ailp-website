"use client";

/*
====================================================
Production Header Component
====================================================
Features:
✔ Sticky Navigation
✔ Scroll Effect
✔ Responsive Layout
✔ Next.js Link
====================================================
*/

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./Header.module.css";

// Navigation Menu
const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Join", href: "/join" },
  { label: "Leadership", href: "/leadership" },
  { label: "News", href: "/news" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  // Track scroll position
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 20);
    }

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`${styles.header} ${
        isScrolled ? styles.scrolled : ""
      }`}
    >
      <div className="container">

        <div className={styles.wrapper}>

          {/* =========================
              Logo
          ========================== */}

          <Link href="/" className={styles.logo}>
            AILP
          </Link>

          {/* =========================
              Navigation
          ========================== */}

          <nav>

            <ul className={styles.nav}>

              {navItems.map((item) => (

                <li key={item.label}>

                  <Link href={item.href}>

                    {item.label}

                  </Link>

                </li>

              ))}

            </ul>

          </nav>

          {/* =========================
              CTA Button
          ========================== */}

          <Link
            href="/join"
            className={styles.joinButton}
          >
            Join Now
          </Link>

        </div>

      </div>
    </header>
  );
}
