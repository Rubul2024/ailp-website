/* ==========================================================
   Membership ID Card — PDF
   Two pages (front + back), each exactly ISO/IEC 7810 ID-1
   (CR80, 85.6 × 53.98 mm) so it prints at true card size.
   Layout and text come from lib/idCard.js, shared with the
   on-screen preview (components/member/IdCardPreview.jsx).
========================================================== */

import fs from "fs";
import path from "path";
import React from "react";
import { Document, Font, Image, Page, Text, View } from "@react-pdf/renderer";

import {
  CARD_COLORS as C,
  CARD_LAYOUT as L,
  CARD_MM,
  CARD_TERMS,
  PARTY,
  cardAddress,
  cardFrontRows,
  issuedLabel,
  nameFontMm,
  verifyHost,
} from "@/lib/idCard";
import { getInitials, getPhotoUrl } from "@/lib/memberProfile";

/* ---------- Units ---------- */

const PT_PER_MM = 72 / 25.4;
const mm = (v) => v * PT_PER_MM;
const box = ([left, top, width, height]) => ({
  position: "absolute",
  left: mm(left),
  top: mm(top),
  width: mm(width),
  height: mm(height),
});

/* ---------- Assets (embedded, so rendering never depends on a public URL) ---------- */

const root = process.cwd();

function loadImage(relativePath) {
  try {
    const buffer = fs.readFileSync(path.join(root, "public", relativePath));
    return `data:image/png;base64,${buffer.toString("base64")}`;
  } catch {
    return null;
  }
}

const EMBLEM = loadImage("images/ailp-emblem.png");
const SIGNATURE = loadImage("images/party-president-signature.png");

let fontFamily = "Helvetica";
try {
  const fontPath = (w) => path.join(root, "pdf", "fonts", `Inter-${w}.woff`);
  if (fs.existsSync(fontPath(400))) {
    Font.register({
      family: "Inter",
      fonts: [400, 600, 700, 800].map((w) => ({ src: fontPath(w), fontWeight: w })),
    });
    fontFamily = "Inter";
  }
} catch {
  fontFamily = "Helvetica";
}
Font.registerHyphenationCallback((word) => [word]);

/* ---------- Shared pieces ---------- */

const text = (size, weight = 400, color = C.ink, extra = {}) => ({
  fontFamily,
  fontSize: mm(size),
  fontWeight: weight,
  color,
  lineHeight: 1.15,
  ...extra,
});

function Stripes({ top }) {
  const s = L.stripes;
  return (
    <>
      <View style={{ position: "absolute", left: 0, right: 0, top: mm(top), height: mm(s.saffron), backgroundColor: C.saffron }} />
      <View
        style={{ position: "absolute", left: 0, right: 0, top: mm(top + s.saffron + s.white), height: mm(s.green), backgroundColor: C.green }}
      />
    </>
  );
}

function Emblem({ frame }) {
  const [, , size] = frame;
  const pad = size * 0.015;
  return (
    <View style={{ ...box(frame), borderRadius: mm(size / 2), backgroundColor: "#FFFFFF", padding: mm(pad) }}>
      {EMBLEM && <Image src={EMBLEM} style={{ width: "100%", height: "100%" }} />}
    </View>
  );
}

function Footer({ left, right, center }) {
  const f = L.footer;
  return (
    <>
      <View style={{ position: "absolute", left: 0, right: 0, top: mm(f.top), bottom: 0, backgroundColor: C.green }} />
      {center ? (
        <Text style={{ ...text(f.font, 600, "#FFFFFF"), position: "absolute", left: mm(4), right: mm(4), top: mm(f.textTop), textAlign: "center" }}>
          {center}
        </Text>
      ) : (
        <>
          <Text
            style={{ ...text(f.font, 700, "#FFFFFF", { letterSpacing: mm(0.3) }), position: "absolute", left: mm(4), top: mm(f.textTop) }}
          >
            {left}
          </Text>
          <Text style={{ ...text(f.font, 600, "#DCFCE7"), position: "absolute", right: mm(4), top: mm(f.textTop), textAlign: "right" }}>
            {right}
          </Text>
        </>
      )}
    </>
  );
}

