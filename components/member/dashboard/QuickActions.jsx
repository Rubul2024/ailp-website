"use client";

/* ==========================================================
   Quick Actions
========================================================== */

import { useRouter } from "next/navigation";

import {
  User,
  BadgeCheck,
  IndianRupee,
  Settings,
} from "lucide-react";

import styles from "./Dashboard.module.css";

export default function QuickActions() {
  const router = useRouter();

  const actions = [
    {
      title: "My Profile",

      icon: User,

      path: "/member/profile",
    },

    {
      title: "Membership Card",

      icon: BadgeCheck,

      path: "/member/card",
    },

    {
      title: "Donate",

      icon: IndianRupee,

      path: "/member/donation",
    },

    {
      title: "Settings",

      icon: Settings,

      path: "/member/settings",
    },
  ];

  return (
    <section className={styles.quickActions}>
      <h2>Quick Actions</h2>

      <div className={styles.actionGrid}>
        {actions.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.title}
              className={
                styles.actionButton
              }
              onClick={() =>
                router.push(item.path)
              }
            >
              <Icon size={24} />

              <span>{item.title}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}