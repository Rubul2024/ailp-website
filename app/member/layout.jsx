"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";

import MemberSidebar from "@/components/member/MemberSidebar";
import MemberHeader from "@/components/member/MemberHeader";
import { MemberProvider } from "@/components/member/MemberContext";

import styles from "./MemberLayout.module.css";

const AUTH_PAGES = ["/member/login", "/member/register", "/member/forgot-password"];

export default function MemberLayout({ children }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);

  // Close the mobile drawer whenever the route changes.
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setSidebarOpen(false);
  }

  if (AUTH_PAGES.includes(pathname)) {
    return children;
  }

  return (
    <MemberProvider>
      <div className={styles.layout}>
        <MemberSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <div className={styles.content}>
          <MemberHeader onMenuClick={() => setSidebarOpen((v) => !v)} />
          <main className={styles.main}>{children}</main>
        </div>
      </div>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3500,
          style: { borderRadius: "12px", fontSize: "14px", padding: "10px 14px" },
          success: { iconTheme: { primary: "#0f766e", secondary: "#fff" } },
        }}
      />
    </MemberProvider>
  );
}
