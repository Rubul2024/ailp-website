"use client";

/* ==========================================================
   My ID Card
========================================================== */

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  AlertCircle,
  BadgeCheck,
  CheckCircle2,
  Circle,
  Download,
  ExternalLink,
  Loader2,
  Printer,
  RefreshCw,
  RotateCw,
  UserRound,
} from "lucide-react";

import { useMember } from "@/components/member/MemberContext";
import IdCardPreview from "@/components/member/IdCardPreview";
import { CARD_REQUIRED_FIELDS, getCardReadiness } from "@/lib/memberProfile";
import { issuedLabel } from "@/lib/idCard";
import ui from "@/components/member/ui.module.css";
import styles from "./Card.module.css";

export default function IdCardPage() {
  const { member, loading, error: loadError, setMember } = useMember();
  const [side, setSide] = useState("front");
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
  const issued = Boolean(member.cardGenerated && member.membershipId);

  return (
    <div className={styles.page}>
      {/* Heading */}
      <header className={styles.head}>
        <div className={styles.headText}>
          <h1 className={ui.pageTitle}>My ID Card</h1>
          <p className={ui.pageSub}>
            {issued
              ? "Your official All India Labour Party membership card."
              : "Complete a few details to get your official membership card."}
          </p>
        </div>

        {issued && (
          <div className={styles.headActions}>
            <Link href={`/verify/${member.membershipId}`} target="_blank" className={`${ui.btn} ${ui.btnSecondary}`}>
              <ExternalLink size={16} /> Verify
            </Link>
            <button type="button" className={`${ui.btn} ${ui.btnPrimary}`} onClick={download} disabled={downloading}>
              {downloading ? <Loader2 size={16} className={ui.spin} /> : <Download size={16} />}
              {downloading ? "Preparing…" : "Download PDF"}
            </button>
          </div>
        )}
      </header>

      {issued && !readiness.ready && (
        <div className={`${ui.alert} ${ui.alertWarn}`}>
          <AlertCircle size={18} />
          <span>
            Your card is missing: {readiness.missing.map((m) => m.label.toLowerCase()).join(", ")}.{" "}
            <Link href="/member/profile">Add them in your profile</Link>.
          </span>
        </div>
      )}

      <div className={styles.layout}>
        {/* Card stage */}
        <section className={styles.stage} aria-label="ID card preview">
          <div className={styles.stageTop}>
            <div className={styles.toggle} role="tablist" aria-label="Card side">
              {["front", "back"].map((s) => (
                <button
                  key={s}
                  type="button"
                  role="tab"
                  aria-selected={side === s}
                  className={side === s ? styles.toggleOn : ""}
                  onClick={() => setSide(s)}
                >
                  {s === "front" ? "Front" : "Back"}
                </button>
              ))}
            </div>
            <button
              type="button"
              className={styles.flipBtn}
              onClick={() => setSide((v) => (v === "front" ? "back" : "front"))}
              aria-label="Flip card"
            >
              <RotateCw size={15} /> Flip
            </button>
          </div>

          <div className={`${styles.flip} ${side === "back" ? styles.flipped : ""}`}>
            <div className={styles.flipInner}>
              <div className={styles.faceFront} aria-hidden={side !== "front"}>
                <IdCardPreview member={member} side="front" />
              </div>
              <div className={styles.faceBack} aria-hidden={side !== "back"}>
                <IdCardPreview member={member} side="back" />
              </div>
            </div>
          </div>

          <p className={styles.stageNote}>
            <Printer size={14} /> Standard ID-1 size · 85.6 × 54 mm · PDF includes front and back
          </p>
        </section>

        {/* Side panel */}
        <aside className={`${ui.card} ${styles.panel}`}>
          {issued ? (
            <>
              <div className={styles.panelHead}>
                <span className={styles.panelIcon}>
                  <BadgeCheck size={20} />
                </span>
                <div>
                  <h2>Card active</h2>
                  <p>Valid membership card</p>
                </div>
              </div>

              <dl className={styles.facts}>
                <div>
                  <dt>Member ID</dt>
                  <dd className={styles.mono}>{member.membershipId}</dd>
                </div>
                <div>
                  <dt>Name</dt>
                  <dd>{member.fullName}</dd>
                </div>
                <div>
                  <dt>Issued on</dt>
                  <dd>{issuedLabel(member)}</dd>
                </div>
                <div>
                  <dt>Format</dt>
                  <dd>PDF · 2 pages</dd>
                </div>
              </dl>

              <p className={styles.panelNote}>
                The download always uses your latest profile details. Anyone can scan the QR code to confirm your membership.
              </p>

              <div className={styles.panelActions}>
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
              <div className={styles.panelHead}>
                <div>
                  <h2>{readiness.ready ? "Ready to generate" : "Get your ID card"}</h2>
                  <p>
                    {readiness.ready
                      ? "Your profile has everything the card needs."
                      : `${readiness.done} of ${readiness.total} details complete`}
                  </p>
                </div>
              </div>

              <span className={styles.progress} aria-hidden="true">
                <span style={{ width: `${readiness.percent}%` }} />
              </span>

              <ol className={styles.checklist}>
                {CARD_REQUIRED_FIELDS.map((f) => {
                  const done = !missing.has(f.key);
                  return (
                    <li key={f.key} className={done ? styles.done : ""}>
                      {done ? <CheckCircle2 size={16} /> : <Circle size={16} />}
                      {f.label}
                    </li>
                  );
                })}
              </ol>

              {readiness.ready ? (
                <button type="button" className={`${ui.btn} ${ui.btnPrimary} ${ui.btnBlock}`} onClick={generate} disabled={generating}>
                  {generating ? <Loader2 size={16} className={ui.spin} /> : <BadgeCheck size={16} />}
                  {generating ? "Generating…" : "Generate my ID card"}
                </button>
              ) : (
                <Link href="/member/profile" className={`${ui.btn} ${ui.btnPrimary} ${ui.btnBlock}`}>
                  <UserRound size={16} /> Complete profile
                </Link>
              )}
            </>
          )}
        </aside>
      </div>

      {/* Mobile: keep the main action within thumb reach */}
      {issued && (
        <div className={styles.mobileBar}>
          <button type="button" className={`${ui.btn} ${ui.btnPrimary} ${ui.btnBlock}`} onClick={download} disabled={downloading}>
            {downloading ? <Loader2 size={16} className={ui.spin} /> : <Download size={16} />}
            {downloading ? "Preparing PDF…" : "Download ID card (PDF)"}
          </button>
        </div>
      )}
    </div>
  );
}
