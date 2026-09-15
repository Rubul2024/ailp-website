"use client";

import { useRef, useState } from "react";

import {
  User,
  Mail,
  Phone,
  Hash,
  IndianRupee,
  ShieldCheck,
  LoaderCircle,
  UploadCloud,
  CheckCircle2,
  ImageIcon,
  X,
} from "lucide-react";

import styles from "./DonationForm.module.css";

const amounts = [500, 1000, 2000, 5000, 10000];

export default function DonationForm() {
  const [amount, setAmount] = useState(1000);
  const [customAmount, setCustomAmount] = useState("");

  const [form, setForm] = useState({
    donorName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [utrNumber, setUtrNumber] = useState("");

  const [proofFile, setProofFile] = useState(null);
  const [proofPreview, setProofPreview] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef(null);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  }

  function selectAmount(value) {
    setAmount(value);
    setCustomAmount("");
  }

  function handleCustomAmount(event) {
    const value = event.target.value;
    setCustomAmount(value);
    if (value) setAmount(Number(value));
  }

  function handleFileSelect(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(file.type)) {
      setMessage("Only JPG, PNG or WEBP screenshots are allowed.");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setMessage("Screenshot must be smaller than 2 MB.");
      return;
    }

    setMessage("");
    setProofFile(file);
    setProofPreview(URL.createObjectURL(file));
  }

  function removeProof() {
    setProofFile(null);
    setProofPreview("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    const finalAmount = Number(customAmount || amount);

    if (!finalAmount || finalAmount < 1) {
      setMessage("Please enter a valid donation amount.");
      return;
    }
    if (!form.donorName.trim()) {
      setMessage("Please enter your full name.");
      return;
    }
    if (!proofFile) {
      setMessage("Please upload a screenshot of your UPI payment.");
      return;
    }

    try {
      setLoading(true);

      const uploadData = new FormData();
      uploadData.append("file", proofFile);
      uploadData.append("folder", "AILP/donations/proofs");

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: uploadData,
      });
      const uploadJson = await uploadRes.json();

      if (!uploadRes.ok || !uploadJson.success) {
        throw new Error(uploadJson.message || "Unable to upload payment screenshot.");
      }

      const response = await fetch("/api/donation/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          ...form,
          amount: finalAmount,
          utrNumber,
          proofImage: uploadJson.image,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to submit your donation.");
      }

      setSuccess(true);
      setMessage(data.message);
    } catch (error) {
      setMessage(error.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <section id="donate-form" className={styles.section}>
        <div className={styles.container}>
          <div className={styles.successCard}>
            <CheckCircle2 size={56} />
            <h2>Thank You for Your Contribution!</h2>
            <p>{message}</p>
            <button
              type="button"
              className={styles.submit}
              onClick={() => {
                setSuccess(false);
                setForm({ donorName: "", email: "", phone: "", message: "" });
                setUtrNumber("");
                removeProof();
                setMessage("");
              }}
            >
              Make Another Contribution
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="donate-form" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.intro}>
          <span>MAKE A CONTRIBUTION</span>

          <h2>
            Support the
            <strong> AILP Movement</strong>
          </h2>

          <p>
            Pay using the UPI QR code or bank details above, then confirm your
            contribution here by uploading the payment screenshot. Our team
            manually verifies every contribution within 24–48 hours.
          </p>

          <div className={styles.security}>
            <ShieldCheck size={20} />
            <div>
              <strong>Manually Verified</strong>
              <span>
                Every contribution is reviewed by our team before being recorded,
                keeping the process transparent and secure.
              </span>
            </div>
          </div>
        </div>

        <div className={styles.formCard}>
          <form onSubmit={handleSubmit}>
            <div className={styles.amountSection}>
              <label>Select Contribution Amount</label>

              <div className={styles.amountGrid}>
                {amounts.map((value) => (
                  <button
                    key={value}
                    type="button"
                    className={!customAmount && amount === value ? styles.selectedAmount : ""}
                    onClick={() => selectAmount(value)}
                  >
                    ₹{value.toLocaleString("en-IN")}
                  </button>
                ))}
              </div>

              <div className={styles.customAmount}>
                <IndianRupee size={18} />
                <input
                  type="number"
                  min="1"
                  placeholder="Enter custom amount"
                  value={customAmount}
                  onChange={handleCustomAmount}
                />
              </div>
            </div>

            <div className={styles.divider}></div>

            <div className={styles.fields}>
              <div className={styles.field}>
                <label htmlFor="donorName">Full Name *</label>
                <div className={styles.input}>
                  <User size={18} />
                  <input
                    id="donorName"
                    name="donorName"
                    type="text"
                    placeholder="Your full name"
                    value={form.donorName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="email">Email Address</label>
                <div className={styles.input}>
                  <Mail size={18} />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="phone">Mobile Number</label>
                <div className={styles.input}>
                  <Phone size={18} />
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+91 XXXXX XXXXX"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="utrNumber">UTR / Reference Number</label>
                <div className={styles.input}>
                  <Hash size={18} />
                  <input
                    id="utrNumber"
                    name="utrNumber"
                    type="text"
                    placeholder="From your UPI app (optional)"
                    value={utrNumber}
                    onChange={(e) => setUtrNumber(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className={styles.uploadField}>
              <label>Payment Screenshot *</label>

              {proofPreview ? (
                <div className={styles.proofPreview}>
                  <img src={proofPreview} alt="Payment screenshot preview" />
                  <button type="button" onClick={removeProof} className={styles.removeProof}>
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  className={styles.dropzone}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <UploadCloud size={26} />
                  <span>Click to upload your UPI payment screenshot</span>
                  <small>JPG, PNG or WEBP, up to 2 MB</small>
                </button>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                onChange={handleFileSelect}
                hidden
              />
            </div>

            {message && <div className={styles.message}>{message}</div>}

            <button type="submit" className={styles.submit} disabled={loading}>
              {loading ? (
                <>
                  <LoaderCircle size={20} className={styles.spinner} />
                  Submitting...
                </>
              ) : (
                <>
                  <ImageIcon size={18} />
                  Confirm Contribution of ₹
                  {Number(customAmount || amount).toLocaleString("en-IN")}
                </>
              )}
            </button>

            <p className={styles.note}>
              By continuing, you confirm that the information provided is accurate
              and that your contribution complies with applicable laws and
              eligibility requirements.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