const pageStyle = { width: mm(CARD_MM.width), height: mm(CARD_MM.height), backgroundColor: "#FFFFFF", position: "relative" };
const pageSize = [mm(CARD_MM.width), mm(CARD_MM.height)];

/* ---------- Front ---------- */

function Front({ member }) {
  const F = L.front;
  const photo = getPhotoUrl(member?.photo);
  const rows = cardFrontRows(member);

  return (
    <Page size={pageSize} style={pageStyle}>
      <View style={{ position: "absolute", left: 0, right: 0, top: 0, height: mm(F.header.height), backgroundColor: C.navy }} />
      <Emblem frame={F.emblem} />
      <Text style={{ ...text(F.title.font, 800, "#FFFFFF", { letterSpacing: mm(F.title.spacing) }), position: "absolute", left: mm(F.title.left), top: mm(F.title.top) }}>
        {PARTY.name}
      </Text>
      <Text style={{ ...text(F.regd.font, 600, "#FFD8A8", { letterSpacing: mm(F.regd.spacing) }), position: "absolute", left: mm(F.regd.left), top: mm(F.regd.top) }}>
        {PARTY.regd}
      </Text>
      <Stripes top={F.header.height} />

      {EMBLEM && <Image src={EMBLEM} style={{ ...box(F.watermark), opacity: 0.05 }} />}

      {photo ? (
        <Image
          src={photo}
          style={{ ...box(F.photo), objectFit: "cover", borderRadius: mm(1), border: `${mm(0.3)} solid #CBD5E1` }}
        />
      ) : (
        <View
          style={{ ...box(F.photo), borderRadius: mm(1), backgroundColor: "#F1F5F9", border: `${mm(0.3)} solid #CBD5E1`, alignItems: "center", justifyContent: "center" }}
        >
          <Text style={text(5, 800, "#94A3B8")}>{getInitials(member?.fullName)}</Text>
        </View>
      )}

      <Text
        style={{ ...text(nameFontMm(member?.fullName), 800, C.navy), position: "absolute", left: mm(F.name.left), top: mm(F.name.top), width: mm(F.name.width) }}
        maxLines={1}
      >
        {String(member?.fullName || "—").toUpperCase()}
      </Text>
      <Text style={{ ...text(F.role.font, 700, C.saffronText, { letterSpacing: mm(F.role.spacing) }), position: "absolute", left: mm(F.role.left), top: mm(F.role.top) }}>
        PARTY MEMBER
      </Text>

      {rows.map((row, i) => {
        const top = mm(F.rows.top + i * F.rows.step);
        return (
          <React.Fragment key={row.label}>
            <Text style={{ ...text(F.rows.labelFont, 600, C.muted, { letterSpacing: mm(0.08) }), position: "absolute", left: mm(F.rows.labelLeft), top: top + mm(0.3) }}>
              {row.label.toUpperCase()}
            </Text>
            <Text
              style={{ ...text(F.rows.valueFont, row.strong ? 800 : 600, row.strong ? C.navy : C.ink), position: "absolute", left: mm(F.rows.valueLeft), top, width: mm(F.rows.valueWidth) }}
              maxLines={1}
            >
              {row.value}
            </Text>
          </React.Fragment>
        );
      })}

      <View style={{ ...box(F.qr), backgroundColor: "#FFFFFF", border: `${mm(0.3)} solid ${C.line}`, borderRadius: mm(0.8), padding: mm(0.6) }}>
        {member?.qrCode && <Image src={member.qrCode} style={{ width: "100%", height: "100%" }} />}
      </View>
      <Text
        style={{ ...text(F.qrCaption.font, 700, C.muted, { letterSpacing: mm(F.qrCaption.spacing) }), position: "absolute", left: mm(F.qr[0]), width: mm(F.qr[2]), top: mm(F.qrCaption.top), textAlign: "center" }}
      >
        SCAN TO VERIFY
      </Text>

      {SIGNATURE && <Image src={SIGNATURE} style={{ ...box(F.sign), objectFit: "contain" }} />}
      <Text
        style={{ ...text(F.signCaption.font, 700, C.ink), position: "absolute", left: mm(F.sign[0] - 2), width: mm(F.sign[2] + 4), top: mm(F.signCaption.top), textAlign: "center" }}
      >
        National President
      </Text>

      <Footer left="MEMBER IDENTITY CARD" right={`Issued: ${issuedLabel(member)}`} />
    </Page>
  );
}

