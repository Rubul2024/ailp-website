"use client";

/* ==========================================================
   Member Dashboard
========================================================== */

import Link from "next/link";
import {
  AlertCircle,
  ArrowRight,
  ArrowUpRight,
  HeartHandshake,
  IdCard,
  Settings,
  Sparkles,
  UserRound,
} from "lucide-react";

import { useMember } from "@/components/member/MemberContext";
import IdCardPreview from "@/components/member/IdCardPreview";
import { STATUS_LABELS, formatDate, getCardReadiness } from "@/lib/memberProfile";
import ui from "@/components/member/ui.module.css";
import styles from "./Dashboard.module.css";

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

const QUICK_LINKS = [
  { href: "/member/card", icon: IdCard, title: "My ID Card", text: "View & download" },
  { href: "/member/profile", icon: UserRound, title: "My Profile", text: "Update your details" },
  { href: "/member/donation", icon: HeartHandshake, title: "Donate", text: "Support the party" },
  { href: "/member/settings", icon: Settings, title: "Settings", text: "Password & account" },
];

export default function MemberDashboard() {
  const { member, loading, error } = useMember();

  if (loading) {
    return (
      <div className={ui.loading}>
        <div className={ui.spinner} />
        Loading your dashboard…
      </div>
    );
  }

  if (!member) {
    return (
      <div className={`${ui.alert} ${ui.alertError}`}>
        <AlertCircle size={18} /> {error || "Unable to load your dashboard. Please refresh the page."}
      </div>
    );
  }

  const readiness = getCardReadiness(member);
  const issued = member.cardGenerated && member.membershipId;
  const firstName = (member.fullName || "Member").split(" ")[0];
  const today = new Date().toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric" });

  let next = null;
  if (!readiness.ready) {
    next = {
      title: "Complete your profile to get your ID card",
      text: `Still needed: ${readiness.missing.map((m) => m.label.toLowerCase()).join(", ")}.`,
      href: "/member/profile",
      cta: "Complete profile",
      progress: readiness.percent,
    };
  } else if (!issued) {
    next = {
      title: "Your profile is complete — generate your ID card",
      text: "It takes a few seconds. You can download it as a PDF right after.",
      href: "/member/card",
      cta: "Get ID card",
    };
  }

  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroMain}>
          <div className={styles.heroMeta}>
            <span className={`${ui.pill} ${ui.pillAccent}`}>AILP Member</span>
            <span className={styles.date}>{today}</span>
          </div>
          <h1 className={styles.greeting}>
            {greeting()}, {firstName}
            <Sparkles size={20} className={styles.sparkle} aria-hidden="true" />
          </h1>
          <p className={styles.heroSub}>Welcome to your All India Labour Party member portal.</p>
        </div>

        <dl className={styles.heroStats}>
          <div>
            <dt>Member ID</dt>
            <dd className={styles.mono}>{member.membershipId || "Pending"}</dd>
          </div>
          <div>
            <dt>Status</dt>
            <dd className={issued ? styles.ok : styles.warn}>{STATUS_LABELS[member.membershipStatus] || "Registered"}</dd>
          </div>
          <div>
            <dt>Profile</dt>
            <dd className={readiness.ready ? styles.ok : styles.warn}>{readiness.percent}%</dd>
          </div>
        </dl>
      </section>

      {/* Next step */}
      {next && (
        <Link href={next.href} className={styles.next}>
          <div className={styles.nextIcon}>
            <IdCard size={22} />
          </div>
          <div className={styles.nextBody}>
            <strong>{next.title}</strong>
            <span>{next.text}</span>
            {typeof next.progress === "number" && (
              <span className={styles.bar} aria-hidden="true">
                <span style={{ width: `${next.progress}%` }} />
              </span>
            )}
          </div>
          <span className={`${ui.btn} ${ui.btnPrimary} ${styles.nextCta}`}>
            {next.cta} <ArrowRight size={16} />
          </span>
        </Link>
      )}

      <div className={styles.grid}>
        {/* ID card */}
        <section className={ui.card}>
          <div className={ui.cardHead}>
            <div>
              <h2 className={ui.cardTitle}>
                <IdCard size={18} /> My ID Card
              </h2>
              <p className={ui.cardHint}>
                {issued ? `Issued ${formatDate(member.cardGeneratedAt)}` : "Preview — not issued yet"}
              </p>
            </div>
            <Link href="/member/card" className={styles.viewAll}>
              {issued ? "Open" : "Get card"} <ArrowUpRight size={14} />
            </Link>
          </div>
          <div className={ui.cardPad}>
            <Link href="/member/card" className={styles.cardLink} aria-label="Open my ID card">
              <IdCardPreview member={member} />
            </Link>
          </div>
        </section>

        {/* Quick links + contribution */}
        <div className={styles.side}>
          <section className={ui.card}>
            <div className={ui.cardHead}>
              <h2 className={ui.cardTitle}>Quick actions</h2>
            </div>
            <ul className={styles.quick}>
              {QUICK_LINKS.map(({ href, icon: Icon, title, text }) => (
                <li key={href}>
                  <Link href={href}>
                    <span className={styles.quickIcon}>
                      <Icon size={18} />
                    </span>
                    <span className={styles.quickText}>
                      <strong>{title}</strong>
                      <small>{text}</small>
                    </span>
                    <ArrowUpRight size={16} className={styles.quickArrow} />
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className={`${ui.card} ${styles.contrib}`}>
            <span className={styles.contribLabel}>Total contributed</span>
            <strong>₹{Number(member.totalDonation || 0).toLocaleString("en-IN")}</strong>
            <span className={styles.contribHint}>
              {member.donationCount ? `${member.donationCount} contribution${member.donationCount > 1 ? "s" : ""}` : "No contributions yet"}
            </span>
          </section>
        </div>
      </div>
    </div>
  );
}
