"use client";

import { usePathname } from "next/navigation";

import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

import styles from "./AdminLayout.module.css";

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  // Login page uses its own layout
  if (pathname === "/admin/login") {
    return children;
  }

  // Dynamic Page Title
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
      subtitle: "Newsletter subscribers",
    },

    "/admin/profile": {
      title: "My Profile",
      subtitle: "Manage your profile",
    },
  };

  const page =
    pageTitles[pathname] || {
      title: "Admin Panel",
      subtitle: "All India Labour Party",
    };

  return (
    <div className={styles.layout}>
      <AdminSidebar />

      <div className={styles.contentWrapper}>
        <AdminHeader
          title={page.title}
          subtitle={page.subtitle}
        />

        <main className={styles.main}>
          {children}
        </main>
      </div>
    </div>
  );
}