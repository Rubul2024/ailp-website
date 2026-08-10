"use client";

import { useState } from "react";

import { usePathname } from "next/navigation";

import MemberSidebar from "@/components/member/MemberSidebar";
import MemberHeader from "@/components/member/MemberHeader";

import styles from "./MemberLayout.module.css";

export default function MemberLayout({ children }) {
  const pathname = usePathname();

  const authPages = [
    "/member/login",
    "/member/register",
    "/member/forgot-password",
  ];

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isAuthPage = authPages.includes(pathname);

  if (isAuthPage) {
    return children;
  }

  return (
    <div className={styles.layout}>
      <MemberSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className={styles.content}>
        <MemberHeader
          onMenuClick={() =>
            setSidebarOpen((previous) => !previous)
          }
        />

        <main className={styles.main}>
          {children}
        </main>
      </div>
    </div>
  );
}