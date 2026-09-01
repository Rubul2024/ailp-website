"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronDown,
  Menu,
  X,
  ArrowRight,
} from "lucide-react";
import "./Header.css";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);

  function closeMobileMenu() {
    setMobileOpen(false);
    setResourcesOpen(false);
  }

  function toggleResources() {
    setResourcesOpen((previous) => !previous);
  }

  return (
    <header className="site-header">
      <div className="header-container">
        {/* ================= Logo ================= */}
        <Link
          href="/"
          className="ailp-logo"
          onClick={closeMobileMenu}
        >
          <div className="ailp-logo-symbol-wrap">
            <Image
              src="/images/ailp-symbol-logo.svg"
              alt="AILP Election Symbol Glass"
              width={44}
              height={44}
              priority
            />
          </div>

          <div className="ailp-logo-content">
            <strong>ALL INDIA</strong>
            <span>LABOUR PARTY</span>
          </div>
        </Link>

        {/* ================= Desktop Navigation ================= */}
        <nav
          className="desktop-navigation"
          aria-label="Main navigation"
        >
          <Link href="/" className="nav-link">
            Home
          </Link>
          <Link href="/about" className="nav-link">
            About
          </Link>
          <Link href="/leadership" className="nav-link">
            Leadership
          </Link>
          <Link href="/news" className="nav-link">
            News
          </Link>
          <Link href="/gallery" className="nav-link">
            Gallery
          </Link>

          {/* Resources Dropdown */}
          <div className="nav-dropdown">
            <button
              type="button"
              className="nav-link nav-dropdown-button"
              onClick={toggleResources}
              aria-expanded={resourcesOpen}
            >
              Resources
              <ChevronDown
                size={16}
                className={resourcesOpen ? "dropdown-arrow-open" : ""}
              />
            </button>

            <div
              className={`resources-menu ${
                resourcesOpen ? "resources-menu-open" : ""
              }`}
            >
              <Link
                href="/mission"
                onClick={() => setResourcesOpen(false)}
              >
                <span>Our Mission</span>
                <ArrowRight size={15} />
              </Link>
              <Link
                href="/vision"
                onClick={() => setResourcesOpen(false)}
              >
                <span>Our Vision</span>
                <ArrowRight size={15} />
              </Link>
              <Link
                href="/faq"
                onClick={() => setResourcesOpen(false)}
              >
                <span>FAQ</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          <Link href="/contact" className="nav-link">
            Contact
          </Link>
        </nav>

        {/* ================= Join CTA Button ================= */}
        <Link
          href="/member/join"
          className="header-join-button"
        >
          <span>Join Membership</span>
          <ArrowRight size={17} />
        </Link>

        {/* ================= Mobile Menu Trigger ================= */}
        <button
          type="button"
          className="mobile-menu-button"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={25} /> : <Menu size={25} />}
        </button>
      </div>

      {/* ================= Mobile Overlay & Drawer ================= */}
      <div
        className={`mobile-overlay ${mobileOpen ? "mobile-overlay-visible" : ""}`}
        onClick={closeMobileMenu}
        aria-hidden={!mobileOpen}
      />

      <aside
        className={`mobile-navigation ${mobileOpen ? "mobile-navigation-open" : ""}`}
        aria-hidden={!mobileOpen}
      >
        <div className="mobile-navigation-header">
          <div className="mobile-brand">
            <Image
              src="/images/ailp-symbol-logo.svg"
              alt="AILP Election Symbol"
              width={38}
              height={38}
            />
            <div>
              <strong>ALL INDIA</strong>
              <span>LABOUR PARTY</span>
            </div>
          </div>

          <button
            type="button"
            className="mobile-close-button"
            onClick={closeMobileMenu}
            aria-label="Close menu"
          >
            <X size={23} />
          </button>
        </div>

        <nav className="mobile-nav-links" aria-label="Mobile navigation">
          <Link href="/" onClick={closeMobileMenu}>Home</Link>
          <Link href="/about" onClick={closeMobileMenu}>About</Link>
          <Link href="/leadership" onClick={closeMobileMenu}>Leadership</Link>
          <Link href="/news" onClick={closeMobileMenu}>News</Link>
          <Link href="/gallery" onClick={closeMobileMenu}>Gallery</Link>

          <div className="mobile-resources">
            <button
              type="button"
              className="mobile-resources-button"
              onClick={toggleResources}
            >
              Resources
              <ChevronDown
                size={18}
                className={resourcesOpen ? "dropdown-arrow-open" : ""}
              />
            </button>

            {resourcesOpen && (
              <div className="mobile-resource-links">
                <Link href="/mission" onClick={closeMobileMenu}>Our Mission</Link>
                <Link href="/vision" onClick={closeMobileMenu}>Our Vision</Link>
                <Link href="/faq" onClick={closeMobileMenu}>FAQ</Link>
              </div>
            )}
          </div>

          <Link href="/contact" onClick={closeMobileMenu}>Contact</Link>
        </nav>

        <div className="mobile-navigation-footer">
          <Link
            href="/member/join"
            className="mobile-join-button"
            onClick={closeMobileMenu}
          >
            <span>Join Membership</span>
            <ArrowRight size={18} />
          </Link>
          <p>Be part of the movement.</p>
        </div>
      </aside>
    </header>
  );
}