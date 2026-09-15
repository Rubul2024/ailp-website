"use client";

/* ==========================================================
   Member Sidebar
   All India Labour Party
   Production Ready
========================================================== */

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  LayoutDashboard,
  BadgeCheck,
  User,
  IndianRupee,
  Settings,
  LogOut,
  Building2,
  MoreVertical,
  ShieldCheck,
} from "lucide-react";

import styles from "./MemberSidebar.module.css";

/* ==========================================================
   Menu Items
========================================================== */

const menus = [
  {
    title: "Dashboard",
    href: "/member/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "My Profile",
    href: "/member/profile",
    icon: User,
  },
  {
    title: "Membership Card",
    href: "/member/card",
    icon: BadgeCheck,
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

/* ==========================================================
   Sidebar
========================================================== */

export default function MemberSidebar({
  open,
  onClose,
  member,
}) {
  const pathname = usePathname();

  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleLogout() {
    try {
      await fetch("/api/member/logout", {
        method: "POST",
        credentials: "include",
      });

      router.push("/member/login");

      router.refresh();

    } catch (error) {

      console.error(error);

      alert("Logout failed.");
    }
  }

  const memberName = member?.fullName || "Member";

  const memberInitials = memberName
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const getPhotoUrl = (photo) => {
    if (!photo) return null;
    if (typeof photo === "string") return photo;
    if (typeof photo === "object" && photo.url) return photo.url;
    return null;
  };

  const photoUrl = getPhotoUrl(member?.photo);

  return (
    <>
      {/* Mobile Overlay */}

      {open && (
        <div
          className={styles.overlay}
          onClick={onClose}
        />
      )}

      {/* Sidebar */}

      <aside
        className={`${styles.sidebar} ${
          open ? styles.open : ""
        }`}
      >
        {/* Logo */}

        <div className={styles.logo}>
          <Building2 size={34} />

          <div>
            <h2>AILP</h2>

            <span>Member Portal</span>
          </div>
        </div>

        {/* Navigation */}

        <nav className={styles.navigation}>
          {menus.map((item) => {

            const Icon = item.icon;

            const active =
              pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.item} ${
                  active
                    ? styles.active
                    : ""
                }`}
                onClick={onClose}
              >
                <Icon size={20} />

                <span>{item.title}</span>
              </Link>
            );

          })}
        </nav>

        {/* Footer: Profile */}

        <div className={styles.footer} ref={menuRef}>

          <button
            type="button"
            className={styles.profileTrigger}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <div className={styles.profileAvatar}>
              {photoUrl ? (
                <img src={photoUrl} alt={memberName} className={styles.profileAvatarImg} />
              ) : (
                <span>{memberInitials || "M"}</span>
              )}
            </div>

            <div className={styles.profileInfo}>
              <span className={styles.profileName}>{memberName}</span>
              <span className={styles.profileRole}>
                <ShieldCheck size={11} />
                {member?.membershipId || "AILP Member"}
              </span>
            </div>

            <MoreVertical size={17} className={styles.profileMore} />
          </button>

          {menuOpen && (
            <div className={styles.profileMenu}>
              <Link
                href="/member/profile"
                className={styles.profileMenuItem}
                onClick={() => {
                  setMenuOpen(false);
                  onClose();
                }}
              >
                <User size={15} />
                <span>My Profile</span>
              </Link>

              <Link
                href="/member/settings"
                className={styles.profileMenuItem}
                onClick={() => {
                  setMenuOpen(false);
                  onClose();
                }}
              >
                <Settings size={15} />
                <span>Settings</span>
              </Link>

              <button
                type="button"
                className={styles.profileMenuLogout}
                onClick={handleLogout}
              >
                <LogOut size={15} />
                <span>Logout</span>
              </button>
            </div>
          )}

        </div>

      </aside>

    </>
  );
}
