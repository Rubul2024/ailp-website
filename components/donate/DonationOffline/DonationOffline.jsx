"use client";

import { useState } from "react";

import {
  Smartphone,
  Building2,
  Copy,
  Check,
} from "lucide-react";

import styles from "./DonationOffline.module.css";

export default function DonationOffline() {
  const [copied, setCopied] = useState("");

  const upiId =
    process.env.NEXT_PUBLIC_AILP_UPI_ID ||
    "your-upi-id@bank";

  const accountName =
    "ALL INDIA LABOUR PARTY";

  const accountNumber =
    process.env.NEXT_PUBLIC_AILP_ACCOUNT_NUMBER ||
    "50200120538331";

  const ifsc =
    process.env.NEXT_PUBLIC_AILP_IFSC ||
    "HDFC0008348";

  async function copyText(value, type) {
    try {
      await navigator.clipboard.writeText(value);

      setCopied(type);

      setTimeout(() => {
        setCopied("");
      }, 2000);
    } catch {
      setCopied("");
    }
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.heading}>
          <span>OTHER WAYS TO CONTRIBUTE</span>

          <h2>
            Donate Through
            <strong> UPI or Bank Transfer</strong>
          </h2>

          <p>
            Prefer to contribute directly? You can use the
            official payment details below.
          </p>
        </div>

        <div className={styles.grid}>
          {/* UPI */}

          <article className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.icon}>
                <Smartphone size={24} />
              </div>

              <div>
                <h3>UPI Contribution</h3>

                <p>Fast and convenient</p>
              </div>
            </div>

            <div className={styles.qr}>
              <img
                src="/images/donation/upi-qr.png"
                alt="AILP UPI payment QR code"
              />
            </div>

            <div className={styles.upiBox}>
              <span>UPI ID</span>

              <strong>{upiId}</strong>

              <button
                type="button"
                onClick={() =>
                  copyText(upiId, "upi")
                }
              >
                {copied === "upi" ? (
                  <Check size={17} />
                ) : (
                  <Copy size={17} />
                )}

                {copied === "upi"
                  ? "Copied"
                  : "Copy"}
              </button>
            </div>
          </article>

          {/* Bank */}

          <article className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.icon}>
                <Building2 size={24} />
              </div>

              <div>
                <h3>Bank Transfer</h3>

                <p>Direct contribution</p>
              </div>
            </div>

            <div className={styles.bankDetails}>
              <Detail
                label="Account Name"
                value={accountName}
                onCopy={() =>
                  copyText(accountName, "name")
                }
                copied={
                  copied === "name"
                }
              />

              <Detail
                label="Account Number"
                value={accountNumber}
                onCopy={() =>
                  copyText(
                    accountNumber,
                    "account"
                  )
                }
                copied={
                  copied === "account"
                }
              />

              <Detail
                label="IFSC Code"
                value={ifsc}
                onCopy={() =>
                  copyText(ifsc, "ifsc")
                }
                copied={
                  copied === "ifsc"
                }
              />

              <div className={styles.bankNotice}>
                Please retain your transaction
                reference for your records.
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function Detail({
  label,
  value,
  onCopy,
  copied,
}) {
  return (
    <div className={styles.detail}>
      <span>{label}</span>

      <div>
        <strong>{value}</strong>

        <button
          type="button"
          onClick={onCopy}
          aria-label={`Copy ${label}`}
        >
          {copied ? (
            <Check size={16} />
          ) : (
            <Copy size={16} />
          )}
        </button>
      </div>
    </div>
  );
}