"use client";

import { useEffect, useState } from "react";
import { Smartphone, Building2, Copy, Check, QrCode, ShieldCheck } from "lucide-react";
import styles from "./DonationOffline.module.css";

export default function DonationOffline() {
  const [settings, setSettings] = useState(null);
  const [copiedKey, setCopiedKey] = useState("");
  const [loading, setLoading] = useState(true);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    async function fetchDonationSettings() {
      try {
        const res = await fetch(`/api/donation/settings?t=${Date.now()}`, {
          cache: "no-store",
        });
        const data = await res.json();
        if (data.success && data.settings) {
          setSettings(data.settings);
        }
      } catch (err) {
        console.error("Failed to load public donation details:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchDonationSettings();
  }, []);

  const handleCopy = (text, key) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(""), 2000);
  };

  if (!loading && settings && settings.donationEnabled === false) {
    return (
      <div className={styles.disabledNotice}>
        <ShieldCheck size={32} />
        <h3>Online Donations Paused</h3>
        <p>Direct contributions are currently not being accepted. Please check back later.</p>
      </div>
    );
  }

  const bankName = settings?.bankName || "State Bank of India";
  const accountHolder = settings?.accountHolder || "ALL INDIA LABOUR PARTY";
  const accountNumber = settings?.accountNumber || "20370176285";
  const ifscCode = settings?.ifscCode || "SBIN0000058";
  const branch = settings?.branch || "";
  const upiId = settings?.upiId || "9967647612@ybl";
  const qrCode = settings?.qrCode || "";

  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.cardsGrid}>
          {/* Left Card: UPI & QR Code */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.iconWrap}>
                <Smartphone size={22} />
              </div>
              <div className={styles.headerText}>
                <h3>UPI Contribution</h3>
                <p>Fast and convenient via any UPI app</p>
              </div>
            </div>

            <div className={styles.qrContainer}>
              {qrCode && !imgError ? (
                <img
                  src={qrCode}
                  alt="AILP Official UPI QR Code"
                  className={styles.qrImage}
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className={styles.qrEmpty}>
                  <QrCode size={56} className={styles.qrEmptyIcon} />
                  <span>UPI QR Code Available Soon</span>
                </div>
              )}
            </div>

            <div className={styles.upiBox}>
              <div className={styles.upiInfo}>
                <span className={styles.fieldLabel}>UPI ID / VPA</span>
                <strong className={styles.upiValue}>{upiId}</strong>
              </div>
              <button
                type="button"
                className={styles.copyBtn}
                onClick={() => handleCopy(upiId, "upi")}
              >
                {copiedKey === "upi" ? <Check size={16} /> : <Copy size={16} />}
                <span>{copiedKey === "upi" ? "COPIED" : "COPY"}</span>
              </button>
            </div>
          </div>

          {/* Right Card: Bank Transfer Details */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.iconWrap}>
                <Building2 size={22} />
              </div>
              <div className={styles.headerText}>
                <h3>Bank Transfer</h3>
                <p>Direct contribution to official account</p>
              </div>
            </div>

            <div className={styles.detailsList}>
              <div className={styles.detailRow}>
                <div className={styles.detailContent}>
                  <span className={styles.fieldLabel}>ACCOUNT NAME</span>
                  <strong className={styles.fieldValue}>{accountHolder}</strong>
                </div>
                <button
                  type="button"
                  className={styles.iconCopyBtn}
                  onClick={() => handleCopy(accountHolder, "holder")}
                  title="Copy Account Name"
                >
                  {copiedKey === "holder" ? <Check size={16} /> : <Copy size={16} />}
                </button>
              </div>

              <div className={styles.detailRow}>
                <div className={styles.detailContent}>
                  <span className={styles.fieldLabel}>BANK NAME</span>
                  <strong className={styles.fieldValue}>
                    {bankName} {branch ? `(${branch})` : ""}
                  </strong>
                </div>
                <button
                  type="button"
                  className={styles.iconCopyBtn}
                  onClick={() => handleCopy(bankName, "bank")}
                  title="Copy Bank Name"
                >
                  {copiedKey === "bank" ? <Check size={16} /> : <Copy size={16} />}
                </button>
              </div>

              <div className={styles.detailRow}>
                <div className={styles.detailContent}>
                  <span className={styles.fieldLabel}>ACCOUNT NUMBER</span>
                  <strong className={styles.fieldValueMono}>{accountNumber}</strong>
                </div>
                <button
                  type="button"
                  className={styles.iconCopyBtn}
                  onClick={() => handleCopy(accountNumber, "acc")}
                  title="Copy Account Number"
                >
                  {copiedKey === "acc" ? <Check size={16} /> : <Copy size={16} />}
                </button>
              </div>

              <div className={styles.detailRow}>
                <div className={styles.detailContent}>
                  <span className={styles.fieldLabel}>IFSC CODE</span>
                  <strong className={styles.fieldValueMono}>{ifscCode}</strong>
                </div>
                <button
                  type="button"
                  className={styles.iconCopyBtn}
                  onClick={() => handleCopy(ifscCode, "ifsc")}
                  title="Copy IFSC Code"
                >
                  {copiedKey === "ifsc" ? <Check size={16} /> : <Copy size={16} />}
                </button>
              </div>
            </div>

            <div className={styles.noticeBox}>
              <p>Please retain your transaction reference or UTR number for records.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}