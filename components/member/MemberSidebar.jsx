"use client";

/* ==========================================================
   Member Sidebar
========================================================== */

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  IdCard,
  UserRound,
  HeartHandshake,
  Settings,
  LogOut,
  MoreVertical,
  X,
} from "lucide-react";

import { useMember } from "./MemberContext";
import { getInitials, getPhotoUrl } from "@/lib/memberProfile";
import styles from "./MemberSidebar.module.css";

export const MEMBER_NAV = [
  { title: "Dashboard", href: "/member/dashboard", icon: LayoutDashboard },
  { title: "My ID Card", href: "/member/card", icon: IdCard },
  { title: "My Profile", href: "/member/profile", icon: UserRound },
  { title: "Donate", href: "/member/donation", icon: HeartHandshake },
  { title: "Settings", href: "/member/settings", icon: Settings },
];

export default function MemberSidebar({ open, onClose }) {
  const pathname = usePathname();
  const router = useRouter();
  const { member } = useMember();
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    function handleEscape(event) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        onClose?.();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  async function handleLogout() {
    if (loggingOut) return;
    setLoggingOut(true);
    try {
      await fetch("/api/member/logout", { method: "POST", credentials: "include" });
    } finally {
      router.replace("/member/login");
      router.refresh();
    }
  }

  const name = member?.fullName || "Member";
  const photoUrl = getPhotoUrl(member?.photo);

  return (
    <>
      {open && <div className={styles.overlay} onClick={onClose} aria-hidden="true" />}

      <aside className={`${styles.sidebar} ${open ? styles.open : ""}`} aria-label="Member navigation">
        <div className={styles.brand}>
          <Link href="/" className={styles.brandLink}>
            <span className={styles.brandLogo}>
              <img src="/images/ailp-symbol-logo.svg" alt="" width={34} height={34} />
            </span>
            <span className={styles.brandText}>
              <strong>AILP</strong>
              <small>Member Portal</small>
            </span>
          </Link>
          <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close menu">
            <X size={18} />
          </button>
        </div>

        <nav className={styles.nav}>
          {MEMBER_NAV.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navItem} ${active ? styles.active : ""}`}
                aria-current={active ? "page" : undefined}
              >
                <Icon size={18} strokeWidth={2} />
                <span>{item.title}</span>
              </Link>
            );
          })}
        </nav>

        <div className={styles.footer} ref={menuRef}>
          {menuOpen && (
            <div className={styles.menu} role="menu">
              <Link href="/member/profile" className={styles.menuItem} role="menuitem" onClick={() => setMenuOpen(false)}>
                <UserRound size={15} /> My Profile
              </Link>
              <Link href="/member/settings" className={styles.menuItem} role="menuitem" onClick={() => setMenuOpen(false)}>
                <Settings size={15} /> Settings
              </Link>
              <button type="button" className={`${styles.menuItem} ${styles.menuDanger}`} role="menuitem" onClick={handleLogout} disabled={loggingOut}>
                <LogOut size={15} /> {loggingOut ? "Signing out…" : "Sign out"}
              </button>
            </div>
          )}

          <button
            type="button"
            className={styles.userCard}
            onClick={() => setMenuOpen((v) => !v)}
            aria-haspopup="menu"
            aria-expanded={menuOpen}
          >
            <span className={styles.avatar}>
              {photoUrl ? <img src={photoUrl} alt="" /> : getInitials(name)}
            </span>
            <span className={styles.userInfo}>
              <strong>{name}</strong>
              <small>{member?.email || " "}</small>
              <em>{member?.membershipId ? "AILP Member" : "New Member"}</em>
            </span>
            <MoreVertical size={16} className={styles.more} />
          </button>
        </div>
      </aside>
    </>
  );
}
