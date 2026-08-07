"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  CreditCard,
  User,
  IndianRupee,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";

import styles from "./Sidebar.module.css";

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    {
      title: "Dashboard",
      href: "/member/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Membership Card",
      href: "/member/card",
      icon: CreditCard,
    },
    {
      title: "My Profile",
      href: "/member/profile",
      icon: User,
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

  return (
    <aside className={styles.sidebar}>
      {/* ======================================
          Logo Section
      ====================================== */}

      <div className={styles.logoSection}>
        <Image
          src="/logo.png"
          alt="AILP Logo"
          width={72}
          height={72}
          priority
        />

        <h2>Member Portal</h2>
      </div>

      {/* ======================================
          Navigation
      ====================================== */}

      <nav className={styles.navigation}>
        {menuItems.map((item) => {
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
              <div className={styles.menuLeft}>
                <Icon size={20} />

                <span>{item.title}</span>
              </div>

              <ChevronRight size={18} />
            </Link>
          );
        })}
      </nav>

      {/* ======================================
          Logout Button
      ====================================== */}

      <div className={styles.bottomSection}>
        <button
          className={styles.logoutButton}
          onClick={async () => {
            await fetch("/api/member/logout", {
              method: "POST",
            });

            window.location.href = "/member/login";
          }}
        >
          <LogOut size={20} />

          Logout
        </button>
      </div>
    </aside>
  );
}