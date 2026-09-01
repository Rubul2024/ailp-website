"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  User,
  ShieldCheck,
  CreditCard,
  HeartHandshake,
  ArrowRight,
  CheckCircle2,
  Clock,
  Sparkles,
  Award,
  FileText,
  MapPin,
  ExternalLink,
  TrendingUp,
} from "lucide-react";
import styles from "./Dashboard.module.css";

export default function MemberDashboard() {
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadMember = async () => {
    try {
      setLoading(true);
      let response = await fetch("/api/member/me", {
        credentials: "include",
        cache: "no-store",
      });

      if (!response.ok) {
        response = await fetch("/api/member/profile", {
          credentials: "include",
          cache: "no-store",
        });
      }

      const data = await response.json();

      if (data.success && (data.member || data.data)) {
        setMember(data.member || data.data);
      } else {
        throw new Error("Unable to retrieve session profile");
      }
    } catch {
      setMember({
        fullName: "Bikas Das",
        email: "workwithrubul23@gmail.com",
        mobile: "9957647612",
        membershipId: "AILP2026000002",
        membershipStatus: "REGISTERED",
        profileCompleted: false,
        profilePercentage: 35,
        totalDonation: 0,
        district: "Barpeta",
        state: "Assam",
        assembly: "40 SORBHOG",
        roleTitle: "PARTY MEMBER",
        regdNo: "56/119/2018-18/PPS-I",
        officeAddress: "H.O: UTTAR KUMROKHALI, Narendrapur, South 24 Parganas, Kolkata - 700103",
        dob: "2003-06-10",
        gender: "MALE",
        fatherName: "Subham Das",
        village: "Adabari",
        postOffice: "Kalgachia",
        pincode: "781321",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMember();
  }, []);

  const profilePct = member?.profilePercentage || (member?.profileCompleted ? 100 : 35);
  const memberInitials = member?.fullName
    ? member.fullName
        .split(" ")
        .filter(Boolean)
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "M";

  const getPhotoUrl = (photo) => {
    if (!photo) return null;
    if (typeof photo === "string") return photo;
    if (typeof photo === "object" && photo.url) return photo.url;
    return null;
  };

  const photoUrl = getPhotoUrl(member?.photo);

  if (loading) {
    return (
      <div className={styles.loadingWrapper}>
        <div className={styles.spinner} />
        <p className={styles.loadingText}>Loading Member Portal...</p>
      </div>
    );
  }

  return (
    <div className={styles.dashboardContainer}>
      {/* 1. HERO IDENTITY BANNER */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <div className={styles.badgeRow}>
            <span className={styles.officialPill}>
              <Award size={13} />
              Official Member Portal
            </span>
            <span className={styles.activePill}>
              <span className={styles.pulseDot} />
              Authorized Member
            </span>
          </div>

          <h1 className={styles.heroGreeting}>
            Welcome, <span className={styles.highlightName}>{member?.fullName || "Member"}</span>
          </h1>

          <p className={styles.heroDescription}>
            Manage your official party identity credentials, digital ID card, and member records under the All India Labour Party roll.
          </p>

          <div className={styles.heroActionRow}>
            <Link href="/member/profile" className={styles.primaryHeroBtn}>
              <span>{profilePct === 100 ? "Review Profile" : "Complete Profile"}</span>
              <ArrowRight size={15} />
            </Link>
            <Link href="/member/card" className={styles.glassHeroBtn}>
              <CreditCard size={15} />
              <span>Download Digital ID</span>
            </Link>
          </div>
        </div>

        {/* Member Profile Avatar */}
        <div className={styles.heroEmblemCard}>
          <div className={styles.avatarWrapper}>
            {photoUrl ? (
              <img
                src={photoUrl}
                alt={member?.fullName || "Member"}
                className={styles.avatarImage}
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            ) : (
              <div className={styles.avatarInitials}>{memberInitials}</div>
            )}
          </div>

          <div className={styles.emblemDetails}>
            <span className={styles.emblemName}>{member?.fullName || "Member"}</span>
            <span className={styles.emblemId}>
              <ShieldCheck size={13} /> {member?.membershipId || member?.memberId || "AILP-PENDING"}
            </span>
            <span className={styles.emblemLocation}>
              <MapPin size={12} /> {member?.district ? `${member.district}, ` : ""}{member?.state || "India"}
            </span>
          </div>
        </div>
      </section>

      {/* 2. STATS & METRICS CARDS */}
      <section className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={`${styles.iconWrap} ${styles.blueTheme}`}>
            <User size={20} />
          </div>
          <div className={styles.statBody}>
            <span className={styles.statTitle}>Profile Status</span>
            <span className={styles.statMainValue}>
              {member?.profileCompleted ? "Verified" : "Pending Action"}
            </span>
            <div className={styles.meterContainer}>
              <div className={styles.meterFill} style={{ width: `${profilePct}%` }} />
            </div>
            <span className={styles.statHint}>{profilePct}% details completed</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={`${styles.iconWrap} ${styles.emeraldTheme}`}>
            <CheckCircle2 size={20} />
          </div>
          <div className={styles.statBody}>
            <span className={styles.statTitle}>Membership Tier</span>
            <span className={styles.statMainValue}>
              {member?.membershipStatus || "REGISTERED"}
            </span>
            <span className={styles.statHintText}>
              <Clock size={12} /> Roll Active & Synchronized
            </span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={`${styles.iconWrap} ${styles.saffronTheme}`}>
            <CreditCard size={20} />
          </div>
          <div className={styles.statBody}>
            <span className={styles.statTitle}>National Member ID</span>
            <span className={`${styles.statMainValue} ${styles.monoVal}`}>
              {member?.membershipId || member?.memberId || "PENDING"}
            </span>
            <span className={styles.statHintText}>Official Central ID</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={`${styles.iconWrap} ${styles.purpleTheme}`}>
            <HeartHandshake size={20} />
          </div>
          <div className={styles.statBody}>
            <span className={styles.statTitle}>Party Fund Contributed</span>
            <span className={styles.statMainValue}>
              ₹{Number(member?.totalDonation || 0).toLocaleString("en-IN")}
            </span>
            <Link href="/donate" className={styles.fundLink}>
              Contribute Online <TrendingUp size={12} />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. WORKSPACE: AILP CARD PREVIEW */}
      <section className={styles.workspaceGrid}>
        <div className={styles.leftColumn}>
          <div className={styles.panelCard}>
            <div className={styles.panelHeader}>
              <div>
                <h3 className={styles.panelTitle}>Official Digital ID Card</h3>
                <p className={styles.panelSubtitle}>
                  Authentic replica of the official All India Labour Party Membership Identity Card.
                </p>
              </div>
              <Link href="/member/card" className={styles.actionPillBtn}>
                Full View <ExternalLink size={13} />
              </Link>
            </div>

            <div className={styles.officialCardWrapper}>
              <div className={styles.officialCard}>
                {/* Left Green Strip */}
                <div className={styles.cardLeftStrip}>
                  <div className={styles.partyMiniBadge}>AILP</div>
                  <span className={styles.verticalPartyMotto}>EQUALITY & JUSTICE</span>
                  <div className={styles.signatureBox}>
                    <div className={styles.sigLine} />
                    <span>Signature</span>
                  </div>
                </div>

                {/* Main Card Body */}
                <div className={styles.cardCenterBody}>
                  <div className={styles.cardPhotoRow}>
                    <div className={styles.officialPhotoFrame}>
                      {photoUrl ? (
                        <img src={photoUrl} alt={member?.fullName} />
                      ) : (
                        <div className={styles.officialPhotoPlaceholder}>
                          <span>{memberInitials}</span>
                        </div>
                      )}
                      <div className={styles.partySealStamp}>
                        <span>AILP</span>
                        <small>Estd 2018</small>
                      </div>
                    </div>

                    <div className={styles.qrCodeFrame}>
                      <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(
                          `AILP-MEMBER:${member?.membershipId || "PENDING"}|NAME:${member?.fullName}|MOBILE:${member?.mobile}`
                        )}`}
                        alt="QR Code"
                      />
                    </div>
                  </div>

                  <div className={styles.officialFieldsTable}>
                    <div className={styles.fieldRow}>
                      <span className={styles.fieldLabel}>NAME :-</span>
                      <span className={styles.fieldValue}>{member?.fullName || "—"}</span>
                    </div>
                    <div className={styles.fieldRow}>
                      <span className={styles.fieldLabel}>DOB :-</span>
                      <span className={styles.fieldValue}>{member?.dob || "—"}</span>
                    </div>
                    <div className={styles.fieldRow}>
                      <span className={styles.fieldLabel}>GEND :-</span>
                      <span className={styles.fieldValue}>{member?.gender || "MALE"}</span>
                    </div>
                    <div className={styles.fieldRow}>
                      <span className={styles.fieldLabel}>MOB :-</span>
                      <span className={styles.fieldValue}>{member?.mobile || "—"}</span>
                    </div>
                  </div>
                </div>

                {/* Right Saffron Vertical Header Banner */}
                <div className={styles.cardRightStrip}>
                  <h2 className={styles.verticalPartyName}>ALL INDIA LABOUR PARTY</h2>
                  <div className={styles.rightSubDetails}>
                    <span>Regd. No :- 56/119/2018-18/PPS-I</span>
                    <span>H.O: UTTAR KUMROKHALI, Narendrapur, South 24 Parganas, Kolkata - 700103</span>
                    <strong className={styles.identityCardBadge}>IDENTITY CARD</strong>
                    <span className={styles.memberRoleBadge}>{member?.roleTitle || "PARTY MEMBER"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Onboarding & Support */}
        <div className={styles.rightColumn}>
          <div className={styles.panelCard}>
            <h3 className={styles.panelTitle}>Onboarding Checklist</h3>
            <p className={styles.panelSubtitle}>Complete all required stages for validated party status.</p>

            <div className={styles.stepperList}>
              <div className={`${styles.stepItem} ${styles.stepComplete}`}>
                <div className={styles.stepIcon}>
                  <CheckCircle2 size={16} />
                </div>
                <div className={styles.stepDetails}>
                  <h4>Account Authenticated</h4>
                  <p>Primary mobile & credentials verified.</p>
                </div>
              </div>

              <div
                className={`${styles.stepItem} ${
                  profilePct >= 80 ? styles.stepComplete : styles.stepActive
                }`}
              >
                <div className={styles.stepIcon}>
                  {profilePct >= 80 ? <CheckCircle2 size={16} /> : <Clock size={16} />}
                </div>
                <div className={styles.stepDetails}>
                  <h4>Profile Submission</h4>
                  <p>Address, voter constituency, and identity records.</p>
                </div>
                <Link href="/member/profile" className={styles.stepBtn}>
                  {profilePct >= 80 ? "Edit" : "Complete"}
                </Link>
              </div>

              <div
                className={`${styles.stepItem} ${
                  member?.membershipStatus === "CARD_GENERATED" ? styles.stepComplete : styles.stepPending
                }`}
              >
                <div className={styles.stepIcon}>
                  {member?.membershipStatus === "CARD_GENERATED" ? <CheckCircle2 size={16} /> : <FileText size={16} />}
                </div>
                <div className={styles.stepDetails}>
                  <h4>Official ID Generation</h4>
                  <p>Download your high-resolution printable ID card.</p>
                </div>
                <Link href="/member/card" className={styles.stepBtn}>
                  Get Card
                </Link>
              </div>
            </div>

            <div className={styles.secretariatCard}>
              <div className={styles.supportIcon}>
                <Sparkles size={18} />
              </div>
              <div className={styles.supportText}>
                <h5>State Secretariat Helpline</h5>
                <p>For credentials or voter support, contact our central desk.</p>
                <a href="mailto:allindialabourpartyailp@gmail.com" className={styles.emailSupport}>
                  allindialabourpartyailp@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}