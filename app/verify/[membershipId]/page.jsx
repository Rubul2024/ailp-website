/* ==========================================================
   Member Verification Page
   All India Labour Party
========================================================== */

"use client";

import { useEffect, useState } from "react";

import Image from "next/image";

import { useParams } from "next/navigation";

import {
  ShieldCheck,
  CreditCard,
  MapPin,
  CalendarDays,
  BadgeCheck,
  XCircle,
} from "lucide-react";

import styles from "./Verify.module.css";

export default function VerifyMemberPage() {
  const { membershipId } = useParams();

  const [member, setMember] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  /* ==========================================================
     Load Member
  ========================================================== */

  useEffect(() => {
    async function verifyMember() {
      try {
        const response = await fetch(
          `/api/verify/${membershipId}`
        );

        const data = await response.json();

        if (!data.success) {
          setError(data.message);
          return;
        }

        setMember(data.member);
      } catch (error) {
        console.error(error);
        setError("Unable to verify member.");
      } finally {
        setLoading(false);
      }
    }

    if (membershipId) {
      verifyMember();
    }
  }, [membershipId]);

  /* ==========================================================
     Loading
  ========================================================== */

  if (loading) {
    return (
      <div className={styles.loading}>
        Verifying Membership...
      </div>
    );
  }

  /* ==========================================================
     Error
  ========================================================== */

  if (error) {
    return (
      <div className={styles.errorWrapper}>
        <XCircle size={70} />

        <h1>Verification Failed</h1>

        <p>{error}</p>
      </div>
    );
  }

  return (
    <main className={styles.wrapper}>
      {/* ======================================
          Card
      ====================================== */}

      <section className={styles.card}>
        {/* Header */}

        <div className={styles.header}>
          <Image
            src="/logo.png"
            alt="AILP Logo"
            width={80}
            height={80}
            priority
          />

          <h1>
            ALL INDIA LABOUR PARTY
          </h1>

          <p>
            Official Membership
            Verification
          </p>
        </div>

        {/* Verification Badge */}

        <div className={styles.badge}>
          <ShieldCheck size={22} />

          VERIFIED MEMBER
        </div>

        {/* Member Photo */}

        <Image
          src={
            member.photo ||
            "/images/avatar.png"
          }
          alt="Member"
          width={150}
          height={180}
          className={styles.photo}
        />

        {/* Information */}

        <div className={styles.infoGrid}>
          <div className={styles.info}>
            <label>Member Name</label>

            <h3>{member.fullName}</h3>
          </div>

          <div className={styles.info}>
            <label>
              Membership ID
            </label>

            <h3>
              <CreditCard
                size={18}
              />

              {member.membershipId}
            </h3>
          </div>

          <div className={styles.info}>
            <label>Location</label>

            <h3>
              <MapPin
                size={18}
              />

              {member.district},{" "}
              {member.state}
            </h3>
          </div>

          <div className={styles.info}>
            <label>
              Join Date
            </label>

            <h3>
              <CalendarDays
                size={18}
              />

              {member.joinDate
                ? new Date(
                    member.joinDate
                  ).toLocaleDateString(
                    "en-IN"
                  )
                : "-"}
            </h3>
          </div>

          <div className={styles.info}>
            <label>Status</label>

            <span
              className={
                styles.status
              }
            >
              <BadgeCheck
                size={18}
              />

              {
                member.membershipStatus
              }
            </span>
          </div>
        </div>

        {/* Footer */}

        <div className={styles.footer}>
          <p>
            This membership has
            been successfully
            verified by the
            All India Labour Party.
          </p>
        </div>
      </section>
    </main>
  );
}