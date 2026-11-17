"use client";

/* ==========================================================
   My ID Card
========================================================== */

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  AlertCircle,
  ArrowLeft,
  BadgeCheck,
  CheckCircle2,
  Circle,
  Download,
  ExternalLink,
  Loader2,
  RefreshCw,
  UserRound,
} from "lucide-react";

import { useMember } from "@/components/member/MemberContext";
import IdCardPreview from "@/components/member/IdCardPreview";
import { CARD_REQUIRED_FIELDS, formatDate, getCardReadiness } from "@/lib/memberProfile";
import ui from "@/components/member/ui.module.css";
import styles from "./Card.module.css";

export default function IdCardPage() {
  const router = useRouter();
  const { member, loading, error: loadError, setMember } = useMember();
  const [generating, setGenerating] = useState(false);
  const [downloading, setDownloading] = useState(false);

  async function generate() {
    setGenerating(true);
    try {
      const res = await fetch("/api/member/generate-card", { method: "POST", credentials: "include" });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) throw new Error(data.message || "Unable to generate your ID card.");
      setMember(data.member);
      toast.success(data.message || "Your ID card is ready");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setGenerating(false);
    }
  }

  async function download() {
    setDownloading(true);
    try {
      const res = await fetch("/api/member/download-card", { credentials: "include", cache: "no-store" });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Unable to download your ID card.");
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `AILP-ID-Card-${member?.membershipId || "member"}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setDownloading(false);
    }
  }

  if (loading) {
    return (
      <div className={ui.loading}>
        <div className={ui.spinner} />
        Loading your ID card…
      </div>
    );
  }

  if (!member) {
    return (
      <div className={`${ui.alert} ${ui.alertError}`}>
        <AlertCircle size={18} /> {loadError || "Unable to load your ID card. Please refresh the page."}
      </div>
    );
  }

  const readiness = getCardReadiness(member);
  const missing = new Set(readiness.missing.map((m) => m.key));
  const issued = member.cardGenerated && member.membershipId;

  return (
    <div className={styles.page}>
      <div className={styles.head}>
        <button type="button" className={styles.back} onClick={() => router.back()} aria-label="Go back">
          <ArrowLeft size={20} />
        </button>
        <div className={styles.headText}>
          <h1 className={ui.pageTitle}>ID Card — {member.fullName}</h1>
          <p className={ui.pageSub}>{member.membershipId || "Membership ID will be assigned when your profile is complete"}</p>
        </div>
      </div>

      {issued ? (
        <div className={styles.actions}>
          <button type="button" className={`${ui.btn} ${ui.btnPrimary}`} onClick={download} disabled={downloading}>
            {downloading ? <Loader2 size={17} className={ui.spin} /> : <Download size={17} />}
            {downloading ? "Preparing PDF…" : "Download PDF"}
          </button>
          <Link href={`/verify/${member.membershipId}`} target="_blank" className={`${ui.btn} ${ui.btnSecondary}`}>
            <ExternalLink size={16} /> Verification page
          </Link>
        </div>
      ) : null}

      {issued && !readiness.ready && (
        <div className={`${ui.alert} ${ui.alertWarn}`}>
          <AlertCircle size={18} />
          <span>
            Your card is missing: {readiness.missing.map((m) => m.label.toLowerCase()).join(", ")}.{" "}
            <Link href="/member/profile">Add them in your profile</Link> so your card is complete.
          </span>
        </div>
      )}

      <div className={styles.layout}>
        <div className={styles.preview}>
          <IdCardPreview member={member} />
          {issued && (
            <p className={styles.meta}>
              Issued {formatDate(member.cardGeneratedAt)} · The PDF always uses your latest profile details.
            </p>
          )}
        </div>

        <aside className={`${ui.card} ${styles.side}`}>
          {issued ? (
            <>
              <div className={styles.sideIcon}>
                <BadgeCheck size={22} />
              </div>
              <h2>Your ID card is active</h2>
              <p>Download the PDF to print or share it. Anyone can scan the QR code to confirm your membership.</p>
              <div className={styles.sideLinks}>
                <Link href="/member/profile" className={`${ui.btn} ${ui.btnSecondary} ${ui.btnBlock}`}>
                  <UserRound size={16} /> Update details
                </Link>
                <button type="button" className={`${ui.btn} ${ui.btnGhost}`} onClick={generate} disabled={generating}>
                  {generating ? <Loader2 size={15} className={ui.spin} /> : <RefreshCw size={15} />}
                  {generating ? "Refreshing…" : "Refresh card"}
                </button>
              </div>
            </>
          ) : (
            <>
              <h2>{readiness.ready ? "Ready to generate" : "Get your ID card"}</h2>
              <p>
                {readiness.ready
                  ? "Your profile has everything needed. Generate your card now."
                  : "Complete these details in your profile, then generate your card."}
              </p>

              <ol className={styles.checklist}>
                {CARD_REQUIRED_FIELDS.map((f) => {
                  const done = !missing.has(f.key);
                  return (
                    <li key={f.key} className={done ? styles.done : ""}>
                      {done ? <CheckCircle2 size={17} /> : <Circle size={17} />}
                      {f.label}
                    </li>
                  );
                })}
              </ol>

              {readiness.ready ? (
                <button type="button" className={`${ui.btn} ${ui.btnPrimary} ${ui.btnBlock}`} onClick={generate} disabled={generating}>
                  {generating ? <Loader2 size={17} className={ui.spin} /> : <BadgeCheck size={17} />}
                  {generating ? "Generating…" : "Generate my ID card"}
                </button>
              ) : (
                <Link href="/member/profile" className={`${ui.btn} ${ui.btnPrimary} ${ui.btnBlock}`}>
                  <UserRound size={17} /> Complete profile ({readiness.done}/{readiness.total})
                </Link>
              )}
            </>
          )}
        </aside>
      </div>
    </div>
  );
}
