"use client";

import { useEffect, useState } from "react";

import styles from "./Donation.module.css";

export default function DonationPage() {

  const [formData, setFormData] = useState({

    bankName: "",

    accountHolder: "",

    accountNumber: "",

    ifscCode: "",

    branch: "",

    upiId: "",

    qrCode: "",

    donationMessage: "",

    donationEnabled: true,

  });

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState("");

  const [error, setError] = useState("");

  useEffect(() => {

    loadDonationSettings();

  }, []);

  async function loadDonationSettings() {

    try {

      setLoading(true);

      const response = await fetch("/api/admin/donation", {

        credentials: "include",

      });

      const data = await response.json();

      if (!data.success) {

        setError(data.message);

        return;

      }

      if (data.donation) {

        setFormData({

          bankName: data.donation.bankName || "",

          accountHolder: data.donation.accountHolder || "",

          accountNumber: data.donation.accountNumber || "",

          ifscCode: data.donation.ifscCode || "",

          branch: data.donation.branch || "",

          upiId: data.donation.upiId || "",

          qrCode: data.donation.qrCode || "",

          donationMessage: data.donation.donationMessage || "",

          donationEnabled:

            data.donation.donationEnabled ?? true,

        });

      }

    }

    catch {

      setError("Unable to load donation settings.");

    }

    finally {

      setLoading(false);

    }

  }

  function handleChange(event) {

    const {

      name,

      value,

      type,

      checked,

    } = event.target;

    setFormData((previous) => ({

      ...previous,

      [name]:

        type === "checkbox"

          ? checked

          : value,

    }));

  }

  async function handleSubmit(event) {

    event.preventDefault();

    setSaving(true);

    setMessage("");

    setError("");

    try {

      const response = await fetch(

        "/api/admin/donation",

        {

          method: "PUT",

          credentials: "include",

          headers: {

            "Content-Type": "application/json",

          },

          body: JSON.stringify(formData),

        }

      );

      const data = await response.json();

      if (!data.success) {

        setError(data.message);

        return;

      }

      setMessage("Donation information updated successfully.");

    }

    catch {

      setError("Unable to update donation information.");

    }

    finally {

      setSaving(false);

    }

  }

  if (loading) {

    return (

      <div className={styles.loading}>

        <h2>Loading Donation Information...</h2>

      </div>

    );

  }

  return (

    <div className={styles.page}>

      <div className={styles.header}>

        <div className={styles.title}>

          <h1>Donation Information</h1>

          <p>

            Manage party bank details and payment

            information.

          </p>

        </div>

      </div>

      {message && (

        <div className={styles.success}>

          {message}

        </div>

      )}

      {error && (

        <div className={styles.error}>

          {error}

        </div>

      )}

      <form

        className={styles.card}

        onSubmit={handleSubmit}

      >

        <div className={styles.grid}>

          <div className={styles.group}>

            <label>Bank Name</label>

            <input

              name="bankName"

              value={formData.bankName}

              onChange={handleChange}

            />

          </div>

          <div className={styles.group}>

            <label>Account Holder</label>

            <input

              name="accountHolder"

              value={formData.accountHolder}

              onChange={handleChange}

            />

          </div>

          <div className={styles.group}>

            <label>Account Number</label>

            <input

              name="accountNumber"

              value={formData.accountNumber}

              onChange={handleChange}

            />

          </div>

          <div className={styles.group}>

            <label>IFSC Code</label>

            <input

              name="ifscCode"

              value={formData.ifscCode}

              onChange={handleChange}

            />

          </div>

          <div className={styles.group}>

            <label>Branch</label>

            <input

              name="branch"

              value={formData.branch}

              onChange={handleChange}

            />

          </div>

          <div className={styles.group}>

            <label>UPI ID</label>

            <input

              name="upiId"

              value={formData.upiId}

              onChange={handleChange}

            />

          </div>

          <div className={`${styles.group} ${styles.full}`}>

            <label>QR Code Image URL</label>

            <input

              name="qrCode"

              value={formData.qrCode}

              onChange={handleChange}

            />
          </div>

          <div className={`${styles.group} ${styles.full}`}>

            <label>Donation Message</label>

            <textarea

              name="donationMessage"

              value={formData.donationMessage}

              onChange={handleChange}

            />
          </div>

          <div className={`${styles.group} ${styles.full}`}>

            <div className={styles.switchRow}>

              <input

                type="checkbox"

                name="donationEnabled"

                checked={formData.donationEnabled}

                onChange={handleChange}

              />

              <label>

                Enable Donation

              </label>

            </div>

          </div>

        </div>

        <div className={styles.footer}>

          <button

            type="submit"

            className={styles.saveButton}

            disabled={saving}

          >

            {saving

              ? "Saving..."

              : "Save Donation Information"}

          </button>

        </div>

      </form>

    </div>

  );

}