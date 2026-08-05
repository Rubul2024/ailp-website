"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

/* ==========================================================
   Mobile Menu Component
   ----------------------------------------------------------
   This component creates the mobile side drawer.
   ========================================================== */

import Link from "next/link";

import {
  FaHouse,
  FaCircleInfo,
  FaUsers,
  FaNewspaper,
  FaImages,
  FaPhone,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa6";

import { FaXTwitter } from "react-icons/fa6";

import styles from "./Header.module.css";

/* ==========================================================
   Mobile Navigation Menu
   ========================================================== */

const menu = [
  {
    title: "Home",
    href: "/",
    icon: <FaHouse />,
  },

  {
    title: "About",
    href: "/about",
    icon: <FaCircleInfo />,
  },

  {
    title: "Leadership",
    href: "/leadership",
    icon: <FaUsers />,
  },

  {
    title: "News",
    href: "/news",
    icon: <FaNewspaper />,
  },

  {
    title: "Gallery",
    href: "/gallery",
    icon: <FaImages />,
  },

  {
    title: "Contact",
    href: "/contact",
    icon: <FaPhone />,
  },
];

/* ==========================================================
   Mobile Menu Component
   ========================================================== */

export default function MobileMenu({ open, closeMenu }) {

  /* ==========================================
   Lock Body Scroll
========================================== */

useEffect(() => {

    if(open){

        document.body.style.overflow = "hidden";

    }

    else{

        document.body.style.overflow = "";

    }

    return () => {

        document.body.style.overflow = "";

    };

}, [open]);

/* ==========================================
   ESC Key Close
========================================== */

useEffect(() => {

    const handleKeyDown = (event) => {

        if(event.key === "Escape"){

            closeMenu();

        }

    };

    window.addEventListener(
        "keydown",
        handleKeyDown
    );

    return () => {

        window.removeEventListener(
            "keydown",
            handleKeyDown
        );

    };

}, [closeMenu]);

  const pathname = usePathname();

  return (
    <>
      {/* ======================================================
          Background Overlay
      ======================================================= */}

      <div
        className={`${styles.overlay} ${open ? styles.showOverlay : ""}`}
        onClick={closeMenu}
      />

      {/* ======================================================
          Mobile Drawer
      ======================================================= */}

      <aside className={`${styles.mobileMenu} ${open ? styles.showMenu : ""}`}>
        {/* ======================================================
            Close Button
        ======================================================= */}

        <button
          className={styles.closeButton}
          onClick={closeMenu}
          aria-label="Close Menu"
        >
          ✕
        </button>

        {/* ======================================================
            Logo Section
        ======================================================= */}

        <div className={styles.mobileLogo}>
          <img src="/images/logo.png" alt="AILP Logo" />

          <h3>All India Labour Party</h3>

          <p>Together for Employment, Equality and Social Justice.</p>
        </div>

        {/* ======================================================
            Navigation Menu
        ======================================================= */}

        {menu.map((item, index) => (
          <Link
            key={item.title}
            href={item.href}
            className={`${styles.mobileLink} ${
              pathname === item.href ? styles.mobileActive : ""
            }`}
            onClick={closeMenu}
            style={{
              animationDelay: `${0.08 * index}s`,
            }}
          >
            <span className={styles.menuIcon}>{item.icon}</span>

            <span>{item.title}</span>
          </Link>
        ))}

        {/* ======================================================
            Action Buttons
        ======================================================= */}

        <div className={styles.mobileActions}>
          <Link href="/join" className={styles.joinButton} onClick={closeMenu}>
            Join AILP
          </Link>

          <Link
            href="/donate"
            className={styles.donateButton}
            onClick={closeMenu}
          >
            Donate
          </Link>
        </div>

        {/* ======================================================
            Social Icons
        ======================================================= */}

        <div className={styles.mobileFooter}>
          <div className={styles.socialIcons}>
            <a href="#">
              <FaFacebookF />
            </a>

            <a href="#">
              <FaInstagram />
            </a>

            <a href="#">
              <FaXTwitter />
            </a>

            <a href="#">
              <FaYoutube />
            </a>

            <a href="#">
              <FaLinkedinIn />
            </a>
          </div>

          <p>© 2026 All India Labour Party</p>
        </div>
      </aside>
    </>
  );
}
