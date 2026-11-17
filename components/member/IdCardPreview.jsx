/* ==========================================================
   ID Card Preview
   On-screen replica of the PDF card (pdf/MembershipCardPDF.jsx).
   Both read positions/sizes from lib/idCard.js (in mm), so the
   preview and the download always match. Rendered at true
   CR80 proportions (85.6 × 53.98 mm), scaled to its container.
========================================================== */

import { QrCode } from "lucide-react";

import {
  CARD_COLORS as C,
  CARD_LAYOUT as L,
  CARD_TERMS,
  PARTY,
  cardAddress,
  cardFrontRows,
  issuedLabel,
  nameFontMm,
  verifyHost,
} from "@/lib/idCard";
import { getInitials, getPhotoUrl } from "@/lib/memberProfile";
import styles from "./IdCardPreview.module.css";

const u = (n) => `calc(var(--mm) * ${n})`;
const box = ([left, top, width, height]) => ({ left: u(left), top: u(top), width: u(width), height: u(height) });
const font = (size, weight, color, spacing = 0) => ({
  fontSize: u(size),
  fontWeight: weight,
  color,
  letterSpacing: spacing ? u(spacing) : undefined,
});

function Stripes({ top }) {
  const s = L.stripes;
  return (
    <>
      <span className={styles.abs} style={{ left: 0, right: 0, top: u(top), height: u(s.saffron), background: C.saffron }} />
      <span className={styles.abs} style={{ left: 0, right: 0, top: u(top + s.saffron + s.white), height: u(s.green), background: C.green }} />
    </>
  );
}

function Emblem({ frame }) {
  return (
    <span className={`${styles.abs} ${styles.emblem}`} style={{ ...box(frame), padding: u(frame[2] * 0.015) }}>
      <img src="/images/ailp-emblem.png" alt="" />
    </span>
  );
}

function Footer({ children }) {
  return (
    <div className={`${styles.abs} ${styles.footer}`} style={{ top: u(L.footer.top), fontSize: u(L.footer.font) }}>
      {children}
    </div>
  );
}

function Front({ member }) {
  const F = L.front;
  const photo = getPhotoUrl(member?.photo);

  return (
    <div className={styles.face}>
      <span className={styles.abs} style={{ left: 0, right: 0, top: 0, height: u(F.header.height), background: C.navy }} />
      <Emblem frame={F.emblem} />
      <span className={styles.abs} style={{ left: u(F.title.left), top: u(F.title.top), ...font(F.title.font, 800, "#fff", F.title.spacing) }}>
        {PARTY.name}
      </span>
      <span className={styles.abs} style={{ left: u(F.regd.left), top: u(F.regd.top), ...font(F.regd.font, 600, "#FFD8A8", F.regd.spacing) }}>
        {PARTY.regd}
      </span>
      <Stripes top={F.header.height} />

      <img src="/images/ailp-emblem.png" alt="" className={`${styles.abs} ${styles.watermark}`} style={box(F.watermark)} />

      {photo ? (
        <img src={photo} alt="" className={`${styles.abs} ${styles.photo}`} style={box(F.photo)} />
      ) : (
        <span className={`${styles.abs} ${styles.photo} ${styles.photoEmpty}`} style={{ ...box(F.photo), fontSize: u(5) }}>
          {getInitials(member?.fullName)}
        </span>
      )}

      <span
        className={`${styles.abs} ${styles.oneLine}`}
        style={{ left: u(F.name.left), top: u(F.name.top), width: u(F.name.width), ...font(nameFontMm(member?.fullName), 800, C.navy) }}
      >
        {String(member?.fullName || "—").toUpperCase()}
      </span>
      <span className={styles.abs} style={{ left: u(F.role.left), top: u(F.role.top), ...font(F.role.font, 700, C.saffronText, F.role.spacing) }}>
        PARTY MEMBER
      </span>

      <dl>
        {cardFrontRows(member).map((row, i) => {
          const top = F.rows.top + i * F.rows.step;
          return (
            <div key={row.label}>
              <dt className={styles.abs} style={{ left: u(F.rows.labelLeft), top: u(top + 0.3), ...font(F.rows.labelFont, 600, C.muted, 0.08) }}>
                {row.label.toUpperCase()}
              </dt>
              <dd
                className={`${styles.abs} ${styles.oneLine}`}
                style={{
                  left: u(F.rows.valueLeft),
                  top: u(top),
                  width: u(F.rows.valueWidth),
                  ...font(F.rows.valueFont, row.strong ? 800 : 600, row.strong ? C.navy : C.ink),
                }}
              >
                {row.value}
              </dd>
            </div>
          );
        })}
      </dl>

      <span className={`${styles.abs} ${styles.qr}`} style={{ ...box(F.qr), padding: u(0.6), borderRadius: u(0.8) }}>
        {member?.qrCode ? <img src={member.qrCode} alt="Verification QR code" /> : <QrCode className={styles.qrEmpty} />}
      </span>
      <span
        className={`${styles.abs} ${styles.center}`}
        style={{ left: u(F.qr[0]), width: u(F.qr[2]), top: u(F.qrCaption.top), ...font(F.qrCaption.font, 700, C.muted, F.qrCaption.spacing) }}
      >
        SCAN TO VERIFY
      </span>

      <img src="/images/party-president-signature.png" alt="" className={`${styles.abs} ${styles.sign}`} style={box(F.sign)} />
      <span
        className={`${styles.abs} ${styles.center}`}
        style={{ left: u(F.sign[0] - 2), width: u(F.sign[2] + 4), top: u(F.signCaption.top), ...font(F.signCaption.font, 700, C.ink) }}
      >
        National President
      </span>

      <Footer>
        <span style={{ fontWeight: 700, letterSpacing: u(0.3) }}>MEMBER IDENTITY CARD</span>
        <span style={{ fontWeight: 600, color: "#DCFCE7" }}>Issued: {issuedLabel(member)}</span>
      </Footer>
    </div>
  );
}

