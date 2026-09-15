"use client";

import { useEffect, useRef, useState } from "react";
import {
  HeartHandshake,
  ShieldCheck,
  QrCode,
  Hash,
  UploadCloud,
  X,
  CheckCircle2,
  TrendingUp,
  Receipt,
  Info,
  ArrowRight,
  Lock,
  Copy,
  Check,
  Clock,
  XCircle,
} from "lucide-react";
import styles from "./Donation.module.css";

const PRESET_AMOUNTS = [100, 500, 1000, 2500, 5000, 10000];

const STATUS_META = {
  pending: { label: "Pending Review", icon: Clock, className: "statusPending" },
  verified: { label: "Verified", icon: CheckCircle2, className: "statusVerified" },
  rejected: { label: "Rejected", icon: XCircle, className: "statusRejected" },
};

export default function MemberDonationPage() {
  const [member, setMember] = useState(null);
  const [settings, setSettings] = useState(null);
  const [history, setHistory] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  const [amount, setAmount] = useState("500");
  const [customAmount, setCustomAmount] = useState("");
  const [utrNumber, setUtrNumber] = useState("");
  const [message, setMessage] = useState("");
  const [proofFile, setProofFile] = useState(null);
  const [proofPreview, setProofPreview] = useState("");
  const [formError, setFormError] = useState("");
  const [successNotice, setSuccessNotice] = useState(false);
  const fileInputRef = useRef(null);

  const fetchMember = async () => {
    try {
      let res = await fetch("/api/member/me", { credentials: "include", cache: "no-store" });
      if (!res.ok) {
        res = await fetch("/api/member/profile", { credentials: "include", cache: "no-store" });
      }
      const data = await res.json();
      if (data.success && (data.member || data.data)) {
        setMember(data.member || data.data);
      }
    } catch {
      // no-op — donor fields simply stay blank if the profile can't be loaded
    }
  };

  const fetchSettings = async () => {
    try {
      const res = await fetch(`/api/donation/settings?t=${Date.now()}`, { cache: "no-store" });
      const data = await res.json();
      if (data.success && data.settings) setSettings(data.settings);
    } catch {
      // no-op
    }
  };

  const fetchHistory = async () => {
    try {
      const res = await fetch("/api/member/donations", { credentials: "include", cache: "no-store" });
      const data = await res.json();
      if (data.success) setHistory(data.donations || []);
    } catch {
      // no-op
    }
  };

  useEffect(() => {
    fetchMember();
    fetchSettings();
    fetchHistory();
  }, []);

  const handleAmountSelect = (val) => {
    setAmount(String(val));
    setCustomAmount("");
  };

  const handleCustomAmountChange = (e) => {
    const val = e.target.value.replace(/[^0-9]/g, "");
    setCustomAmount(val);
    setAmount(val);
  };

  const handleCopy = (text) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(file.type)) {
      setFormError("Only JPG, PNG or WEBP screenshots are allowed.");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setFormError("Screenshot must be smaller than 2 MB.");
      return;
    }
    setFormError("");
    setProofFile(file);
    setProofPreview(URL.createObjectURL(file));
  };

  const removeProof = () => {
    setProofFile(null);
    setProofPreview("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const currentAmount = parseFloat(amount || customAmount || "0");

  const handleSubmitDonation = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!currentAmount || currentAmount < 10) {
      setFormError("Please enter a valid donation amount (minimum ₹10).");
      return;
    }
    if (!proofFile) {
      setFormError("Please upload a screenshot of your UPI payment.");
      return;
    }

    setSubmitting(true);
    try {
      const uploadData = new FormData();
      uploadData.append("file", proofFile);
      uploadData.append("folder", "AILP/donations/proofs");

      const uploadRes = await fetch("/api/upload", { method: "POST", body: uploadData });
      const uploadJson = await uploadRes.json();
      if (!uploadRes.ok || !uploadJson.success) {
        throw new Error(uploadJson.message || "Unable to upload payment screenshot.");
      }

      const res = await fetch("/api/donation/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          donorName: member?.fullName || "Member",
          email: member?.email || "",
          phone: member?.mobile || "",
          amount: currentAmount,
          utrNumber,
          message,
          proofImage: uploadJson.image,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Unable to submit your donation.");
      }

      setSuccessNotice(true);
      fetchHistory();
    } catch (error) {
      setFormError(error.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.pageContainer}>
      {/* Top Header */}
      <div className={styles.headerBar}>
        <div>
          <span className={styles.categoryBadge}>
            <HeartHandshake size={13} /> Official Party Treasury Fund
          </span>
          <h1 className={styles.pageHeading}>Support All India Labour Party</h1>
          <p className={styles.pageSubheading}>
            Your contributions empower our fight for workers&apos; rights, wage equality, youth
            employment, and grassroots democracy across India.
          </p>
        </div>

        <div className={styles.headerSecuredBadge}>
          <ShieldCheck size={16} />
          <span>Manually Verified by Our Team</span>
        </div>
      </div>

      {/* Main 2-Column Donation Grid */}
      <div className={styles.donationGrid}>
        {/* Left: Donation Form Card */}
        <div className={styles.formCard}>
          <div className={styles.formCardHeader}>
            <div className={styles.headerIcon}>
              <HeartHandshake size={24} />
            </div>
            <div>
              <h2>Confirm Your Contribution</h2>
              <p>Pay via the UPI QR alongside, then confirm it here with your screenshot.</p>
            </div>
          </div>

          {successNotice ? (
            <div className={styles.successState}>
              <div className={styles.successIconWrap}>
                <CheckCircle2 size={42} />
              </div>
              <h3>Thank You for Your Contribution!</h3>
              <p>
                Your contribution of <strong>₹{currentAmount.toLocaleString("en-IN")}</strong> has
                been submitted and is pending verification by our team. You can track its status
                below once it&apos;s reviewed.
              </p>
              <button
                type="button"
                className={styles.resetDonationBtn}
                onClick={() => {
                  setSuccessNotice(false);
                  setUtrNumber("");
                  setMessage("");
                  removeProof();
                }}
              >
                Make Another Contribution
              </button>
            </div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmitDonation}>
              {/* Preset Amounts */}
              <div className={styles.inputGroup}>
                <label className={styles.fieldLabel}>Select Contribution Amount (INR)</label>
                <div className={styles.presetGrid}>
                  {PRESET_AMOUNTS.map((val) => (
                    <button
                      key={val}
                      type="button"
                      className={`${styles.presetChip} ${
                        amount === String(val) && !customAmount ? styles.activeChip : ""
                      }`}
                      onClick={() => handleAmountSelect(val)}
                    >
                      ₹{val.toLocaleString("en-IN")}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Amount Field */}
              <div className={styles.inputGroup}>
                <label className={styles.fieldLabel}>Or Enter Custom Amount</label>
                <div className={styles.amountInputWrap}>
                  <span className={styles.currencySymbol}>₹</span>
                  <input
                    type="text"
                    placeholder="Enter other amount (e.g. 1500)"
                    value={customAmount}
                    onChange={handleCustomAmountChange}
                    className={styles.amountInput}
                  />
                </div>
              </div>

              {/* UTR Number */}
              <div className={styles.inputGroup}>
                <label className={styles.fieldLabel}>
                  UTR / Reference Number <span>(from your UPI app, optional)</span>
                </label>
                <div className={styles.amountInputWrap}>
                  <Hash size={16} className={styles.inputLeadIcon} />
                  <input
                    type="text"
                    placeholder="e.g. 402913827461"
                    value={utrNumber}
                    onChange={(e) => setUtrNumber(e.target.value)}
                    className={styles.textInputWithIcon}
                  />
                </div>
              </div>

              {/* Payment Screenshot */}
              <div className={styles.inputGroup}>
                <label className={styles.fieldLabel}>Payment Screenshot *</label>
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
                    <UploadCloud size={24} />
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

              {/* Optional Note */}
              <div className={styles.inputGroup}>
                <label className={styles.fieldLabel}>Message (Optional)</label>
                <textarea
                  rows={3}
                  placeholder="Share a note of solidarity or designate a regional initiative..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={styles.textareaInput}
                />
              </div>

              {formError && <div className={styles.formError}>{formError}</div>}

              {/* Submit CTA */}
              <button
                type="submit"
                className={styles.donateSubmitBtn}
                disabled={submitting || currentAmount <= 0}
              >
                <Lock size={16} />
                <span>
                  {submitting
                    ? "Submitting..."
                    : `Confirm Contribution of ₹${currentAmount.toLocaleString("en-IN")}`}
                </span>
                <ArrowRight size={16} />
              </button>

              <div className={styles.guaranteeRow}>
                <Info size={13} />
                <span>Your contribution will appear in your history below once reviewed by our team.</span>
              </div>
            </form>
          )}
        </div>

        {/* Right: Summary, Pay-via-QR & Party Credentials */}
        <div className={styles.sideInfoColumn}>
          {/* Member Fund Record */}
          <div className={styles.infoCard}>
            <div className={styles.infoCardHeader}>
              <TrendingUp size={18} className={styles.blueIcon} />
              <h3>Your Contribution Record</h3>
            </div>

            <div className={styles.recordStatsList}>
              <div className={styles.recordStatItem}>
                <span className={styles.recordLabel}>Total Verified Contribution</span>
                <strong className={styles.recordTotalVal}>
                  ₹{Number(member?.totalDonation || 0).toLocaleString("en-IN")}
                </strong>
              </div>

              <div className={styles.recordStatItem}>
                <span className={styles.recordLabel}>Total Contributions Recorded</span>
                <span>{member?.donationCount || 0} Transactions</span>
              </div>

              <div className={styles.recordStatItem}>
                <span className={styles.recordLabel}>Membership ID</span>
                <span className={styles.monoToken}>{member?.membershipId || "—"}</span>
              </div>
            </div>
          </div>

          {/* Pay via UPI QR */}
          <div className={styles.infoCard}>
            <div className={styles.infoCardHeader}>
              <QrCode size={18} className={styles.blueIcon} />
              <h3>Pay via UPI</h3>
            </div>
            {settings?.qrCode && (
              <img src={settings.qrCode} alt="AILP UPI QR Code" className={styles.qrThumb} />
            )}
            <div className={styles.upiCopyRow}>
              <span className={styles.monoToken}>{settings?.upiId || "—"}</span>
              <button type="button" className={styles.copyIconBtn} onClick={() => handleCopy(settings?.upiId)}>
                {copied ? <Check size={14} /> : <Copy size={14} />}
              </button>
            </div>
          </div>

          {/* Donation History */}
          <div className={styles.infoCard}>
            <div className={styles.infoCardHeader}>
              <Receipt size={18} className={styles.blueIcon} />
              <h3>Recent Contributions</h3>
            </div>
            {history.length === 0 ? (
              <p className={styles.emptyHistory}>No contributions submitted yet.</p>
            ) : (
              <div className={styles.historyList}>
                {history.slice(0, 5).map((item) => {
                  const meta = STATUS_META[item.status] || STATUS_META.pending;
                  const StatusIcon = meta.icon;
                  return (
                    <div key={item._id} className={styles.historyItem}>
                      <div>
                        <strong>₹{Number(item.amount).toLocaleString("en-IN")}</strong>
                        <span className={styles.historyDate}>
                          {new Date(item.createdAt).toLocaleDateString("en-IN")}
                        </span>
                      </div>
                      <span className={`${styles.statusBadge} ${styles[meta.className]}`}>
                        <StatusIcon size={12} /> {meta.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Official Central Office Credentials */}
          <div className={styles.centralAddressCard}>
            <div className={styles.officialEmblemBadge}>ALL INDIA LABOUR PARTY</div>
            <h4>Official Central Treasury</h4>
            <p className={styles.addressLine}>
              <strong>Registered Head Office:</strong> UTTAR KUMROKHALI, Narendrapur, South 24
              Parganas, Kolkata, West Bengal - 700103
            </p>
            <p className={styles.addressLine}>
              allindialabourpartyailp@gmail.com · +91-7896043734
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
