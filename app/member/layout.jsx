"use client";

import { useEffect, useState } from "react";

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
  const [member, setMember] = useState(null);

  const isAuthPage = authPages.includes(pathname);

  useEffect(() => {
    if (isAuthPage) return;

    let cancelled = false;

    async function loadMember() {
      try {
        let response = await fetch("/api/member/me", {
          credentials: "include",
          cache: "no-store",
        });

        if (!response.ok) {
          response = await fetch("/api/member/profile", {
            credentials: "include",
            cache: "no-store",
          });
        }

        const data = await response.json();

        if (!cancelled && data.success && (data.member || data.data)) {
          setMember(data.member || data.data);
        }
      } catch (error) {
        console.error(error);
      }
    }

    loadMember();

    return () => {
      cancelled = true;
    };
  }, [isAuthPage, pathname]);

  if (isAuthPage) {
    return children;
  }

  return (
    <div className={styles.layout}>
      <MemberSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        member={member}
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