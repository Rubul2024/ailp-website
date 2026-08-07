"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  LayoutDashboard,
  Users,
  IndianRupee,
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
    title: "Donations",
    href: "/admin/donation",
    icon: IndianRupee,
  },
  {
    title: "Contact Messages",
    href: "/admin/contact",
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

export default function AdminSidebar() {

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

    <aside className={styles.sidebar}>

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

  );

}