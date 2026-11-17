"use client";

/* ==========================================================
   Member Header — breadcrumb + profile-readiness ring
========================================================== */

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Menu } from "lucide-react";

import { useMember } from "./MemberContext";
import { MEMBER_NAV } from "./MemberSidebar";
import { getCardReadiness } from "@/lib/memberProfile";
import styles from "./MemberHeader.module.css";

export default function MemberHeader({ onMenuClick }) {
  const pathname = usePathname();
  const { member } = useMember();

  const current = MEMBER_NAV.find((item) => pathname.startsWith(item.href));
  const readiness = getCardReadiness(member);

  const radius = 15;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - readiness.percent / 100);

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <button type="button" className={styles.menuBtn} onClick={onMenuClick} aria-label="Open menu">
          <Menu size={20} />
        </button>

        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/member/dashboard">AILP</Link>
          {current && current.href !== "/member/dashboard" && (
            <>
              <ChevronRight size={15} aria-hidden="true" />
              <span aria-current="page">{current.title}</span>
            </>
          )}
        </nav>
      </div>

      {member && (
        <Link
          href="/member/profile"
          className={`${styles.ring} ${readiness.ready ? styles.ringDone : ""}`}
          title={readiness.ready ? "Profile complete" : `Profile ${readiness.percent}% complete`}
          aria-label={`Profile ${readiness.percent}% complete`}
        >
          <svg viewBox="0 0 36 36" width="40" height="40" aria-hidden="true">
            <circle cx="18" cy="18" r={radius} className={styles.ringTrack} />
            <circle
              cx="18"
              cy="18"
              r={radius}
              className={styles.ringValue}
              strokeDasharray={circumference}
              strokeDashoffset={offset}
            />
          </svg>
          <span>{readiness.percent}</span>
        </Link>
      )}
    </header>
  );
}
