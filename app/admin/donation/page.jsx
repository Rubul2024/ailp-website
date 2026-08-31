"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import {
  Building2,
  User,
  CreditCard,
  QrCode,
  Save,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  IndianRupee,
  Receipt,
  Upload,
  Trash2,
  ImageIcon,
  Copy,
  Check,
} from "lucide-react";
import styles from "./Donation.module.css";

export default function AdminDonationPage() {
  const [activeTab, setActiveTab] = useState("settings");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [copiedField, setCopiedField] = useState("");
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    bankName: "",
    accountHolder: "",
    accountNumber: "",
    ifscCode: "",
    branch: "",
    upiId: "",
    qrCode: "", // Holds Base64 or Cloudinary URL
    donationMessage: "",
    donationEnabled: true,
  });

  const loadDonationSettings = useCallback(async () => {
    setLoading(true);
    setMessage({ type: "", text: "" });
    try {
      const response = await fetch("/api/admin/donation", {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      });
      const data = await response.json();

      if (response.ok && data.success && data.donation) {
        setFormData({
          bankName: data.donation.bankName || "",
          accountHolder: data.donation.accountHolder || "",
          accountNumber: data.donation.accountNumber || "",
          ifscCode: data.donation.ifscCode || "",
          branch: data.donation.branch || "",
          upiId: data.donation.upiId || "",
          qrCode: data.donation.qrCode || "",
          donationMessage: data.donation.donationMessage || "",
          donationEnabled: data.donation.donationEnabled ?? true,
        });
      }
    } catch (err) {
      setMessage({
        type: "error",
        text: "Unable to load donation details. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDonationSettings();
  }, [loadDonationSettings]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Image Upload Handler (Converts file to Base64 with size check)
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setMessage({ type: "error", text: "Please select a valid image file (PNG, JPG, WEBP)." });
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setMessage({ type: "error", text: "Image size must be less than 2MB." });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        qrCode: reader.result,
      }));
      setMessage({ type: "success", text: "QR code image selected. Click 'Save Bank Information' to apply." });
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({ ...prev, qrCode: "" }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: "", text: "" });

    try {
      const response = await fetch("/api/admin/donation", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setMessage({
          type: "success",
          text: data.message || "Donation bank details updated successfully!",
        });
        if (data.donation?.qrCode) {
          setFormData((prev) => ({ ...prev, qrCode: data.donation.qrCode }));
        }
      } else {
        setMessage({
          type: "error",
          text: data.message || "Failed to update donation settings.",
        });
      }
    } catch (err) {
      setMessage({
        type: "error",
        text: "Server error occurred while saving details.",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleCopy = (text, fieldName) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(""), 2000);
  };

  return (
    <div className={styles.container}>
      {/* Top Controls Banner */}
      <div className={styles.banner}>
        <div>
          <h2 className={styles.bannerTitle}>Donation & Payment Management</h2>
          <p className={styles.bannerSubtitle}>
            Configure party accounts, QR codes, and view verified contributions.
          </p>
        </div>

        <div className={styles.tabPillGroup}>
          <button
            type="button"
            className={`${styles.tabPill} ${activeTab === "settings" ? styles.tabActive : ""}`}
            onClick={() => setActiveTab("settings")}
          >
            <Building2 size={16} />
            <span>Bank & UPI Settings</span>
          </button>
          <button
            type="button"
            className={`${styles.tabPill} ${activeTab === "transactions" ? styles.tabActive : ""}`}
            onClick={() => setActiveTab("transactions")}
          >
            <Receipt size={16} />
            <span>Contribution Records</span>
          </button>
        </div>
      </div>

      {/* Alert Notice */}
      {message.text && (
        <div className={message.type === "success" ? styles.successAlert : styles.errorAlert}>
          {message.type === "success" ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          <span>{message.text}</span>
        </div>
      )}

      {activeTab === "settings" ? (
        <div className={styles.layoutGrid}>
          {/* Main Form Section */}
          <form className={styles.formCard} onSubmit={handleSubmit}>
            <div className={styles.formHeader}>
              <div className={styles.formHeaderText}>
                <h3>Official Bank Credentials</h3>
                <p>Publicly displayed on citizen donation portal</p>
              </div>

              {/* Donation Switch */}
              <label className={styles.switchWrapper} title="Enable/Disable Donation Acceptance">
                <span className={styles.switchLabel}>
                  {formData.donationEnabled ? "Donations Live" : "Donations Paused"}
                </span>
                <input
                  type="checkbox"
                  name="donationEnabled"
                  checked={formData.donationEnabled}
                  onChange={handleChange}
                />
                <span className={styles.slider}></span>
              </label>
            </div>

            <div className={styles.inputGrid}>
              <div className={styles.inputGroup}>
                <label>
                  Bank Name <span className={styles.req}>*</span>
                </label>
                <div className={styles.inputWrap}>
                  <Building2 size={16} className={styles.inputIcon} />
                  <input
                    type="text"
                    name="bankName"
                    placeholder="e.g., State Bank of India"
                    value={formData.bankName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label>
                  Account Holder Name <span className={styles.req}>*</span>
                </label>
                <div className={styles.inputWrap}>
                  <User size={16} className={styles.inputIcon} />
                  <input
                    type="text"
                    name="accountHolder"
                    placeholder="e.g., ALL INDIA LABOUR PARTY"
                    value={formData.accountHolder}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label>
                  Account Number <span className={styles.req}>*</span>
                </label>
                <div className={styles.inputWrap}>
                  <CreditCard size={16} className={styles.inputIcon} />
                  <input
                    type="text"
                    name="accountNumber"
                    placeholder="Enter Account Number"
                    value={formData.accountNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label>
                  IFSC Code <span className={styles.req}>*</span>
                </label>
                <div className={styles.inputWrap}>
                  <CreditCard size={16} className={styles.inputIcon} />
                  <input
                    type="text"
                    name="ifscCode"
                    placeholder="e.g., SBIN0000123"
                    value={formData.ifscCode}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label>Branch Name & City</label>
                <div className={styles.inputWrap}>
                  <Building2 size={16} className={styles.inputIcon} />
                  <input
                    type="text"
                    name="branch"
                    placeholder="e.g., Barpeta Main Branch"
                    value={formData.branch}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label>Official UPI VPA / ID</label>
                <div className={styles.inputWrap}>
                  <IndianRupee size={16} className={styles.inputIcon} />
                  <input
                    type="text"
                    name="upiId"
                    placeholder="e.g., ailp@sbi"
                    value={formData.upiId}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* UPI QR Code File Uploader */}
              <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                <label>UPI QR Code Image</label>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/png, image/jpeg, image/jpg, image/webp"
                  onChange={handleImageUpload}
                  style={{ display: "none" }}
                />

                <div className={styles.uploadArea}>
                  {formData.qrCode ? (
                    <div className={styles.uploadedPreview}>
                      <div className={styles.uploadedImgWrap}>
                        <img src={formData.qrCode} alt="Uploaded QR Code" />
                      </div>
                      <div className={styles.uploadedMeta}>
                        <strong>QR Code Ready</strong>
                        <span>Image selected for public payment</span>
                        <div className={styles.uploadedBtnGroup}>
                          <button
                            type="button"
                            className={styles.changeBtn}
                            onClick={() => fileInputRef.current?.click()}
                          >
                            <Upload size={14} /> Change Image
                          </button>
                          <button
                            type="button"
                            className={styles.removeBtn}
                            onClick={handleRemoveImage}
                          >
                            <Trash2 size={14} /> Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      className={styles.dropzone}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <div className={styles.uploadIconCircle}>
                        <Upload size={22} />
                      </div>
                      <div className={styles.dropzoneText}>
                        <strong>Click to upload UPI QR Code image</strong>
                        <span>PNG, JPG, or WEBP up to 2MB</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                <label>Donation Note / Statutory Tax Notice</label>
                <div className={styles.inputWrap}>
                  <textarea
                    rows={3}
                    name="donationMessage"
                    placeholder="e.g., All contributions to All India Labour Party are strictly used for party activities and welfare campaigns."
                    value={formData.donationMessage}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className={styles.formFooter}>
              <button
                type="button"
                className={styles.resetBtn}
                onClick={loadDonationSettings}
                disabled={loading || saving}
              >
                <RefreshCw size={15} className={loading ? styles.spin : ""} />
                <span>Reset</span>
              </button>

              <button
                type="submit"
                className={styles.saveBtn}
                disabled={saving || loading}
              >
                <Save size={16} />
                <span>{saving ? "Saving Settings..." : "Save Bank Information"}</span>
              </button>
            </div>
          </form>

          {/* Live Card Preview Box */}
          <div className={styles.previewColumn}>
            {/* Virtual Banking Card */}
            <div className={styles.bankCardPreview}>
              <div className={styles.bankCardHeader}>
                <div>
                  <span className={styles.cardType}>OFFICIAL DONATION ACCOUNT</span>
                  <h4 className={styles.cardBankName}>
                    {formData.bankName || "Your Bank Name"}
                  </h4>
                </div>
                <IndianRupee size={28} className={styles.cardChip} />
              </div>

              <div className={styles.cardMid}>
                <label>ACCOUNT NUMBER</label>
                <p className={styles.cardNumber}>
                  {formData.accountNumber
                    ? formData.accountNumber.replace(/(\d{4})/g, "$1 ").trim()
                    : "•••• •••• •••• ••••"}
                </p>
              </div>

              <div className={styles.bankCardFooter}>
                <div>
                  <label>HOLDER NAME</label>
                  <p>{formData.accountHolder || "ALL INDIA LABOUR PARTY"}</p>
                </div>
                <div>
                  <label>IFSC CODE</label>
                  <p>{formData.ifscCode || "SBIN000XXXX"}</p>
                </div>
              </div>
            </div>

            {/* Quick UPI Details & QR Preview */}
            <div className={styles.qrPreviewCard}>
              <div className={styles.qrHeader}>
                <h4>QR Code & Direct UPI</h4>
                <span className={styles.liveBadge}>Public Display</span>
              </div>

              <div className={styles.qrBody}>
                {formData.qrCode ? (
                  <div className={styles.qrImageWrap}>
                    <img
                      src={formData.qrCode}
                      alt="UPI QR Code"
                    />
                  </div>
                ) : (
                  <div className={styles.qrPlaceholder}>
                    <QrCode size={52} />
                    <span>Upload a QR code to view live citizen preview</span>
                  </div>
                )}

                <div className={styles.upiCopyBox}>
                  <div>
                    <label>UPI VPA</label>
                    <p>{formData.upiId || "Not Configured"}</p>
                  </div>
                  {formData.upiId && (
                    <button
                      type="button"
                      className={styles.copyBtn}
                      onClick={() => handleCopy(formData.upiId, "upi")}
                      title="Copy UPI ID"
                    >
                      {copiedField === "upi" ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Contributions Record Tab */
        <div className={styles.transactionsCard}>
          <div className={styles.tableTop}>
            <div>
              <h3>Recent Contributions</h3>
              <p>Citizens who supported All India Labour Party</p>
            </div>
          </div>

          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Donor Name</th>
                  <th>Amount (INR)</th>
                  <th>Transaction ID / Ref</th>
                  <th>Payment Mode</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className={styles.donorCell}>
                      <strong>Sample Contributor</strong>
                      <span>donor@example.com</span>
                    </div>
                  </td>
                  <td>
                    <span className={styles.amountText}>₹200.00</span>
                  </td>
                  <td>
                    <span className={styles.codeText}>TXN_2026_883921</span>
                  </td>
                  <td>UPI / QR Code</td>
                  <td>31 Aug 2026</td>
                  <td>
                    <span className={styles.verifiedBadge}>Verified</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}