"use client";

import { useEffect, useState } from "react";

import styles from "./Header.module.css";

import Logo from "./Logo";
import Navigation from "./Navigation";
import HeaderActions from "./HeaderActions";
import MobileMenuButton from "./MobileMenuButton";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20);
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
        <div className={styles.container}>
          <Logo />

          <Navigation />

          <HeaderActions />

          <MobileMenuButton onClick={() => setMenuOpen(true)} />
        </div>
      </header>

      <MobileMenu open={menuOpen} closeMenu={() => setMenuOpen(false)} />
    </>
  );
}
