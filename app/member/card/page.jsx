/* ==========================================================
   Member Card Page
   All India Labour Party
========================================================== */

"use client";

import { useRouter } from "next/navigation";

import {
  ArrowLeft,
  Download,
  Printer,
} from "lucide-react";

import Sidebar from "@/components/member/Sidebar";
import Header from "@/components/member/Header";
import MembershipCard from "@/components/member/MembershipCard";

import styles from "./CardPage.module.css";

export default function MemberCardPage() {
  const router = useRouter();

  /* ==========================================================
     Print Card
  ========================================================== */

  function handlePrint() {
    window.print();
  }

  /* ==========================================================
     Download Membership Card PDF
  ========================================================== */

  function handleDownload() {
    window.open(
      "/api/member/download-card",
      "_blank"
    );
  }

  return (
    <div className={styles.container}>
      {/* ==========================================
          Sidebar
      ========================================== */}

      <aside className={styles.sidebar}>
        <Sidebar />
      </aside>

      {/* ==========================================
          Main
      ========================================== */}

      <main className={styles.main}>
        {/* Header */}

        <Header />

        {/* Page Header */}

        <div className={styles.pageHeader}>
          <div>
            <h1>Membership Card</h1>

            <p>
              View, Print and Download your
              official AILP Membership Card.
            </p>
          </div>

          <div className={styles.actions}>
            <button
              className={styles.secondaryButton}
              onClick={() =>
                router.push("/member/dashboard")
              }
            >
              <ArrowLeft size={18} />

              Dashboard
            </button>

            <button
              className={styles.secondaryButton}
              onClick={handlePrint}
            >
              <Printer size={18} />

              Print
            </button>

            <button
              className={styles.primaryButton}
              onClick={handleDownload}
            >
              <Download size={18} />

              Download PDF
            </button>
          </div>
        </div>

        {/* Membership Card */}

        <MembershipCard />
      </main>
    </div>
  );
}