function Back({ member }) {
  const B = L.back;
  const host = verifyHost();
  const left = u(B.content.left);
  const width = u(B.content.width);
  const label = (top, text) => (
    <span className={styles.abs} style={{ left, top: u(top), ...font(B.label.font, 700, C.muted, B.label.spacing) }}>
      {text}
    </span>
  );

  return (
    <div className={styles.face}>
      <span className={styles.abs} style={{ left: 0, right: 0, top: 0, height: u(B.header.height), background: C.navy }} />
      <Emblem frame={B.emblem} />
      <span className={styles.abs} style={{ left: u(B.title.left), top: u(B.title.top), ...font(B.title.font, 800, "#fff", B.title.spacing) }}>
        {PARTY.name}
      </span>
      <span className={styles.abs} style={{ right: u(B.memberId.right), top: u(B.memberId.top), ...font(B.memberId.font, 700, "#FDBA74") }}>
        {member?.membershipId || ""}
      </span>
      <Stripes top={B.header.height} />

      {label(B.addressTop, "MEMBER ADDRESS")}
      <span
        className={`${styles.abs} ${styles.twoLines}`}
        style={{ left, width, top: u(B.addressTop + 2.3), lineHeight: 1.3, ...font(B.body, 600, C.ink) }}
      >
        {cardAddress(member)}
      </span>

      {label(B.termsTop, "TERMS & CONDITIONS")}
      <ol className={`${styles.abs} ${styles.terms}`} style={{ left, width, top: u(B.termsTop + 2.4), fontSize: u(B.small) }}>
        {CARD_TERMS.map((term, i) => (
          <li key={term} style={{ marginBottom: u(0.55) }}>
            <b style={{ width: u(2.6), color: C.navy }}>{i + 1}.</b>
            <span>{term}</span>
          </li>
        ))}
      </ol>

      <span className={styles.abs} style={{ left, width, top: u(B.officeTop - 1.2), height: u(0.2), background: C.line }} />
      {label(B.officeTop, "HEAD OFFICE")}
      <span className={styles.abs} style={{ left, width, top: u(B.officeTop + 2.3), ...font(B.small, 600, C.ink) }}>
        {PARTY.headOffice}
      </span>
      <span className={styles.abs} style={{ left, width, top: u(B.officeTop + 5), ...font(B.small, 400, C.muted) }}>
        Email: {PARTY.email} &nbsp;·&nbsp; Phone: {PARTY.phone}
      </span>

      <Footer>
        <span className={styles.footerCenter} style={{ fontWeight: 600 }}>
          {host && member?.membershipId
            ? `Verify online: ${host}/verify/${member.membershipId}`
            : "Scan the QR code on the front to verify this card"}
        </span>
      </Footer>
    </div>
  );
}

export default function IdCardPreview({ member, side = "front" }) {
  return (
    <div className={styles.wrap}>
      <div
        className={styles.card}
        role="img"
        aria-label={`${side === "back" ? "Back" : "Front"} of the AILP ID card for ${member?.fullName || "member"}`}
      >
        {side === "back" ? <Back member={member} /> : <Front member={member} />}
      </div>
    </div>
  );
}
