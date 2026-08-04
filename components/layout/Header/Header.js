"use client";

/* ===========================================================
   Production Responsive Header
   -----------------------------------------------------------
   Features:
   ✔ Sticky Header
   ✔ Scroll Effect
   ✔ Mobile Menu
   ✔ Active Navigation
   ✔ Body Scroll Lock
   ✔ Accessible Buttons
=========================================================== */

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBars, FaTimes } from "react-icons/fa";

import styles from "./Header.module.css";

// Navigation Items
const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Join", href: "/join" },
  { label: "Leadership", href: "/leadership" },
  { label: "News", href: "/news" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {

  // Current URL
  const pathname = usePathname();

  // Track scrolling
  const [isScrolled, setIsScrolled] = useState(false);

  // Mobile Menu
  const [menuOpen, setMenuOpen] = useState(false);

  /* ===================================
     Detect page scroll
  ==================================== */

  useEffect(() => {

    function handleScroll() {
      setIsScrolled(window.scrollY > 20);
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };

  }, []);

  /* ===================================
     Lock body scrolling
  ==================================== */

  useEffect(() => {

    document.body.style.overflow = menuOpen
      ? "hidden"
      : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };

  }, [menuOpen]);

  return (

    <header
      className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}
    >

      <div className="container">

        <div className={styles.wrapper}>

          {/* ================= Logo ================= */}

          <Link href="/" className={styles.logo}>

            AILP

          </Link>

          {/* =============== Desktop Navigation =============== */}

          <nav
            className={`${styles.navWrapper} ${
              menuOpen ? styles.showMenu : ""
            }`}
          >

            <ul className={styles.nav}>

              {navItems.map((item) => (

                <li key={item.href}>

                  <Link
                    href={item.href}
                    className={
                      pathname === item.href
                        ? styles.active
                        : ""
                    }
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </Link>

                </li>

              ))}

            </ul>

            {/* Mobile Button */}

            <Link
              href="/join"
              className={styles.mobileButton}
              onClick={() => setMenuOpen(false)}
            >
              Join Now
            </Link>

          </nav>

          {/* Desktop Button */}

          <Link
            href="/join"
            className={styles.joinButton}
          >
            Join Now
          </Link>

          {/* Hamburger */}

          <button
            className={styles.menuButton}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
          >

            {menuOpen ? <FaTimes /> : <FaBars />}

          </button>

        </div>

      </div>

    </header>

  );

}