"use client";

/* ==========================================================
   AILP DONATE PAGE
========================================================== */

import DonateHero from "@/components/donate/DonateHero/DonateHero";
import DonationImpact from "@/components/donate/DonationImpact/DonationImpact";
import DonationForm from "@/components/donate/DonationForm/DonationForm";
import DonationOffline from "@/components/donate/DonationOffline/DonationOffline";
import DonationNotice from "@/components/donate/DonationNotice/DonationNotice";

import styles from "./Donate.module.css";

export default function DonatePage() {
  return (
    <main className={styles.page}>
      {/* ================================================
          HERO
      ================================================= */}

      <DonateHero />

      {/* ================================================
          IMPACT
      ================================================= */}

      <DonationImpact />

      {/* ================================================
          STEP 1 — HOW TO PAY (UPI QR / Bank details)
      ================================================= */}

      <DonationOffline />

      {/* ================================================
          STEP 2 — CONFIRM CONTRIBUTION (proof upload)
      ================================================= */}

      <DonationForm />

      {/* ================================================
          NOTICE
      ================================================= */}

      <DonationNotice />
    </main>
  );
}