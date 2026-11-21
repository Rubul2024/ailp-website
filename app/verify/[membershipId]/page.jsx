/* ==========================================================
   Membership Verification (opened by scanning an ID card QR)
   Server-rendered on every request so it always shows the
   member's current record.
========================================================== */

import Link from "next/link";
import {
  BadgeCheck,
  CalendarDays,
  Clock,
  CreditCard,
  IdCard,
  MapPin,
  ShieldAlert,
  ShieldCheck,
  ShieldX,
  UserRound,
} from "lucide-react";

import { verifyMembership } from "@/lib/memberVerification";
import { getInitials } from "@/lib/memberProfile";
import styles from "./Verify.module.css";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Membership Verification | All India Labour Party",
  description: "Verify an All India Labour Party membership ID card.",
  robots: { index: false, follow: false },
};

const SUPPORT_EMAIL = "allindialabourpartyailp@gmail.com";

function formatDate(value) {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric", timeZone: "Asia/Kolkata" });
}

const STATUS = {
  active: {
    tone: "ok",
    icon: ShieldCheck,
    title: "Verified member",
    text: "This is a genuine All India Labour Party membership card.",
    pill: "Active",
  },
  registered: {
    tone: "warn",
    icon: ShieldAlert,
    title: "Registered member",
    text: "This person is registered with the party, but their ID card has not been issued yet.",
    pill: "Card not issued",
  },
  inactive: {
    tone: "bad",
    icon: ShieldX,
    title: "Membership not active",
    text: "This membership has been deactivated. This card is no longer valid.",
    pill: "Inactive",
  },
  not_found: {
    tone: "bad",
    icon: ShieldX,
    title: "No member found",
    text: "We couldn't find a member with this ID. The card may be fake or the QR code damaged.",
  },
  invalid: {
    tone: "bad",
    icon: ShieldX,
    title: "Invalid membership ID",
    text: "This link does not contain a valid membership ID. Please scan the QR code on the card again.",
  },
  error: {
    tone: "warn",
    icon: ShieldAlert,
    title: "Verification unavailable",
    text: "We couldn't check this membership right now. Please try again in a moment.",
  },
};

export default async function VerifyMemberPage({ params }) {
  const { membershipId: rawId } = await params;

  let result;
  try {
    result = await verifyMembership(rawId);
  } catch (error) {
    console.error("Verification page error:", error);
    result = { status: "error" };
  }

  const info = STATUS[result.status];
  const StatusIcon = info.icon;
  const member = result.member;
  const checkedAt = new Date().toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "Asia/Kolkata",
  });

  return (
    <div className={styles.page}>
      <main className={styles.shell}>
        {/* Party header */}
        <header className={styles.header}>
          <span className={styles.logo}>
            <img src="/images/ailp-symbol-logo.svg" alt="" width={44} height={44} />
          </span>
          <div>
            <p className={styles.party}>All India Labour Party</p>
            <p className={styles.headerSub}>Official membership verification</p>
          </div>
        </header>
        <span className={styles.tricolor} aria-hidden="true" />

        {/* Result banner */}
        <section className={`${styles.banner} ${styles[info.tone]}`} role="status">
          <span className={styles.bannerIcon}>
            <StatusIcon size={26} aria-hidden="true" />
          </span>
          <div>
            <h1 className={styles.bannerTitle}>{info.title}</h1>
            <p className={styles.bannerText}>{info.text}</p>
          </div>
        </section>

        {member ? (
          <section className={styles.card} aria-label="Member details">
            <div className={styles.identity}>
              {member.photo ? (
                <img src={member.photo} alt={`Photo of ${member.fullName}`} className={styles.photo} />
              ) : (
                <span className={`${styles.photo} ${styles.photoEmpty}`} aria-hidden="true">
                  {getInitials(member.fullName)}
                </span>
              )}
              <div className={styles.identityText}>
                <h2 className={styles.name}>{member.fullName}</h2>
                <p className={styles.role}>{member.designation}</p>
                {info.pill && <span className={`${styles.pill} ${styles[`pill_${info.tone}`]}`}>{info.pill}</span>}
                {member.verifiedByOffice && result.status === "active" && (
                  <span className={styles.officeBadge}>
                    <BadgeCheck size={14} aria-hidden="true" /> Verified by party office
                  </span>
                )}
              </div>
            </div>

            <dl className={styles.facts}>
              <div>
                <dt>
                  <CreditCard size={16} aria-hidden="true" /> Membership ID
                </dt>
                <dd className={styles.mono}>{member.membershipId}</dd>
              </div>
              <div>
                <dt>
                  <MapPin size={16} aria-hidden="true" /> District
                </dt>
                <dd>{[member.district, member.state].filter(Boolean).join(", ") || "—"}</dd>
              </div>
              <div>
                <dt>
                  <CalendarDays size={16} aria-hidden="true" /> Member since
                </dt>
                <dd>{formatDate(member.memberSince)}</dd>
              </div>
              <div>
                <dt>
                  <IdCard size={16} aria-hidden="true" /> ID card issued
                </dt>
                <dd>{member.cardIssuedOn ? formatDate(member.cardIssuedOn) : "Not yet issued"}</dd>
              </div>
            </dl>

            <p className={styles.compare}>
              <UserRound size={15} aria-hidden="true" />
              Check that the photo and name match the card and the person presenting it.
            </p>
          </section>
        ) : (
          result.membershipId && (
            <section className={styles.card}>
              <dl className={styles.facts}>
                <div>
                  <dt>
                    <CreditCard size={16} aria-hidden="true" /> ID checked
                  </dt>
                  <dd className={styles.mono}>{result.membershipId}</dd>
                </div>
              </dl>
            </section>
          )
        )}

        <p className={styles.checked}>
          <Clock size={14} aria-hidden="true" /> Checked live on {checkedAt} IST
        </p>

        <footer className={styles.footer}>
          <p>
            Suspect a fake card? Email <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
          </p>
          <Link href="/" className={styles.siteLink}>
            Visit allindialabourparty.com
          </Link>
          <p className={styles.regd}>Regd. No. 56/119/2018-18/PPS-I</p>
        </footer>
      </main>
    </div>
  );
}
