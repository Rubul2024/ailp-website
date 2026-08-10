"use client";

/* ==========================================================
   AILP Public Website Header
   All India Labour Party
   Production Ready
========================================================== */

import { useEffect, useState } from "react";

import styles from "./Header.module.css";

import Logo from "./Logo";
import Navigation from "./Navigation";
import HeaderActions from "./HeaderActions";
import MobileMenuButton from "./MobileMenuButton";
import MobileMenu from "./MobileMenu";

export default function Header() {
  /* ========================================================
     Mobile Menu
  ======================================================== */

  const [menuOpen, setMenuOpen] = useState(false);

  /* ========================================================
     Header Scroll State
  ======================================================== */

  const [scrolled, setScrolled] = useState(false);

  /* ========================================================
     Detect Page Scroll
  ======================================================== */

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20);
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* ========================================================
     Prevent Background Scroll When Mobile Menu Is Open
  ======================================================== */

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      {/* ==================================================
          Main Header
      ================================================== */}

      <header
        className={`${styles.header} ${
          scrolled ? styles.scrolled : ""
        }`}
      >
        {/* ==================================================
            Header Container
        ================================================== */}

        <div className={styles.container}>
          {/* ==================================================
              Logo
          ================================================== */}

          <Logo />

          {/* ==================================================
              Desktop Navigation
          ================================================== */}

          <Navigation />

          {/* ==================================================
              Header Actions
          ================================================== */}

          <HeaderActions />

          {/* ==================================================
              Mobile Menu Button
          ================================================== */}

          <MobileMenuButton
            onClick={() => setMenuOpen(true)}
          />
        </div>
      </header>

      {/* ==================================================
          Mobile Navigation Drawer
      ================================================== */}

      <MobileMenu
        open={menuOpen}
        closeMenu={() => setMenuOpen(false)}
      />
    </>
  );
}