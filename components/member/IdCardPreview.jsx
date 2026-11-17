/* ==========================================================
   ID Card Preview
   On-screen replica of the downloadable PDF card
   (pdf/MembershipCardPDF.jsx). Keep the two in sync.
========================================================== */

import { QrCode } from "lucide-react";

import {
  STATUS_LABELS,
  calculateAge,
  formatDate,
  getInitials,
  getPhotoUrl,
} from "@/lib/memberProfile";
import styles from "./IdCardPreview.module.css";

export default function IdCardPreview({ member }) {
  const photoUrl = getPhotoUrl(member?.photo);
  const age = calculateAge(member?.dateOfBirth);

  return (
    <div className={styles.wrap}>
      <div className={styles.idCard} role="img" aria-label={`ID card for ${member?.fullName || "member"}`}>
        <svg className={styles.bg} viewBox="0 0 580 366" preserveAspectRatio="none" aria-hidden="true">
          <path d="M 580 0 L 452 0 Q 405 90 452 183 Q 495 268 452 366 L 580 366 Z" fill="#D8432E" />
          <path
            d="M 452 0 L 440 0 Q 393 90 440 183 Q 483 268 440 366 L 452 366 Q 495 268 452 183 Q 405 90 452 0 Z"
            fill="#FF9933"
          />
          <path d="M 0 366 L 0 258 Q 130 262 190 300 Q 230 326 200 366 Z" fill="#1B8A3D" />
        </svg>

        <span className={styles.statusPill}>
          {STATUS_LABELS[member?.membershipStatus] || "Registered"}
        </span>

        <div className={styles.band}>
          <strong>ALL INDIA LABOUR PARTY</strong>
          <span>Regd. No. 56/119/2018-18/PPS-I</span>
        </div>

        <div className={styles.body}>
          <span className={styles.badge}>IDENTITY CARD</span>

          <div className={styles.row}>
            {photoUrl ? (
              <img src={photoUrl} alt="" className={styles.photo} />
            ) : (
              <div className={`${styles.photo} ${styles.photoEmpty}`}>{getInitials(member?.fullName)}</div>
            )}

            <div className={styles.fields}>
              <p className={styles.name}>{member?.fullName || "—"}</p>
              <dl>
                <div className={styles.fieldRow}>
                  <dt>DOB</dt>
                  <dd>
                    {formatDate(member?.dateOfBirth)}
                    {age !== null ? ` (${age} yrs)` : ""}
                  </dd>
                </div>
                <div className={styles.fieldRow}>
                  <dt>Gender</dt>
                  <dd>{member?.gender || "—"}</dd>
                </div>
                <div className={styles.fieldRow}>
                  <dt>Mobile</dt>
                  <dd>{member?.mobile || "—"}</dd>
                </div>
                <div className={styles.fieldRow}>
                  <dt>Blood Group</dt>
                  <dd>{member?.bloodGroup || "—"}</dd>
                </div>
                <div className={styles.fieldRow}>
                  <dt>District</dt>
                  <dd>
                    {member?.district || "—"}, {member?.state || "—"}
                  </dd>
                </div>
                {member?.assembly && (
                  <div className={styles.fieldRow}>
                    <dt>Assembly</dt>
                    <dd>{member.assembly}</dd>
                  </div>
                )}
              </dl>
              <p className={styles.memberId}>{member?.membershipId || "ID pending"}</p>
            </div>
          </div>
        </div>

        <div className={styles.sign}>
          <span>National President</span>
          <img src="/images/party-president-signature.png" alt="" />
          <span>All India Labour Party</span>
        </div>

        <div className={styles.qr}>
          {member?.qrCode ? (
            <img src={member.qrCode} alt="" />
          ) : (
            <div className={styles.qrEmpty}>
              <QrCode size={22} />
            </div>
          )}
          <span>SCAN TO VERIFY</span>
        </div>
      </div>
    </div>
  );
}
