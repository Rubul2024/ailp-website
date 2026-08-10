"use client";

/* ==========================================================
   QR Section
   All India Labour Party
========================================================== */

import Image from "next/image";

import { QrCode } from "lucide-react";

import styles from "../MembershipCard.module.css";

export default function QRSection({
  member,
}) {
  return (
    <div className={styles.qrSection}>
      {member?.qrCode ? (
        <Image
          src={member.qrCode}
          alt="Member QR Code"
          width={95}
          height={95}
          className={styles.qrImage}
        />
      ) : (
        <div className={styles.qrPlaceholder}>
          <QrCode size={48} />

          <span>
            QR Code
            <br />
            Not Generated
          </span>
        </div>
      )}

      <small>
        Scan to verify membership
      </small>
    </div>
  );
}