"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

import styles from "./AdminLayout.module.css";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
      title: "Donation Settings",
      subtitle: "Manage UPI, bank & QR details",
    },

    "/admin/donations": {
      title: "Donation Review",
      subtitle: "Verify manual UPI contributions",
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

      <AdminSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* ======================================================
          MAIN CONTENT AREA
      ====================================================== */}

      <div className={styles.contentWrapper}>
        {/* Global Admin Header */}
        <AdminHeader
          title={page.title}
          subtitle={page.subtitle}
          onMenuClick={() => setSidebarOpen((previous) => !previous)}
        />

        {/* Page Content */}
        <main className={styles.main}>
          {children}
        </main>
      </div>
    </div>
  );
}