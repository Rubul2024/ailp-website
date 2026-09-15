"use client";

/* ==========================================================
   AILP Membership Card Page
   All India Labour Party
========================================================== */

import { useEffect, useState } from "react";
import {
  Download,
  ShieldCheck,
  BadgeCheck,
  ShieldAlert,
  QrCode,
  RefreshCw,
  AlertCircle,
} from "lucide-react";

import styles from "./Card.module.css";

function calculateAge(dateOfBirth) {
  if (!dateOfBirth) return null;
  const dob = new Date(dateOfBirth);
  if (Number.isNaN(dob.getTime())) return null;
  return Math.floor((Date.now() - dob.getTime()) / (1000 * 60 * 60 * 24 * 365.25));
}

function formatDate(date) {
  if (!date) return "—";
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return "—";
  return parsed.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

export default function MembershipCardPage() {
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState("");

  async function fetchCard() {
    try {
      setLoading(true);
      setError("");
      const res = await fetch("/api/member/card", { credentials: "include", cache: "no-store" });
      const data = await res.json();

      if (data.success && data.card) {
        setCard(data.card);
      } else {
        setCard(null);
      }
    } catch (err) {
      setError("Unable to load your membership card. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCard();
  }, []);

  async function handleGenerate() {
    try {
      setGenerating(true);
      setError("");
      const res = await fetch("/api/member/generate-card", {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Unable to generate your membership card.");
      }

      await fetchCard();
    } catch (err) {
      setError(err.message || "Unable to generate your membership card.");
    } finally {
      setGenerating(false);
    }
  }

  async function handleDownload() {
    try {
      setDownloading(true);
      const res = await fetch("/api/member/download-card", {
        credentials: "include",
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Unable to download your membership card.");
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${card?.membershipId || "AILP-Membership-Card"}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError(err.message || "Unable to download your membership card.");
    } finally {
      setDownloading(false);
    }
  }

  if (loading) {
    return (
      <div className={styles.loadingWrapper}>
        <RefreshCw size={28} className={styles.spinner} />
        <p>Loading your membership card...</p>
      </div>
    );
  }

  const age = calculateAge(card?.dateOfBirth);
  const photoUrl = card?.photo?.url || "/images/avatar.png";

  return (
    <div className={styles.pageContainer}>
      <div className={styles.headerBar}>
        <div>
          <span className={styles.categoryBadge}>
            <ShieldCheck size={13} /> Official Party Credential
          </span>
          <h1 className={styles.pageHeading}>Membership Card</h1>
          <p className={styles.pageSubheading}>
            Your official All India Labour Party digital membership identity card.
          </p>
        </div>

        {card?.cardGenerated && (
          <button type="button" className={styles.downloadBtn} onClick={handleDownload} disabled={downloading}>
            <Download size={16} />
            <span>{downloading ? "Preparing..." : "Download PDF"}</span>
          </button>
        )}
      </div>

      {error && (
        <div className={styles.errorBox}>
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      {!card?.cardGenerated ? (
        <div className={styles.generatePrompt}>
          <ShieldAlert size={40} />
          <h3>Your Membership Card Hasn&apos;t Been Generated Yet</h3>
          <p>Generate your official digital membership card to view, download and share it.</p>
          <button type="button" className={styles.generateBtn} onClick={handleGenerate} disabled={generating}>
            <BadgeCheck size={16} />
            <span>{generating ? "Generating..." : "Generate My Card"}</span>
          </button>
        </div>
      ) : (
        <div className={styles.cardWorkspace}>
          <div className={styles.idCard}>
            {/* Curved tricolor bands — same path geometry as the downloaded PDF */}
            <svg
              className={styles.cardSvgBg}
              viewBox="0 0 580 366"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M 580 0 L 452 0 Q 405 90 452 183 Q 495 268 452 366 L 580 366 Z"
                fill="#D8432E"
              />
              <path
                d="M 452 0 L 440 0 Q 393 90 440 183 Q 483 268 440 366 L 452 366 Q 495 268 452 183 Q 405 90 452 0 Z"
                fill="#FF9933"
              />
              <path
                d="M 0 366 L 0 258 Q 130 262 190 300 Q 230 326 200 366 Z"
                fill="#1B8A3D"
              />
            </svg>

            <span className={styles.statusPill}>{card?.membershipStatus || "REGISTERED"}</span>

            <div className={styles.bandLabel}>
              <strong>ALL INDIA LABOUR PARTY</strong>
              <span>Regd. No. 56/119/2018-18/PPS-I</span>
            </div>

            <div className={styles.cardBody}>
              <span className={styles.identityBadge}>IDENTITY CARD</span>

              <div className={styles.contentRow}>
                <img src={photoUrl} alt={card?.fullName || "Member"} className={styles.memberPhoto} />

                <div className={styles.fields}>
                  <h2 className={styles.memberName}>{card?.fullName || "—"}</h2>

                  <div className={styles.fieldRow}>
                    <label>DOB</label>
                    <span>
                      {formatDate(card?.dateOfBirth)}
                      {age !== null ? ` (${age} yrs)` : ""}
                    </span>
                  </div>
                  <div className={styles.fieldRow}>
                    <label>Gender</label>
                    <span>{card?.gender || "—"}</span>
                  </div>
                  <div className={styles.fieldRow}>
                    <label>Mobile</label>
                    <span>{card?.mobile || "—"}</span>
                  </div>
                  <div className={styles.fieldRow}>
                    <label>Blood Group</label>
                    <span>{card?.bloodGroup || "—"}</span>
                  </div>
                  <div className={styles.fieldRow}>
                    <label>District</label>
                    <span>
                      {card?.district || "—"}, {card?.state || "—"}
                    </span>
                  </div>
                  {card?.assembly && (
                    <div className={styles.fieldRow}>
                      <label>Assembly</label>
                      <span>{card.assembly}</span>
                    </div>
                  )}

                  <p className={styles.membershipId}>{card?.membershipId || "Pending Allocation"}</p>
                </div>
              </div>
            </div>

            <div className={styles.signatureBlock}>
              <span className={styles.signatureCaption}>National President</span>
              <img src="/images/party-president-signature.png" alt="Signature" className={styles.signatureImg} />
              <span className={styles.signatureCaption}>All India Labour Party</span>
            </div>

            <div className={styles.qrColumn}>
              {card?.qrCode ? (
                <img src={card.qrCode} alt="Verification QR" className={styles.qrImage} />
              ) : (
                <div className={styles.qrPlaceholder}>
                  <QrCode size={30} />
                </div>
              )}
              <span>SCAN TO VERIFY</span>
            </div>
          </div>

          <p className={styles.helperText}>
            This is a preview of your official card. The downloaded PDF reflects the same design.
          </p>
        </div>
      )}
    </div>
  );
}
