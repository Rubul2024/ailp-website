"use client";

/* ==========================================================
   AILP Digital Membership Card
   All India Labour Party
   Production Ready
========================================================== */

import { useEffect, useState } from "react";

import Image from "next/image";

import QRCode from "qrcode";

import {
  Download,
  Printer,
  Share2,
  BadgeCheck,
  User,
  Mail,
  Phone,
  MapPin,
  CalendarDays,
  ShieldCheck,
} from "lucide-react";

import styles from "./MembershipCard.module.css";

/* ==========================================================
   Component
========================================================== */

export default function MembershipCard({ member = {} }) {
  const [qrImage, setQrImage] = useState("");

  const [shareLoading, setShareLoading] = useState(false);

  /* ========================================================
     Member Data
  ======================================================== */

  const fullName = member?.fullName || "AILP Member";

  const membershipId = member?.membershipId || "AILP00000000";

  const email = member?.email || "Not Available";

  const mobile = member?.mobile || "Not Available";

  const district = member?.district || "";

  const state = member?.state || "";

  const joinDate = member?.joinDate
    ? new Date(member.joinDate).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Not Available";

  /* ========================================================
     Location
  ======================================================== */

  const location =
    [district, state].filter(Boolean).join(", ") || "Not Available";

  /* ========================================================
     Profile Photo
  ======================================================== */

  const photo = member?.photo?.url || "/images/member-placeholder.png";

  /* ========================================================
     Membership Status
  ======================================================== */

  const membershipStatus = member?.membershipStatus || "REGISTERED";

  /* ========================================================
     Profile Status
  ======================================================== */

  const profileStatus = member?.profileCompleted
    ? "Profile Completed"
    : "Profile Pending";

  /* ========================================================
     Generate Verification URL
  ======================================================== */

  const getVerificationURL = () => {
    const baseURL = process.env.NEXT_PUBLIC_APP_URL || window.location.origin;

    return `${baseURL}/verify/${membershipId}`;
  };

  /* ========================================================
     Generate QR Code
  ======================================================== */

  useEffect(() => {
    let cancelled = false;

    async function generateQRCode() {
      if (!membershipId) {
        return;
      }

      try {
        const verifyURL = getVerificationURL();

        const qr = await QRCode.toDataURL(verifyURL, {
          width: 320,

          margin: 2,

          errorCorrectionLevel: "H",

          color: {
            dark: "#0F172A",
            light: "#FFFFFF",
          },
        });

        if (!cancelled) {
          setQrImage(qr);
        }
      } catch (error) {
        console.error("QR Generation Error:", error);
      }
    }

    generateQRCode();

    return () => {
      cancelled = true;
    };
  }, [membershipId]);

  /* ========================================================
     Download PDF
     
     Browser print dialog allows:
     
     Print → Save as PDF
     
     This keeps the exact card print CSS.
  ======================================================== */

  function handleDownloadPDF() {
    window.print();
  }

  /* ========================================================
     Print
  ======================================================== */

  function handlePrint() {
    window.print();
  }

  /* ========================================================
     Share Membership Card
  ======================================================== */

  async function handleShare() {
    if (shareLoading) {
      return;
    }

    setShareLoading(true);

    try {
      const verificationURL = getVerificationURL();

      /* ====================================================
         Native Mobile / Browser Share
      ==================================================== */

      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({
          title: "AILP Digital Membership Card",

          text: `${fullName} is a member of All India Labour Party. Membership ID: ${membershipId}`,

          url: verificationURL,
        });

        return;
      }

      /* ====================================================
         Fallback: Copy Verification Link
      ==================================================== */

      if (navigator.clipboard) {
        await navigator.clipboard.writeText(verificationURL);

        alert("Membership verification link copied successfully.");
      } else {
        alert("Sharing is not supported on this device.");
      }
    } catch (error) {
      /* User cancelled share dialog */

      if (error?.name !== "AbortError") {
        console.error("Share Error:", error);

        alert("Unable to share the membership card.");
      }
    } finally {
      setShareLoading(false);
    }
  }

  /* ========================================================
     Render
  ======================================================== */

  return (
    <div className={styles.wrapper}>
      {/* ====================================================
          ACTION BAR

          Hidden automatically during printing.
      ==================================================== */}

      <div className={styles.actions} aria-label="Membership card actions">
        {/* Download PDF */}

        <button
          type="button"
          onClick={handleDownloadPDF}
          className={styles.downloadButton}
        >
          <Download size={17} />

          <span>Download PDF</span>
        </button>

        {/* Print */}

        <button
          type="button"
          onClick={handlePrint}
          className={styles.printButton}
        >
          <Printer size={17} />

          <span>Print</span>
        </button>

        {/* Share */}

        <button
          type="button"
          onClick={handleShare}
          disabled={shareLoading}
          className={styles.shareButton}
        >
          <Share2 size={17} />

          <span>{shareLoading ? "Sharing..." : "Share"}</span>
        </button>
      </div>

      {/* ====================================================
          MEMBERSHIP CARD

          IMPORTANT:
          Do not place action buttons inside this element.
          This keeps the actual card clean for printing.
      ==================================================== */}

      <article
        className={styles.card}
        aria-label="AILP Digital Membership Card"
      >
        {/* ==================================================
            HEADER
        ================================================== */}

        <header className={styles.header}>
          <div className={styles.logoArea}>
            <div className={styles.logoWrapper}>
              <Image
                src="/logo.png"
                alt="All India Labour Party"
                width={48}
                height={48}
                priority
              />
            </div>

            <div className={styles.brandText}>
              <h2>ALL INDIA LABOUR PARTY</h2>

              <p>Official Digital Membership Card</p>
            </div>
          </div>

          {/* Status */}

          <div className={styles.status}>
            <BadgeCheck size={15} />

            <span>{membershipStatus}</span>
          </div>
        </header>

        {/* ==================================================
            CARD BODY
        ================================================== */}

        <div className={styles.body}>
          {/* =================================================
              PROFILE
          ================================================= */}

          <section className={styles.profile}>
            <div className={styles.photoBox}>
              <Image
                src={photo}
                alt={`${fullName} profile photograph`}
                width={110}
                height={110}
                className={styles.photo}
              />
            </div>

            <h3 className={styles.memberName}>{fullName}</h3>

            <p className={styles.membershipId}>{membershipId}</p>

            <div
              className={
                member?.profileCompleted
                  ? styles.profileComplete
                  : styles.profilePending
              }
            >
              <ShieldCheck size={15} />

              <span>{profileStatus}</span>
            </div>
          </section>

          {/* =================================================
              MEMBER DETAILS
          ================================================= */}

          <section className={styles.details}>
            {/* Member Name */}

            <div className={styles.row}>
              <div className={styles.rowIcon}>
                <User size={15} />
              </div>

              <div className={styles.rowContent}>
                <span>Member Name</span>

                <strong>{fullName}</strong>
              </div>
            </div>

            {/* Email */}

            <div className={styles.row}>
              <div className={styles.rowIcon}>
                <Mail size={15} />
              </div>

              <div className={styles.rowContent}>
                <span>Email</span>

                <strong>{email}</strong>
              </div>
            </div>

            {/* Mobile */}

            <div className={styles.row}>
              <div className={styles.rowIcon}>
                <Phone size={15} />
              </div>

              <div className={styles.rowContent}>
                <span>Mobile</span>

                <strong>{mobile}</strong>
              </div>
            </div>

            {/* District / State */}

            <div className={styles.row}>
              <div className={styles.rowIcon}>
                <MapPin size={15} />
              </div>

              <div className={styles.rowContent}>
                <span>District / State</span>

                <strong>{location}</strong>
              </div>
            </div>

            {/* Join Date */}

            <div className={styles.row}>
              <div className={styles.rowIcon}>
                <CalendarDays size={15} />
              </div>

              <div className={styles.rowContent}>
                <span>Join Date</span>

                <strong>{joinDate}</strong>
              </div>
            </div>
          </section>

          {/* =================================================
              QR + PRESIDENT SIGNATURE
          ================================================= */}

          <section className={styles.qrSection}>
            {/* QR Code */}

            <div className={styles.qrBox}>
              {qrImage ? (
                <Image
                  src={qrImage}
                  alt="Scan to verify membership"
                  width={100}
                  height={100}
                  className={styles.qrImage}
                  unoptimized
                />
              ) : (
                <div className={styles.qrLoading}>Loading...</div>
              )}
            </div>

            <span className={styles.qrLabel}>Scan to Verify</span>

            {/* =================================================
                PARTY PRESIDENT SIGNATURE
            ================================================= */}

            <div className={styles.presidentSignature}>
              <div className={styles.signatureImageBox}>
                <Image
                  src="/images/party-president-signature.png"
                  alt="Party President Signature"
                  width={90}
                  height={35}
                  className={styles.signatureImage}
                />
              </div>

              <div className={styles.signatureLine} />

              <strong>Party President</strong>
            </div>
          </section>
        </div>

        {/* ==================================================
            FOOTER
        ================================================== */}

        <footer className={styles.footer}>
          <span>This Digital Membership Card is issued by</span>

          <strong>All India Labour Party</strong>

          <span>and can be verified online.</span>
        </footer>
      </article>
    </div>
  );
}
