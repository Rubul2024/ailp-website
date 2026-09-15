/* ==========================================================
   Membership Card PDF
   All India Labour Party

   Styled after the party's official printed tricolor identity
   card: a curved saffron/white/green treatment with the party
   name running vertically down the right-hand band.
========================================================== */

import fs from "fs";
import path from "path";

import React from "react";

import {
  Document,
  Page,
  Text,
  View,
  Image,
  Svg,
  Path,
  StyleSheet,
} from "@react-pdf/renderer";

/* ==========================================================
   Local Asset Loading (embedded as base64 so rendering never
   depends on the deployment's public URL being reachable)
========================================================== */

function loadLocalImage(relativePath) {
  try {
    const filePath = path.join(process.cwd(), "public", relativePath);
    const buffer = fs.readFileSync(filePath);
    const ext = path.extname(relativePath).replace(".", "");
    const mime = ext === "jpg" ? "jpeg" : ext;
    return `data:image/${mime};base64,${buffer.toString("base64")}`;
  } catch (error) {
    return null;
  }
}

const AVATAR_FALLBACK_SRC = loadLocalImage("images/avatar.png");
const SIGNATURE_SRC = loadLocalImage("images/party-president-signature.png");

/* ==========================================================
   Helpers
========================================================== */

function calculateAge(dateOfBirth) {
  if (!dateOfBirth) return null;
  const dob = new Date(dateOfBirth);
  if (Number.isNaN(dob.getTime())) return null;
  const diff = Date.now() - dob.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
}

function formatDate(date) {
  if (!date) return "—";
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return "—";
  return parsed.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

/* ==========================================================
   Card geometry & colors — matches the party's official
   printed tricolor identity card
========================================================== */

const CARD_W = 580;
const CARD_H = 366;

const SAFFRON = "#FF9933";
const RED = "#D8432E";
const GREEN = "#1B8A3D";
const NAVY_DARK = "#0f172a";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#eef1f6",
    padding: 30,
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    width: CARD_W,
    height: CARD_H,
    borderRadius: 16,
    backgroundColor: "#ffffff",
    overflow: "hidden",
    position: "relative",
    border: "1 solid #e2e8f0",
  },

  svgBg: {
    position: "absolute",
    top: 0,
    left: 0,
  },

  tricolorStripe: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    width: 14,
    flexDirection: "column",
  },

  bandLabel: {
    position: "absolute",
    top: 122,
    left: 395,
    width: 260,
    transform: "rotate(90deg)",
    textAlign: "center",
  },

  bandTitle: {
    fontSize: 17,
    fontWeight: 700,
    color: "#ffffff",
    letterSpacing: 1.4,
  },

  bandSubtitle: {
    fontSize: 6.5,
    color: "#ffe4dc",
    marginTop: 3,
  },

  body: {
    position: "absolute",
    top: 16,
    left: 32,
    width: 420,
  },

  identityBadge: {
    alignSelf: "flex-start",
    backgroundColor: NAVY_DARK,
    color: "#ffffff",
    fontSize: 8,
    fontWeight: 700,
    letterSpacing: 1,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 3,
    marginBottom: 10,
  },

  regdText: {
    fontSize: 6.5,
    color: "#64748b",
    marginBottom: 10,
  },

  contentRow: {
    flexDirection: "row",
  },

  photo: {
    width: 96,
    height: 118,
    borderRadius: 4,
    objectFit: "cover",
    border: `2 solid ${SAFFRON}`,
    marginRight: 16,
  },

  fields: {
    flex: 1,
  },

  memberName: {
    fontSize: 15,
    fontWeight: 700,
    color: NAVY_DARK,
    marginBottom: 6,
  },

  fieldRow: {
    flexDirection: "row",
    marginBottom: 5,
  },

  fieldLabel: {
    width: 78,
    fontSize: 7.5,
    fontWeight: 700,
    color: "#475569",
  },

  fieldValue: {
    flex: 1,
    fontSize: 8,
    color: NAVY_DARK,
  },

  membershipIdText: {
    marginTop: 8,
    fontSize: 9,
    fontWeight: 700,
    color: RED,
  },

  bottomRow: {
    position: "absolute",
    bottom: 14,
    left: 32,
    right: 220,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },

  secretaryText: {
    fontSize: 7.5,
    fontWeight: 700,
    color: "#ffffff",
  },

  signatureCaption: {
    fontSize: 6,
    fontWeight: 700,
    color: "#ffffff",
    marginTop: 2,
  },

  signature: {
    width: 60,
    height: 20,
    objectFit: "contain",
  },

  qrBlock: {
    position: "absolute",
    bottom: 16,
    right: 34,
    alignItems: "center",
  },

  qr: {
    width: 62,
    height: 62,
    backgroundColor: "#ffffff",
    padding: 2,
    borderRadius: 3,
  },

  qrCaption: {
    marginTop: 3,
    fontSize: 5.5,
    color: "#ffffff",
    textAlign: "center",
  },

  statusBadge: {
    position: "absolute",
    top: 16,
    right: 30,
    backgroundColor: GREEN,
    paddingVertical: 3,
    paddingHorizontal: 9,
    borderRadius: 20,
    fontSize: 6,
    fontWeight: 700,
    color: "#ffffff",
  },
});

