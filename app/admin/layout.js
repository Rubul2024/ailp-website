"use client";

import { usePathname } from "next/navigation";

import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

import styles from "./AdminLayout.module.css";

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  /* ==========================================================
     LOGIN PAGE
     Login has its own independent layout
  ========================================================== */

  if (pathname === "/admin/login") {
    return children;
  }

  /* ==========================================================
     ADMIN PAGE TITLES
  ========================================================== */

  const pageTitles = {
    "/admin/dashboard": {
      title: "Dashboard",
      subtitle: "Welcome back, Administrator",
    },

    "/admin/members": {
      title: "Members",
      subtitle: "Manage all registered members",
    },

    "/admin/donation": {
      title: "Donations",
      subtitle: "Manage donation information",
    },

    "/admin/contact": {
      title: "Contact Messages",
      subtitle: "View contact enquiries",
    },

    "/admin/newsletter": {
      title: "Newsletter",
      subtitle: "Manage newsletter subscribers",
    },

    "/admin/profile": {
      title: "My Profile",
      subtitle: "Manage your administrator profile",
    },

    "/admin/settings": {
      title: "Settings",
      subtitle: "Manage administration settings",
    },
  };

  const page = pageTitles[pathname] || {
    title: "Admin Panel",
    subtitle: "All India Labour Party",
  };

  return (
    <div className={styles.layout}>
      {/* ======================================================
          SIDEBAR
      ====================================================== */}

      <AdminSidebar />

      {/* ======================================================
          MAIN CONTENT AREA
      ====================================================== */}

      <div className={styles.contentWrapper}>
        {/* Global Admin Header */}
        <AdminHeader
          title={page.title}
          subtitle={page.subtitle}
        />

        {/* Page Content */}
        <main className={styles.main}>
          {children}
        </main>
      </div>
    </div>
  );
}