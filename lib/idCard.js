/* ==========================================================
   ID Card content — shared by the on-screen preview
   (components/member/IdCardPreview.jsx) and the PDF
   (pdf/MembershipCardPDF.jsx) so both always print the same.

   Size: ISO/IEC 7810 ID-1 (CR80) — 85.6 mm × 53.98 mm.
   All layout values in both renderers are in millimetres.
========================================================== */

import { formatDate } from "./memberProfile";

export const CARD_MM = { width: 85.6, height: 53.98 };

export const PARTY = {
  name: "ALL INDIA LABOUR PARTY",
  regd: "Regd. No. 56/119/2018-18/PPS-I",
  headOffice: "Uttar Kumrokhali, Narendrapur, South 24 Parganas, Kolkata – 700103",
  email: "allindialabourpartyailp@gmail.com",
  phone: "+91 78960 43734",
};

export const CARD_TERMS = [
  "This card is the property of All India Labour Party and is not transferable.",
  "Carry this card at party programmes and show it when asked by party officials.",
  "Scan the QR code on the front to check that this card is genuine.",
  "If found, please return it to the Head Office address below.",
];

const BRAND = {
  navy: "#0B2447",
  saffron: "#F28C28",
  saffronText: "#C2410C",
  green: "#15803D",
  ink: "#0F172A",
  muted: "#64748B",
  line: "#E2E8F0",
};
export { BRAND as CARD_COLORS };

function upper(value) {
  return value ? String(value).toUpperCase() : "—";
}

/** Rows printed on the front, in order. */
export function cardFrontRows(member) {
  return [
    { label: "Member ID", value: member?.membershipId || "—", strong: true },
    { label: "Date of Birth", value: formatDate(member?.dateOfBirth) },
    { label: "Gender", value: upper(member?.gender) },
    { label: "Blood Group", value: member?.bloodGroup || "—" },
    { label: "Mobile", value: member?.mobile || "—" },
    {
      label: "District",
      value: [member?.district, member?.state].filter(Boolean).join(", ") || "—",
    },
  ];
}

/** Member's address for the back of the card. */
export function cardAddress(member) {
  const parts = [
    member?.address,
    member?.village,
    member?.assembly ? `${member.assembly} LAC` : "",
    member?.district,
    member?.state,
  ].filter(Boolean);
  const line = parts.join(", ");
  return member?.pincode ? `${line}${line ? " – " : ""}${member.pincode}` : line || "—";
}

/** Shrinks long names so they stay on one line (font size in mm). */
export function nameFontMm(name) {
  const len = String(name || "").length;
  if (len > 30) return 2.35;
  if (len > 24) return 2.7;
  if (len > 18) return 3.0;
  return 3.3;
}

export function issuedLabel(member) {
  return formatDate(member?.cardGeneratedAt || member?.joinDate || member?.createdAt);
}

export function verifyHost() {
  const url = process.env.NEXT_PUBLIC_APP_URL || "";
  try {
    return url ? new URL(url).host : "";
  } catch {
    return "";
  }
}

/* ==========================================================
   Layout — every box is [left, top, width, height] in mm and
   every font size is in mm. Both renderers read from here.
========================================================== */

export const CARD_LAYOUT = {
  stripes: { saffron: 0.8, white: 0.8, green: 0.8 },
  footer: { top: 47.2, textTop: 49.55, font: 1.6 },

  front: {
    header: { height: 12.5 },
    emblem: [3.5, 1.5, 9.5, 9.5],
    title: { left: 15, top: 2.9, font: 3.2, spacing: 0.16 },
    regd: { left: 15, top: 7.5, font: 1.7, spacing: 0.08 },
    watermark: [30, 17.5, 26, 26],
    photo: [4, 17, 19, 24],
    name: { left: 26, top: 16.9, width: 37.5 },
    role: { left: 26, top: 20.7, font: 1.7, spacing: 0.25 },
    rows: { top: 24.3, step: 3.05, labelLeft: 26, labelFont: 1.4, valueLeft: 39.8, valueWidth: 24.5, valueFont: 1.95 },
    qr: [65.3, 16.8, 16.8, 16.8],
    qrCaption: { top: 34.3, font: 1.25, spacing: 0.2 },
    sign: [65.3, 36.2, 16.8, 5.2],
    signCaption: { top: 41.8, font: 1.4 },
  },

  back: {
    header: { height: 8 },
    emblem: [3.5, 1, 6, 6],
    title: { left: 11.5, top: 2.55, font: 2.3, spacing: 0.15 },
    memberId: { right: 4, top: 2.85, font: 1.8 },
    content: { left: 4, width: 77.6 },
    label: { font: 1.45, spacing: 0.25 },
    addressTop: 12.4,
    termsTop: 20.4,
    officeTop: 35.6,
    body: 1.85,
    small: 1.62,
  },
};