/* ==========================================================
   PDF Component
========================================================== */

export default function MembershipCardPDF({ member }) {
  const age = calculateAge(member?.dateOfBirth);
  const photoSrc = member?.photo?.url || AVATAR_FALLBACK_SRC;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.card}>
          {/* Curved tricolor background bands */}
          <Svg
            width={CARD_W}
            height={CARD_H}
            viewBox={`0 0 ${CARD_W} ${CARD_H}`}
            style={styles.svgBg}
          >
            {/* Red band — right side, wavy left edge */}
            <Path
              d={`M ${CARD_W} 0 L 452 0 Q 405 90 452 183 Q 495 268 452 ${CARD_H} L ${CARD_W} ${CARD_H} Z`}
              fill={RED}
            />
            {/* Saffron accent sliver between white and red */}
            <Path
              d={`M 452 0 L 440 0 Q 393 90 440 183 Q 483 268 440 ${CARD_H} L 452 ${CARD_H} Q 495 268 452 183 Q 405 90 452 0 Z`}
              fill={SAFFRON}
            />
            {/* Green swoosh — bottom-left, behind QR/signature strip */}
            <Path
              d={`M 0 ${CARD_H} L 0 258 Q 130 262 190 300 Q 230 326 200 ${CARD_H} Z`}
              fill={GREEN}
            />
          </Svg>

          {/* Rotated party name inside the red band */}
          <View style={styles.bandLabel}>
            <Text style={styles.bandTitle}>ALL INDIA LABOUR PARTY</Text>
            <Text style={styles.bandSubtitle}>Regd. No. 56/119/2018-18/PPS-I</Text>
          </View>

          {/* Verified/status badge */}
          <Text style={styles.statusBadge}>{member?.membershipStatus || "REGISTERED"}</Text>

          {/* Main identity content */}
          <View style={styles.body}>
            <Text style={styles.identityBadge}>IDENTITY CARD</Text>

            <View style={styles.contentRow}>
              {photoSrc && <Image src={photoSrc} style={styles.photo} />}

              <View style={styles.fields}>
                <Text style={styles.memberName}>{member?.fullName || "—"}</Text>

                <View style={styles.fieldRow}>
                  <Text style={styles.fieldLabel}>DOB</Text>
                  <Text style={styles.fieldValue}>
                    {formatDate(member?.dateOfBirth)}
                    {age !== null ? ` (${age} yrs)` : ""}
                  </Text>
                </View>

                <View style={styles.fieldRow}>
                  <Text style={styles.fieldLabel}>Gender</Text>
                  <Text style={styles.fieldValue}>{member?.gender || "—"}</Text>
                </View>

                <View style={styles.fieldRow}>
                  <Text style={styles.fieldLabel}>Mobile</Text>
                  <Text style={styles.fieldValue}>{member?.mobile || "—"}</Text>
                </View>

                <View style={styles.fieldRow}>
                  <Text style={styles.fieldLabel}>Blood Group</Text>
                  <Text style={styles.fieldValue}>{member?.bloodGroup || "—"}</Text>
                </View>

                <View style={styles.fieldRow}>
                  <Text style={styles.fieldLabel}>District</Text>
                  <Text style={styles.fieldValue}>
                    {member?.district || "—"}, {member?.state || "—"}
                  </Text>
                </View>

                {member?.assembly && (
                  <View style={styles.fieldRow}>
                    <Text style={styles.fieldLabel}>Assembly</Text>
                    <Text style={styles.fieldValue}>{member.assembly}</Text>
                  </View>
                )}

                <Text style={styles.membershipIdText}>{member?.membershipId || "Pending Allocation"}</Text>
              </View>
            </View>
          </View>

          {/* Signature */}
          <View style={styles.bottomRow}>
            <View>
              <Text style={styles.secretaryText}>National President</Text>
              {SIGNATURE_SRC && <Image src={SIGNATURE_SRC} style={styles.signature} />}
              <Text style={styles.signatureCaption}>All India Labour Party</Text>
            </View>
          </View>

          {/* QR code sitting on the green swoosh */}
          <View style={styles.qrBlock}>
            {member?.qrCode && <Image src={member.qrCode} style={styles.qr} />}
            <Text style={styles.qrCaption}>SCAN TO VERIFY</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
