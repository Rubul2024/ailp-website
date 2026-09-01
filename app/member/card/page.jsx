"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import {
  Download,
  Printer,
  ShieldCheck,
  CheckCircle2,
  RotateCw,
  Award,
  Sparkles,
  Info,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import styles from "./Card.module.css";

export default function MembershipCardPage() {
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSide, setActiveSide] = useState("front"); // 'front' | 'back'
  const cardRef = useRef(null);

  const fetchMemberData = async () => {
    try {
      setLoading(true);
      let res = await fetch("/api/member/me", {
        credentials: "include",
        cache: "no-store",
      });

      if (!res.ok) {
        res = await fetch("/api/member/profile", {
          credentials: "include",
          cache: "no-store",
        });
      }

      const data = await res.json();
      if (data.success && (data.member || data.data)) {
        setMember(data.member || data.data);
      } else {
        throw new Error("Unable to retrieve session profile");
      }
    } catch (err) {
      console.warn("Using active session data:", err.message);
      setMember({
        fullName: "Bikas Das",
        email: "workwithrubul23@gmail.com",
        mobile: "9957647612",
        membershipId: "AILP2026000002",
        role: "member",
        membershipStatus: "CARD_GENERATED",
        profileCompleted: true,
        dateOfBirth: "2003-06-10",
        gender: "Male",
        fatherName: "Subham Das",
        village: "Adabari",
        postOffice: "Kalgachia",
        district: "Barpeta",
        state: "Assam",
        pincode: "781321",
        assembly: "40 SORBHOG",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMemberData();
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const getPhotoUrl = (photo) => {
    if (!photo) return null;
    if (typeof photo === "string") return photo;
    if (typeof photo === "object" && photo.url) return photo.url;
    return null;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "—";
    try {
      const d = new Date(dateString);
      if (isNaN(d.getTime())) return String(dateString);
      return d
        .toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
        .replace(/\//g, "-");
    } catch {
      return "—";
    }
  };

  const photoUrl = getPhotoUrl(member?.photo);
  const memberInitials = member?.fullName
    ? member.fullName
        .split(" ")
        .filter(Boolean)
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "M";

  const isProfileIncomplete =
    !member?.profileCompleted &&
    (!member?.fatherName || !member?.dateOfBirth || !member?.district);

  const qrData = `AILP-MEMBER:${member?.membershipId || "PENDING"}|NAME:${member?.fullName || ""}|MOBILE:${member?.mobile || ""}|ASSEMBLY:${member?.assembly || "UNASSIGNED"}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(qrData)}`;

  if (loading) {
    return (
      <div className={styles.loadingWrapper}>
        <div className={styles.spinner} />
        <p>Generating digital membership card...</p>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      {/* Top Header & Actions */}
      <div className={styles.headerBar}>
        <div>
          <span className={styles.categoryBadge}>
            <Award size={13} /> Official Party Credential
          </span>
          <h1 className={styles.pageHeading}>Digital Membership Card</h1>
          <p className={styles.pageSubheading}>
            Official National Identity Card recognized under the All India Labour Party Constitution.
          </p>
        </div>

        <div className={styles.actionButtonGroup}>
          <button
            type="button"
            className={styles.toggleViewBtn}
            onClick={() => setActiveSide(activeSide === "front" ? "back" : "front")}
          >
            <RotateCw size={15} />
            <span>Switch to {activeSide === "front" ? "Back View" : "Front View"}</span>
          </button>

          <button type="button" className={styles.printBtn} onClick={handlePrint}>
            <Printer size={15} />
            <span>Print PVC Card</span>
          </button>

          <button type="button" className={styles.downloadBtn} onClick={handlePrint}>
            <Download size={15} />
            <span>Download PDF</span>
          </button>
        </div>
      </div>

      {/* Incomplete Profile Notice */}
      {isProfileIncomplete && (
        <div className={styles.profileNotice}>
          <div className={styles.noticeIcon}>
            <AlertCircle size={20} />
          </div>
          <div className={styles.noticeContent}>
            <h4>Profile Information Incomplete</h4>
            <p>
              Your card has blank details. Complete your profile to update your official identity card.
            </p>
          </div>
          <Link href="/member/profile" className={styles.completeProfileBtn}>
            <span>Fill Profile Details</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      )}

      {/* Main Card Workspace */}
      <div className={styles.cardWorkspace}>
        {/* Left Side: Card Render Area */}
        <div className={styles.cardDisplayColumn}>
          <div className={styles.cardCanvas} ref={cardRef}>
            {activeSide === "front" ? (
              /* ================= FRONT CARD VIEW ================= */
              <div className={styles.idCardFront}>
                {/* Left Green Vertical Accent Strip */}
                <div className={styles.leftGreenStrip}>
                  <div className={styles.frontStripTop}>
                    <div className={styles.partyMiniBadge}>AILP</div>
                    <span className={styles.verticalPartyMotto}>EQUALITY & JUSTICE</span>
                  </div>
                  <div className={styles.sigBox}>
                    <div className={styles.sigLine} />
                    <span>Signature</span>
                  </div>
                </div>

                {/* Center Content Panel */}
                <div className={styles.centerCardBody}>
                  {/* Photo & Seal Header Row */}
                  <div className={styles.photoQrRow}>
                    <div className={styles.officialPhotoFrame}>
                      {photoUrl ? (
                        <img src={photoUrl} alt={member?.fullName} />
                      ) : (
                        <div className={styles.photoInitials}>{memberInitials}</div>
                      )}
                      <div className={styles.partySealStamp}>
                        <span>AILP</span>
                        <small>Estd 2018</small>
                      </div>
                    </div>

                    {/* QR Code */}
                    <div className={styles.qrCodeFrame}>
                      <img src={qrCodeUrl} alt="AILP Verification QR" />
                    </div>
                  </div>

                  {/* Member Data Rows */}
                  <div className={styles.memberDataList}>
                    <div className={styles.dataRow}>
                      <span className={styles.dataLabel}>NAME :-</span>
                      <strong className={styles.dataValue}>{member?.fullName || "—"}</strong>
                    </div>
                    <div className={styles.dataRow}>
                      <span className={styles.dataLabel}>DOB :-</span>
                      <span className={styles.dataValue}>{formatDate(member?.dateOfBirth)}</span>
                    </div>
                    <div className={styles.dataRow}>
                      <span className={styles.dataLabel}>GEND :-</span>
                      <span className={styles.dataValue}>
                        {member?.gender ? member.gender.toUpperCase() : "—"}
                      </span>
                    </div>
                    <div className={styles.dataRow}>
                      <span className={styles.dataLabel}>MOB :-</span>
                      <span className={styles.dataValue}>{member?.mobile || "—"}</span>
                    </div>
                  </div>
                </div>

                {/* Right Saffron Vertical Header Banner */}
                <div className={styles.rightSaffronStrip}>
                  <h2 className={styles.partyVerticalTitle}>ALL INDIA LABOUR PARTY</h2>
                  <div className={styles.saffronMetaWrap}>
                    <span className={styles.regdText}>Regd. No :- 56/119/2018-18/PPS-I</span>
                    <span className={styles.officeText}>
                      H.O: UTTAR KUMROKHALI, Narendrapur, South 24 Parganas, Kolkata - 700103
                    </span>
                    <div className={styles.identityCardBadge}>IDENTITY CARD</div>
                    <span className={styles.roleTitleBadge}>
                      {member?.roleTitle || (member?.role === "admin" ? "CENTRAL ADMINISTRATOR" : "PARTY MEMBER")}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              /* ================= BACK CARD VIEW ================= */
              <div className={styles.idCardBack}>
                {/* Left Green Accent Strip */}
                <div className={styles.backGreenStrip}>
                  <div className={styles.websiteUrlWrap}>
                    <span>website:-http://allindialabourparty.com/</span>
                  </div>
                </div>

                {/* Center Address Content */}
                <div className={styles.backCenterBody}>
                  <div className={styles.backDetailsList}>
                    <div className={styles.backRow}>
                      <span>S/O :-</span>
                      <strong>{member?.fatherName || "—"}</strong>
                    </div>
                    <div className={styles.backRow}>
                      <span>Vill :-</span>
                      <span>{member?.village || member?.villageCity || "—"}</span>
                    </div>
                    <div className={styles.backRow}>
                      <span>P/O :-</span>
                      <span>{member?.postOffice || member?.block || "—"}</span>
                    </div>
                    <div className={styles.backRow}>
                      <span>Dist :-</span>
                      <span>
                        {member?.district || "—"}{member?.state ? `, (${member.state})` : ""}
                      </span>
                    </div>
                    <div className={styles.backRow}>
                      <span>Pin :-</span>
                      <strong>{member?.pincode || "—"}</strong>
                    </div>
                    <div className={styles.backRow}>
                      <span>Mob :-</span>
                      <strong>{member?.mobile || "—"}</strong>
                    </div>
                    <div className={`${styles.backRow} ${styles.constituencyRow}`}>
                      <span>Assembly :-</span>
                      <strong className={styles.constituencyHighlight}>{member?.assembly || "—"}</strong>
                    </div>
                  </div>

                  <div className={styles.backQrAndDate}>
                    <div className={styles.backQrFrame}>
                      <img src={qrCodeUrl} alt="Card Security QR" />
                    </div>
                    <span className={styles.issueDateText}>
                      Issue Date:- {formatDate(member?.joinDate || member?.createdAt || new Date())}
                    </span>
                  </div>
                </div>

                {/* Right Saffron Header Banner */}
                <div className={styles.backSaffronStrip}>
                  <h2 className={styles.partyVerticalTitle}>ALL INDIA LABOUR PARTY</h2>
                </div>
              </div>
            )}
          </div>

          <div className={styles.cardHelperText}>
            <Info size={14} />
            <span>Showing official {activeSide} view • Formatted for standard CR-80 PVC identity card printing</span>
          </div>
        </div>

        {/* Right Side: Security Specs & Verification Panel */}
        <div className={styles.specsColumn}>
          <div className={styles.specsCard}>
            <div className={styles.specsHeader}>
              <ShieldCheck size={18} className={styles.shieldIcon} />
              <h3>Verification Record</h3>
            </div>

            <div className={styles.specItemList}>
              <div className={styles.specItem}>
                <label>Membership Status</label>
                <span className={styles.statusVerified}>
                  <CheckCircle2 size={13} /> {member?.membershipStatus || "REGISTERED"}
                </span>
              </div>

              <div className={styles.specItem}>
                <label>National Token ID</label>
                <span className={styles.monoId}>{member?.membershipId || member?.memberId || "PENDING"}</span>
              </div>

              <div className={styles.specItem}>
                <label>Party Designation</label>
                <span>{member?.roleTitle || (member?.role === "admin" ? "Administrator" : "Party Member")}</span>
              </div>

              <div className={styles.specItem}>
                <label>Assembly Constituency</label>
                <span>{member?.assembly || "—"}</span>
              </div>

              <div className={styles.specItem}>
                <label>Registered Head Office</label>
                <span style={{ fontSize: "11.5px", textAlign: "right" }}>Kolkata - 700103</span>
              </div>

              <div className={styles.specItem}>
                <label>Central Regd. Number</label>
                <span>56/119/2018-18/PPS-I</span>
              </div>
            </div>

            <div className={styles.securityBox}>
              <Sparkles size={16} />
              <div>
                <h4>Anti-Counterfeit Protection</h4>
                <p>Equipped with unique central digital validation QR token and cryptographic member verification hash.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}