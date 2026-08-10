"use client";

/* ==========================================================
   AILP DONATE PAGE
========================================================== */

import Script from "next/script";

import DonateHero from "@/components/donate/DonateHero/DonateHero";
import DonationImpact from "@/components/donate/DonationImpact/DonationImpact";
import DonationForm from "@/components/donate/DonationForm/DonationForm";
import DonationOffline from "@/components/donate/DonationOffline/DonationOffline";
import DonationNotice from "@/components/donate/DonationNotice/DonationNotice";

import styles from "./Donate.module.css";

export default function DonatePage() {
  return (
    <main className={styles.page}>
      {/* Razorpay Checkout */}

      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
      />

      {/* ================================================
          HERO
      ================================================= */}

      <DonateHero />

      {/* ================================================
          IMPACT
      ================================================= */}

      <DonationImpact />

      {/* ================================================
          ONLINE DONATION
      ================================================= */}

      <DonationForm />

      {/* ================================================
          OFFLINE DONATION
      ================================================= */}

      <DonationOffline />

      {/* ================================================
          NOTICE
      ================================================= */}

      <DonationNotice />
    </main>
  );
}