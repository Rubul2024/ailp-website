"use client";

/* ==========================================================
   AILP PUBLIC WEBSITE
   MOBILE NAVIGATION DRAWER COMPONENT
   All India Labour Party - Production Ready
========================================================== */

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  X,
  Home,
  Users,
  Flame,
  Newspaper,
  ImageIcon,
  Phone,
  ChevronDown,
  Target,
  Eye,
  HelpCircle,
  UserPlus,
  HeartHandshake,
  LogIn,
  ArrowRight,
} from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";

import styles from "./Header.module.css";

/* ==========================================================
   PRIMARY NAVIGATION LINKS
========================================================== */
const primaryMenu = [
  { title: "Home", href: "/", icon: <Home size={18} /> },
  { title: "About Us", href: "/about", icon: <Users size={18} /> },
  { title: "Leadership", href: "/leadership", icon: <Flame size={18} /> },
  { title: "News & Updates", href: "/news", icon: <Newspaper size={18} /> },
  { title: "Photo Gallery", href: "/gallery", icon: <ImageIcon size={18} /> },
  { title: "Contact Us", href: "/contact", icon: <Phone size={18} /> },
];

/* ==========================================================
   RESOURCES SUB-MENU
========================================================== */
const resourceLinks = [
  { title: "Our Mission", href: "/mission", icon: <Target size={15} /> },
  { title: "Our Vision", href: "/vision", icon: <Eye size={15} /> },
  { title: "FAQ", href: "/faq", icon: <HelpCircle size={15} /> },
];

export default function MobileMenu({ open, closeMenu }) {
  const pathname = usePathname();
  const [resourcesOpen, setResourcesOpen] = useState(false);

  /* Lock background scroll when drawer is open */
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /* ESC key listener to close menu */
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        closeMenu();
      }
    }
    if (open) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, closeMenu]);

  function isActive(href) {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <>
      {/* Background Dimmed Overlay */}
      <div
        className={`${styles.overlay} ${open ? styles.showOverlay : ""}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* Mobile Navigation Drawer */}
      <aside
        className={`${styles.mobileMenu} ${open ? styles.showMenu : ""}`}
        aria-label="Mobile navigation drawer"
        aria-hidden={!open}
      >
        {/* ==================================================
            Drawer Top Header with Official Party Emblem
        ================================================== */}
        <div className={styles.mobileDrawerHeader}>
          <Link href="/" className={styles.mobileBrandWrap} onClick={closeMenu}>
            <div className={styles.mobileLogoBadge}>
              <Image
                src="/images/ailp-symbol-logo.svg"
                alt="AILP Official Symbol"
                width={42}
                height={42}
                priority
              />
            </div>

            <div className={styles.mobileBrandText}>
              <div className={styles.mobileBrandTop}>
                <span>ALL INDIA</span>
                <span className={styles.mobileAilpTag}>AILP</span>
              </div>
              <span className={styles.mobileBrandSub}>LABOUR PARTY</span>
            </div>
          </Link>

          <button
            type="button"
            className={styles.closeButton}
            onClick={closeMenu}
            aria-label="Close navigation drawer"
          >
            <X size={20} />
          </button>
        </div>

        {/* ==================================================
            Navigation Links List
        ================================================== */}
        <nav className={styles.mobileNavBody}>
          {primaryMenu.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.mobileNavItem} ${
                  active ? styles.activeMobileNavItem : ""
                }`}
                onClick={closeMenu}
              >
                <div className={styles.navIconBox}>{item.icon}</div>
                <span>{item.title}</span>
              </Link>
            );
          })}

          {/* Resources Accordion Dropdown */}
          <div className={styles.mobileAccordionSection}>
            <button
              type="button"
              className={styles.mobileAccordionBtn}
              onClick={() => setResourcesOpen((prev) => !prev)}
            >
              <div className={styles.mobileNavItemContent}>
                <div className={styles.navIconBox}>
                  <Target size={18} />
                </div>
                <span>Party Resources</span>
              </div>
              <ChevronDown
                size={18}
                className={`${styles.accordionChevron} ${
                  resourcesOpen ? styles.rotateChevron : ""
                }`}
              />
            </button>

            {resourcesOpen && (
              <div className={styles.accordionSubLinks}>
                {resourceLinks.map((sub) => {
                  const active = isActive(sub.href);
                  return (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      className={`${styles.subLinkItem} ${
                        active ? styles.activeSubLink : ""
                      }`}
                      onClick={closeMenu}
                    >
                      {sub.icon}
                      <span>{sub.title}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </nav>

        {/* Drawer Actions & CTA Buttons */}
<div className={styles.mobileDrawerFooter}>
  <Link
    href="/join-membership"
    className={styles.mobilePrimaryCta}
    onClick={closeMenu}
  >
    <UserPlus size={16} />
    <span>Join Membership</span>
    <ArrowRight size={16} />
  </Link>

  <div className={styles.mobileSecondaryGrid}>
    <Link
      href="/donate"
      className={styles.mobileDonateBtn}
      onClick={closeMenu}
    >
      <HeartHandshake size={15} />
      <span>Donate</span>
    </Link>

    <Link
      href="/login"
      className={styles.mobileLoginBtn}
      onClick={closeMenu}
    >
      <LogIn size={15} />
      <span>Member Login</span>
    </Link>
  </div>

          {/* Social Icons & Copyright */}
          <div className={styles.mobileSocialIcons}>
            <a href="#" aria-label="Facebook">
              <FaFacebookF size={13} />
            </a>
            <a href="#" aria-label="Instagram">
              <FaInstagram size={13} />
            </a>
            <a href="#" aria-label="X (Twitter)">
              <FaXTwitter size={13} />
            </a>
            <a href="#" aria-label="YouTube">
              <FaYoutube size={13} />
            </a>
            <a href="#" aria-label="LinkedIn">
              <FaLinkedinIn size={13} />
            </a>
          </div>

          <p className={styles.mobileCopyright}>
            © {new Date().getFullYear()} All India Labour Party
          </p>
        </div>
      </aside>
    </>
  );
}