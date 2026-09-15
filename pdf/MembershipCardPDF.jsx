/* ==========================================================
   Membership Card PDF
   All India Labour Party
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

const LOGO_SRC = loadLocalImage("images/logo.png");
const SIGNATURE_SRC = loadLocalImage("images/party-president-signature.png");
const AVATAR_FALLBACK_SRC = loadLocalImage("images/avatar.png");

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
   Styles — AILP brand: navy / saffron / green
========================================================== */

const NAVY = "#0F172A";
const NAVY_DARK = "#060B16";
const SAFFRON = "#FF9933";
const GREEN = "#2E7D32";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#eef1f6",
    padding: 30,
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    width: 560,
    height: 340,
    borderRadius: 18,
    backgroundColor: "#ffffff",
    overflow: "hidden",
    position: "relative",
  },

  /* Decorative diagonal corner flourish */
  cornerFlourish: {
    position: "absolute",
    top: -70,
    right: -70,
    width: 140,
    height: 140,
    backgroundColor: SAFFRON,
    transform: "rotate(45deg)",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: NAVY,
    paddingVertical: 14,
    paddingHorizontal: 20,
  },

  logo: {
    width: 42,
    height: 14,
    marginRight: 12,
    objectFit: "contain",
  },

  headerText: {
    flexDirection: "column",
  },

  title: {
    fontSize: 15,
    fontWeight: 700,
    color: "#ffffff",
    letterSpacing: 0.5,
  },

  subtitle: {
    fontSize: 8,
    marginTop: 2,
    color: "#FFD9A8",
  },

  body: {
    flex: 1,
    flexDirection: "row",
    padding: 20,
  },

  left: {
    width: 130,
    marginRight: 18,
    alignItems: "center",
  },

  photo: {
    width: 110,
    height: 130,
    borderRadius: 8,
    objectFit: "cover",
    border: `2 solid ${SAFFRON}`,
  },

  statusBadge: {
    marginTop: 10,
    backgroundColor: GREEN,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    fontSize: 7,
    fontWeight: 700,
    color: "#ffffff",
    textAlign: "center",
  },

  right: {
    flex: 1,
    marginRight: 14,
  },

  memberName: {
    fontSize: 17,
    fontWeight: 700,
    color: NAVY,
    marginBottom: 2,
  },

  membershipId: {
    fontSize: 10,
    fontWeight: 700,
    color: SAFFRON,
    marginBottom: 10,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  gridItem: {
    width: "50%",
    marginBottom: 8,
  },

  label: {
    fontSize: 7,
    color: "#94a3b8",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  value: {
    fontSize: 10,
    fontWeight: 700,
    color: NAVY_DARK,
    marginTop: 2,
  },

  qrColumn: {
    width: 90,
    alignItems: "center",
  },

  qr: {
    width: 78,
    height: 78,
    border: "1 solid #e2e8f0",
    padding: 3,
  },

  qrCaption: {
    marginTop: 4,
    fontSize: 6,
    color: "#64748b",
    textAlign: "center",
  },

  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTop: "1 solid #e2e8f0",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },

  footerText: {
    width: 340,
    fontSize: 6.5,
    lineHeight: 1.5,
    color: "#64748b",
  },

  signatureBlock: {
    alignItems: "center",
  },

  signature: {
    width: 70,
    height: 24,
    objectFit: "contain",
  },

  signatureCaption: {
    marginTop: 2,
    fontSize: 6,
    color: "#64748b",
    textAlign: "center",
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
          <View style={styles.cornerFlourish} />

          {/* Header */}
          <View style={styles.header}>
            {LOGO_SRC && <Image src={LOGO_SRC} style={styles.logo} />}
            <View style={styles.headerText}>
              <Text style={styles.title}>ALL INDIA LABOUR PARTY</Text>
              <Text style={styles.subtitle}>Official Membership Identity Card</Text>
            </View>
          </View>

          {/* Body */}
          <View style={styles.body}>
            {/* Photo */}
            <View style={styles.left}>
              {photoSrc && <Image src={photoSrc} style={styles.photo} />}
              <Text style={styles.statusBadge}>
                {member?.membershipStatus || "REGISTERED"}
              </Text>
            </View>

            {/* Details */}
            <View style={styles.right}>
              <Text style={styles.memberName}>{member?.fullName || "—"}</Text>
              <Text style={styles.membershipId}>
                {member?.membershipId || "Pending Allocation"}
              </Text>

              <View style={styles.grid}>
                <View style={styles.gridItem}>
                  <Text style={styles.label}>Date of Birth</Text>
                  <Text style={styles.value}>
                    {formatDate(member?.dateOfBirth)}
                    {age !== null ? ` (${age} yrs)` : ""}
                  </Text>
                </View>

                <View style={styles.gridItem}>
                  <Text style={styles.label}>Gender</Text>
                  <Text style={styles.value}>{member?.gender || "—"}</Text>
                </View>

                <View style={styles.gridItem}>
                  <Text style={styles.label}>Mobile</Text>
                  <Text style={styles.value}>{member?.mobile || "—"}</Text>
                </View>

                <View style={styles.gridItem}>
                  <Text style={styles.label}>Blood Group</Text>
                  <Text style={styles.value}>{member?.bloodGroup || "—"}</Text>
                </View>

                <View style={styles.gridItem}>
                  <Text style={styles.label}>District</Text>
                  <Text style={styles.value}>{member?.district || "—"}</Text>
                </View>

                <View style={styles.gridItem}>
                  <Text style={styles.label}>State</Text>
                  <Text style={styles.value}>{member?.state || "—"}</Text>
                </View>
              </View>
            </View>

            {/* QR */}
            <View style={styles.qrColumn}>
              {member?.qrCode && <Image src={member.qrCode} style={styles.qr} />}
              <Text style={styles.qrCaption}>SCAN TO VERIFY</Text>
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              UTTAR KUMROKHALI, Narendrapur, South 24 Parganas, Kolkata 700103{"\n"}
              allindialabourpartyailp@gmail.com · +91-7896043734{"\n"}
              Issued: {formatDate(member?.cardGeneratedAt)}
            </Text>

            <View style={styles.signatureBlock}>
              {SIGNATURE_SRC && <Image src={SIGNATURE_SRC} style={styles.signature} />}
              <Text style={styles.signatureCaption}>National President{"\n"}All India Labour Party</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}
