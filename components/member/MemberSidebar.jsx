"use client";

/* ==========================================================
   Member Sidebar
   All India Labour Party
   Production Ready
========================================================== */

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  LayoutDashboard,
  BadgeCheck,
  User,
  IndianRupee,
  Settings,
  LogOut,
  Building2,
} from "lucide-react";

import styles from "./MemberSidebar.module.css";

/* ==========================================================
   Menu Items
========================================================== */

const menus = [
  {
    title: "Dashboard",
    href: "/member/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "My Profile",
    href: "/member/profile",
    icon: User,
  },
  {
    title: "Membership Card",
    href: "/member/card",
    icon: BadgeCheck,
  },
  {
    title: "Donation",
    href: "/member/donation",
    icon: IndianRupee,
  },
  {
    title: "Settings",
    href: "/member/settings",
    icon: Settings,
  },
];

/* ==========================================================
   Sidebar
========================================================== */

export default function MemberSidebar({
  open,
  onClose,
}) {
  const pathname = usePathname();

  const router = useRouter();

  async function handleLogout() {
    try {
      await fetch("/api/member/logout", {
        method: "POST",
        credentials: "include",
      });

      router.push("/member/login");

      router.refresh();

    } catch (error) {

      console.error(error);

      alert("Logout failed.");
    }
  }

  return (
    <>
      {/* Mobile Overlay */}

      {open && (
        <div
          className={styles.overlay}
          onClick={onClose}
        />
      )}

      {/* Sidebar */}

      <aside
        className={`${styles.sidebar} ${
          open ? styles.open : ""
        }`}
      >
        {/* Logo */}

        <div className={styles.logo}>
          <Building2 size={34} />

          <div>
            <h2>AILP</h2>

            <span>Member Portal</span>
          </div>
        </div>

        {/* Navigation */}

        <nav className={styles.navigation}>
          {menus.map((item) => {

            const Icon = item.icon;

            const active =
              pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.item} ${
                  active
                    ? styles.active
                    : ""
                }`}
                onClick={onClose}
              >
                <Icon size={20} />

                <span>{item.title}</span>
              </Link>
            );

          })}
        </nav>

        {/* Footer */}

        <div className={styles.footer}>

          <button
            className={styles.logout}
            onClick={handleLogout}
          >
            <LogOut size={20} />

            <span>Logout</span>

          </button>

        </div>

      </aside>

    </>
  );
}