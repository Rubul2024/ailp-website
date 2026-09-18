"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  LayoutDashboard,
  Users,
  Users2,
  IndianRupee,
  ClipboardCheck,
  Mail,
  Bell,
  UserCircle2,
  LogOut,
} from "lucide-react";

import styles from "./AdminSidebar.module.css";

const menus = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Members",
    href: "/admin/members",
    icon: Users,
  },
  {
    title: "Donation Settings",
    href: "/admin/donation",
    icon: IndianRupee,
  },
  {
    title: "Leadership",
    href: "/admin/leadership",
    icon: Users2,
  },
  {
    title: "Donation Review",
    href: "/admin/donations",
    icon: ClipboardCheck,
  },
  {
    title: "Contact Messages",
    href: "/admin/contacts",
    icon: Mail,
  },
  {
    title: "Newsletter",
    href: "/admin/newsletter",
    icon: Bell,
  },
  {
    title: "Profile",
    href: "/admin/profile",
    icon: UserCircle2,
  },
];

export default function AdminSidebar({ open, onClose }) {

  const pathname = usePathname();

  const router = useRouter();

  /* ==========================================
     Logout
  ========================================== */

  async function handleLogout() {

    try {

      const response = await fetch("/api/admin/logout", {

        method: "POST",

        credentials: "include",

      });

      const data = await response.json();

      if (data.success) {

        router.replace("/admin/login");

        router.refresh();

      }

    } catch (error) {

      console.error("Logout Error:", error);

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

    <aside className={`${styles.sidebar} ${open ? styles.open : ""}`}>

      {/* Logo */}

      <div className={styles.logoArea}>

        <h1 className={styles.logo}>

          AIL<span>P</span>

        </h1>

        <p className={styles.subtitle}>

          All India Labour Party

        </p>

      </div>

      {/* Navigation */}

      <nav className={styles.menu}>

        {menus.map((item) => {

          const Icon = item.icon;

          const active = pathname === item.href;

          return (

            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`${styles.menuItem} ${
                active ? styles.active : ""
              }`}
            >

              <Icon
                size={22}
                className={styles.menuIcon}
              />

              <span className={styles.menuText}>

                {item.title}

              </span>

            </Link>

          );

        })}

      </nav>

      {/* Footer */}

      <div className={styles.footer}>

        <button
          onClick={handleLogout}
          className={styles.logout}
        >

          <LogOut size={20} />

          Logout

        </button>

      </div>

    </aside>

    </>

  );

}