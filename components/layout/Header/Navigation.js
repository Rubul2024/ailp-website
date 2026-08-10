"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";

import styles from "./Header.module.css";

/* ==========================================================
   Main Navigation
========================================================== */

const menu = [
  {
    title: "Home",
    href: "/",
  },

  {
    title: "About",
    href: "/about",
  },

  {
    title: "Leadership",
    href: "/leadership",
  },

  {
    title: "News",
    href: "/news",
  },

  {
    title: "Gallery",
    href: "/gallery",
  },

  {
    title: "Contact",
    href: "/contact",
  },
];

/* ==========================================================
   Resources Navigation
========================================================== */

const resources = [
  {
    title: "Our Mission",
    href: "/mission",
  },

  {
    title: "Our Vision",
    href: "/vision",
  },

  {
    title: "FAQ",
    href: "/faq",
  },
];

/* ==========================================================
   Component
========================================================== */

export default function Navigation() {
  const pathname = usePathname();

  /* ========================================================
     Check Active Page
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
     Resources Active State
  ======================================================== */

  const resourcesActive = resources.some(
    (item) => isActive(item.href)
  );

  return (
    <nav
      className={styles.navigation}
      aria-label="Main navigation"
    >
      {/* ==================================================
          Main Navigation
      ================================================== */}

      {menu.map((item) => (
        <Link
          key={item.title}
          href={item.href}
          className={`${styles.navLink} ${
            isActive(item.href)
              ? styles.active
              : ""
          }`}
          aria-current={
            isActive(item.href)
              ? "page"
              : undefined
          }
        >
          {item.title}
        </Link>
      ))}

      {/* ==================================================
          Resources Dropdown
      ================================================== */}

      <div className={styles.resources}>
        <button
          type="button"
          className={`${styles.navLink} ${
            resourcesActive
              ? styles.active
              : ""
          }`}
          aria-haspopup="true"
          aria-expanded="false"
        >
          <span>
            Resources
          </span>

          <ChevronDown
            size={15}
            aria-hidden="true"
          />
        </button>

        {/* ==================================================
            Dropdown Menu
        ================================================== */}

        <div
          className={styles.resourcesMenu}
        >
          {resources.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className={
                isActive(item.href)
                  ? styles.resourceActive
                  : ""
              }
              aria-current={
                isActive(item.href)
                  ? "page"
                  : undefined
              }
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}