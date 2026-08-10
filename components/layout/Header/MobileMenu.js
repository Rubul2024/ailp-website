"use client";

/* ==========================================================
   AILP PUBLIC WEBSITE
   MOBILE NAVIGATION MENU

   All India Labour Party
   Production Ready
========================================================== */

import Link from "next/link";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

import {
  FaHouse,
  FaCircleInfo,
  FaUsers,
  FaNewspaper,
  FaImages,
  FaPhone,
  FaBullseye,
  FaLightbulb,
  FaCircleQuestion,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa6";

import { FaXTwitter } from "react-icons/fa6";

import styles from "./Header.module.css";


/* ==========================================================
   MOBILE NAVIGATION
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
   RESOURCES
========================================================== */

const resources = [
  {
    title: "Our Mission",
    href: "/mission",
    icon: <FaBullseye />,
  },

  {
    title: "Our Vision",
    href: "/vision",
    icon: <FaLightbulb />,
  },

  {
    title: "FAQ",
    href: "/faq",
    icon: <FaCircleQuestion />,
  },
];


/* ==========================================================
   COMPONENT
========================================================== */

export default function MobileMenu({
  open,
  closeMenu,
}) {
  const pathname = usePathname();


  /* ========================================================
     Lock Body Scroll
  ======================================================== */

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


  /* ========================================================
     ESC KEY CLOSE
  ======================================================== */

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        closeMenu();
      }
    }

    if (open) {
      window.addEventListener(
        "keydown",
        handleKeyDown
      );
    }

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [open, closeMenu]);


  /* ========================================================
     Active Page
  ======================================================== */

  function isActive(href) {
    if (href === "/") {
      return pathname === "/";
    }

    return (
      pathname === href ||
      pathname.startsWith(`${href}/`)
    );
  }


  /* ========================================================
     Render
  ======================================================== */

  return (
    <>
      {/* ====================================================
          Background Overlay
      ==================================================== */}

      <div
        className={`${styles.overlay} ${
          open ? styles.showOverlay : ""
        }`}
        onClick={closeMenu}
        aria-hidden="true"
      />


      {/* ====================================================
          Mobile Drawer
      ==================================================== */}

      <aside
        className={`${styles.mobileMenu} ${
          open ? styles.showMenu : ""
        }`}
        aria-label="Mobile navigation"
        aria-hidden={!open}
      >

        {/* ==================================================
            Close Button
        ================================================== */}

        <button
          type="button"
          className={styles.closeButton}
          onClick={closeMenu}
          aria-label="Close navigation menu"
        >
          ×
        </button>


        {/* ==================================================
            Mobile Logo
        ================================================== */}

        <div className={styles.mobileLogo}>
          <img
            src="/images/logo.png"
            alt="All India Labour Party"
          />

          <h3>
            All India Labour Party
          </h3>

          <p>
            Together for Employment, Equality
            and Social Justice.
          </p>
        </div>


        {/* ==================================================
            Main Navigation
        ================================================== */}

        <nav
          className={styles.mobileNavigation}
          aria-label="Mobile main navigation"
        >

          {menu.map((item, index) => (
            <Link
              key={item.title}
              href={item.href}
              className={`${styles.mobileLink} ${
                isActive(item.href)
                  ? styles.mobileActive
                  : ""
              }`}
              onClick={closeMenu}
              style={{
                animationDelay:
                  `${0.08 * index}s`,
              }}
              aria-current={
                isActive(item.href)
                  ? "page"
                  : undefined
              }
            >

              <span
                className={styles.menuIcon}
              >
                {item.icon}
              </span>

              <span>
                {item.title}
              </span>

            </Link>
          ))}

        </nav>


        {/* ==================================================
            Resources
        ================================================== */}

        <div className={styles.mobileNavigation}>

          {resources.map(
            (item, index) => (
              <Link
                key={item.title}
                href={item.href}
                className={`${styles.mobileLink} ${
                  isActive(item.href)
                    ? styles.mobileActive
                    : ""
                }`}
                onClick={closeMenu}
                style={{
                  animationDelay:
                    `${0.08 * (index + menu.length)}s`,
                }}
                aria-current={
                  isActive(item.href)
                    ? "page"
                    : undefined
                }
              >

                <span
                  className={styles.menuIcon}
                >
                  {item.icon}
                </span>

                <span>
                  {item.title}
                </span>

              </Link>
            )
          )}

        </div>


        {/* ==================================================
            Action Buttons
        ================================================== */}

        <div
          className={styles.mobileActions}
        >

          <Link
            href="/join"
            className={styles.joinButton}
            onClick={closeMenu}
          >
            Join Membership
          </Link>


          <Link
            href="/donate"
            className={styles.donateButton}
            onClick={closeMenu}
          >
            Donate
          </Link>


          <Link
            href="/member/login"
            className={styles.memberButton}
            onClick={closeMenu}
          >
            Member Login
          </Link>

        </div>


        {/* ==================================================
            Social Media
        ================================================== */}

        <div
          className={styles.mobileFooter}
        >

          <div
            className={styles.socialIcons}
          >

            <a
              href="#"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>

            <a
              href="#"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>

            <a
              href="#"
              aria-label="X"
            >
              <FaXTwitter />
            </a>

            <a
              href="#"
              aria-label="YouTube"
            >
              <FaYoutube />
            </a>

            <a
              href="#"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn />
            </a>

          </div>


          <p>
            © {new Date().getFullYear()}{" "}
            All India Labour Party
          </p>

        </div>

      </aside>
    </>
  );
}