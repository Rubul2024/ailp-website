"use client";

/* ==========================================================
   AILP Membership Card
========================================================== */

import { useEffect, useState } from "react";

import Image from "next/image";

import {
  CreditCard,
  MapPin,
  ShieldCheck,
  QrCode,
} from "lucide-react";

import styles from "./MembershipCard.module.css";

export default function MembershipCard() {
  const [member, setMember] = useState(null);

  const [loading, setLoading] = useState(true);

  /* ==========================================================
     Load Member
  ========================================================== */

  useEffect(() => {
    async function loadMember() {
      try {
        const response = await fetch(
          "/api/member/me",
          {
            credentials: "include",
          }
        );

        const data = await response.json();

        if (data.success) {
          setMember(data.member);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadMember();
  }, []);

  if (loading) {
    return (
      <div className={styles.loading}>
        Loading Membership Card...
      </div>
    );
  }

  return (
    <section className={styles.wrapper}>
      <div className={styles.card}>
        {/* ==========================================
            Header
        ========================================== */}

        <div className={styles.header}>
          <Image
            src="/logo.png"
            alt="AILP Logo"
            width={60}
            height={60}
            priority
          />

          <div>
            <h2>ALL INDIA LABOUR PARTY</h2>

            <p>Official Digital Membership Card</p>
          </div>
        </div>

        {/* ==========================================
            Body
        ========================================== */}

        <div className={styles.body}>
          {/* Left */}

          <div className={styles.left}>
            <Image
              src={
                member?.photo ||
                "/images/avatar.png"
              }
              alt="Member"
              width={120}
              height={140}
              className={styles.photo}
            />

            <div className={styles.status}>
              <ShieldCheck size={18} />

              <span>
                {member?.membershipStatus ||
                  "REGISTERED"}
              </span>
            </div>
          </div>

          {/* Right */}

          <div className={styles.right}>
            <div className={styles.item}>
              <label>Member Name</label>

              <h3>
                {member?.fullName}
              </h3>
            </div>

            <div className={styles.item}>
              <label>
                Membership ID
              </label>

              <h3>
                <CreditCard
                  size={18}
                />

                {member?.membershipId ||
                  "Pending"}
              </h3>
            </div>

            <div className={styles.item}>
              <label>Location</label>

              <h3>
                <MapPin
                  size={18}
                />

                {member?.district ||
                  "-"}
                ,

                {" "}

                {member?.state ||
                  "-"}
              </h3>
            </div>

            <div className={styles.item}>
              <label>
                Join Date
              </label>

              <h3>
                {member?.joinDate
                  ? new Date(
                      member.joinDate
                    ).toLocaleDateString(
                      "en-IN"
                    )
                  : "Pending"}
              </h3>
            </div>
          </div>
        </div>

        {/* ==========================================
            Footer
        ========================================== */}

        <div className={styles.footer}>
          <div className={styles.qrBox}>
            {member?.qrCode ? (
              <Image
                src={member.qrCode}
                alt="QR Code"
                width={90}
                height={90}
              />
            ) : (
              <>
                <QrCode
                  size={50}
                />

                <span>
                  QR Coming Soon
                </span>
              </>
            )}
          </div>

          <div className={styles.footerText}>
            <strong>
              Digital Identity Card
            </strong>

            <p>
              This card is the official
              membership identity of the
              All India Labour Party.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}