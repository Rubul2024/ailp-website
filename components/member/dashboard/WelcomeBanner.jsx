"use client";

/* ==========================================================
   Welcome Banner
   All India Labour Party
   Production Ready
========================================================== */

import Image from "next/image";

import {
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

import { useRouter } from "next/navigation";

import styles from "./Dashboard.module.css";

export default function WelcomeBanner({
  member,
}) {
  const router = useRouter();

  return (
    <section className={styles.banner}>
      {/* Left */}

      <div className={styles.bannerContent}>
        <span className={styles.badge}>
          <ShieldCheck size={16} />

          Member Portal
        </span>

        <h1>
          Welcome,

          <span>
            {" "}
            {member.fullName}
          </span>
        </h1>

        <p>
          Manage your membership,
          digital card, profile and
          donations from one place.
        </p>

        <button
          onClick={() =>
            router.push(
              "/member/profile"
            )
          }
          className={styles.bannerButton}
        >
          Complete Profile

          <ArrowRight size={18} />
        </button>
      </div>

      {/* Right */}

      <div className={styles.bannerImage}>
        <Image
          src={
            member?.photo?.url ||
            member?.photo ||
            "/images/avatar.png"
          }
          alt="Member"

          width={170}

          height={170}

          priority
        />
      </div>
    </section>
  );
}