/* ---------- Back ---------- */

function Back({ member }) {
  const B = L.back;
  const host = verifyHost();
  const label = (top, children) => (
    <Text style={{ ...text(B.label.font, 700, C.muted, { letterSpacing: mm(B.label.spacing) }), position: "absolute", left: mm(B.content.left), top: mm(top) }}>
      {children}
    </Text>
  );

  return (
    <Page size={pageSize} style={pageStyle}>
      <View style={{ position: "absolute", left: 0, right: 0, top: 0, height: mm(B.header.height), backgroundColor: C.navy }} />
      <Emblem frame={B.emblem} />
      <Text style={{ ...text(B.title.font, 800, "#FFFFFF", { letterSpacing: mm(B.title.spacing) }), position: "absolute", left: mm(B.title.left), top: mm(B.title.top) }}>
        {PARTY.name}
      </Text>
      <Text style={{ ...text(B.memberId.font, 700, "#FDBA74"), position: "absolute", right: mm(B.memberId.right), top: mm(B.memberId.top), textAlign: "right" }}>
        {member?.membershipId || ""}
      </Text>
      <Stripes top={B.header.height} />

      {label(B.addressTop, "MEMBER ADDRESS")}
      <Text
        style={{ ...text(B.body, 600, C.ink, { lineHeight: 1.3 }), position: "absolute", left: mm(B.content.left), top: mm(B.addressTop + 2.3), width: mm(B.content.width) }}
        maxLines={2}
      >
        {cardAddress(member)}
      </Text>

      {label(B.termsTop, "TERMS & CONDITIONS")}
      <View style={{ position: "absolute", left: mm(B.content.left), top: mm(B.termsTop + 2.4), width: mm(B.content.width) }}>
        {CARD_TERMS.map((term, i) => (
          <View key={term} style={{ flexDirection: "row", marginBottom: mm(0.55) }}>
            <Text style={{ ...text(B.small, 700, C.navy, { lineHeight: 1.3 }), width: mm(2.6) }}>{i + 1}.</Text>
            <Text style={{ ...text(B.small, 400, "#334155", { lineHeight: 1.3 }), flex: 1 }}>{term}</Text>
          </View>
        ))}
      </View>

      <View style={{ position: "absolute", left: mm(B.content.left), width: mm(B.content.width), top: mm(B.officeTop - 1.2), height: mm(0.2), backgroundColor: C.line }} />
      {label(B.officeTop, "HEAD OFFICE")}
      <Text style={{ ...text(B.small, 600, C.ink), position: "absolute", left: mm(B.content.left), top: mm(B.officeTop + 2.3), width: mm(B.content.width) }}>
        {PARTY.headOffice}
      </Text>
      <Text style={{ ...text(B.small, 400, C.muted), position: "absolute", left: mm(B.content.left), top: mm(B.officeTop + 5), width: mm(B.content.width) }}>
        {`Email: ${PARTY.email}   ·   Phone: ${PARTY.phone}`}
      </Text>

      <Footer
        center={
          host && member?.membershipId
            ? `Verify online: ${host}/verify/${member.membershipId}`
            : "Scan the QR code on the front to verify this card"
        }
      />
    </Page>
  );
}

/* ---------- Document ---------- */

export default function MembershipCardPDF({ member }) {
  return (
    <Document
      title={`AILP ID Card — ${member?.fullName || "Member"}`}
      author="All India Labour Party"
      subject="Member identity card"
    >
      <Front member={member} />
      <Back member={member} />
    </Document>
  );
}
