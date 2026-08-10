"use client";

/* ==========================================================
   Member Donation Page
   All India Labour Party
   Production Ready
========================================================== */

import { useState } from "react";

import DonationHistory from "@/components/member/DonationHistory";

import {
  HeartHandshake,
  IndianRupee,
  CreditCard,
} from "lucide-react";

import styles from "./DonationPage.module.css";

export default function DonationPage() {
  const [amount, setAmount] = useState("");

  const [paymentMethod, setPaymentMethod] =
    useState("ONLINE");

  const [message, setMessage] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  /* ==========================================================
     Donate
  ========================================================== */

  async function handleSubmit(event) {
    event.preventDefault();

    setLoading(true);

    try {
      const response = await fetch(
        "/api/member/donation",
        {
          method: "POST",

          credentials: "include",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            amount,

            paymentMethod,

            message,
          }),
        }
      );

      const data = await response.json();

      if (!data.success) {
        alert(data.message);

        return;
      }

      alert(data.message);

      setAmount("");

      setMessage("");

      window.location.reload();
    } catch (error) {
      console.error(error);

      alert("Unable to submit donation.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.page}>
      {/* ==========================================
          Page Header
      ========================================== */}

      <div className={styles.pageHeader}>
        <h1>Support All India Labour Party</h1>

        <p>
          Your contribution helps us
          strengthen our mission for
          workers, youth and social
          justice.
        </p>
      </div>

      {/* ==========================================
          Donation Form
      ========================================== */}

      <section className={styles.card}>
        <div className={styles.cardHeader}>
          <HeartHandshake size={32} />

          <div>
            <h2>Make a Donation</h2>

            <p>
              Every contribution makes a
              difference.
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className={styles.form}
        >
          {/* Amount */}

          <div className={styles.field}>
            <label>
              Donation Amount
            </label>

            <div
              className={
                styles.inputGroup
              }
            >
              <IndianRupee
                size={18}
              />

              <input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(event) =>
                  setAmount(
                    event.target.value
                  )
                }
                required
              />
            </div>
          </div>

          {/* Payment Method */}

          <div className={styles.field}>
            <label>
              Payment Method
            </label>

            <select
              value={paymentMethod}
              onChange={(event) =>
                setPaymentMethod(
                  event.target.value
                )
              }
            >
              <option value="ONLINE">
                Online Payment
              </option>

              <option value="UPI">
                UPI
              </option>

              <option value="BANK_TRANSFER">
                Bank Transfer
              </option>

              <option value="CASH">
                Cash
              </option>
            </select>
          </div>

          {/* Message */}

          <div className={styles.field}>
            <label>
              Message (Optional)
            </label>

            <textarea
              rows={4}
              placeholder="Write a message..."
              value={message}
              onChange={(event) =>
                setMessage(
                  event.target.value
                )
              }
            />
          </div>

          {/* Submit */}

          <button
            type="submit"
            className={
              styles.submitButton
            }
            disabled={loading}
          >
            <CreditCard
              size={18}
            />

            {loading
              ? "Processing..."
              : "Donate Now"}
          </button>
        </form>
      </section>

      {/* ==========================================
          Donation History
      ========================================== */}

      <DonationHistory />
    </div>
  );
}