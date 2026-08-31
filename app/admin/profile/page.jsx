"use client";

import { useEffect, useState, useCallback } from "react";
import {
  User,
  Mail,
  Phone,
  ShieldCheck,
  KeyRound,
  Lock,
  Eye,
  EyeOff,
  Save,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Activity,
  Calendar,
} from "lucide-react";
import styles from "./Profile.module.css";

export default function AdminProfilePage() {
  const [activeTab, setActiveTab] = useState("info"); // "info" | "security"
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // Admin Data State
  const [admin, setAdmin] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    role: "",
  });

  // Password Change State
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const loadAdminProfile = useCallback(async () => {
    setLoading(true);
    setMessage({ type: "", text: "" });
    try {
      const res = await fetch("/api/admin/profile", {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      });
      const data = await res.json();

      if (res.ok && data.success && data.admin) {
        setAdmin(data.admin);
        setFormData({
          name: data.admin.name || "",
          email: data.admin.email || "",
          mobile: data.admin.mobile || "",
          role: data.admin.role || "super-admin",
        });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Unable to load administrator profile." });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAdminProfile();
  }, [loadAdminProfile]);

  const handleInfoChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit Profile Information Update
  const handleSaveInfo = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: "", text: "" });

    try {
      const res = await fetch("/api/admin/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          action: "UPDATE_INFO",
          name: formData.name,
          mobile: formData.mobile,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setMessage({ type: "success", text: data.message });
        setAdmin((prev) => ({ ...prev, ...data.admin }));
      } else {
        setMessage({ type: "error", text: data.message || "Failed to update profile." });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Server error occurred while saving." });
    } finally {
      setSaving(false);
    }
  };

  // Submit Password Change
  const handleSavePassword = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: "error", text: "New password and confirmation do not match." });
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setMessage({ type: "error", text: "Password must be at least 6 characters." });
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/admin/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          action: "CHANGE_PASSWORD",
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setMessage({ type: "success", text: data.message });
        setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
      } else {
        setMessage({ type: "error", text: data.message || "Failed to change password." });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Server error occurred while updating password." });
    } finally {
      setSaving(false);
    }
  };

  const roleLabel = admin?.role === "super-admin" ? "Super Administrator" : "Administrator";

  return (
    <div className={styles.container}>
      {/* Top Controls Banner */}
      <div className={styles.banner}>
        <div>
          <h2 className={styles.bannerTitle}>Administrator Account Settings</h2>
          <p className={styles.bannerSubtitle}>
            Manage your personal profile, contact credentials, and portal security.
          </p>
        </div>

        <div className={styles.tabPillGroup}>
          <button
            type="button"
            className={`${styles.tabPill} ${activeTab === "info" ? styles.tabActive : ""}`}
            onClick={() => {
              setActiveTab("info");
              setMessage({ type: "", text: "" });
            }}
          >
            <User size={15} />
            <span>Profile Information</span>
          </button>
          <button
            type="button"
            className={`${styles.tabPill} ${activeTab === "security" ? styles.tabActive : ""}`}
            onClick={() => {
              setActiveTab("security");
              setMessage({ type: "", text: "" });
            }}
          >
            <KeyRound size={15} />
            <span>Security & Password</span>
          </button>
        </div>
      </div>

      {/* Alert Notices */}
      {message.text && (
        <div className={message.type === "success" ? styles.successAlert : styles.errorAlert}>
          {message.type === "success" ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          <span>{message.text}</span>
        </div>
      )}

      {/* Main 2-Column Layout */}
      <div className={styles.layoutGrid}>
        {/* Left Column: Visual Executive Admin Badge Card */}
        <div className={styles.idCard}>
          <div className={styles.idCardHeader}>
            <div className={styles.avatarLarge}>
              {admin?.name ? admin.name.charAt(0).toUpperCase() : "A"}
            </div>
            <h3 className={styles.idName}>{admin?.name || "AILP Administrator"}</h3>
            <span className={styles.idEmail}>{admin?.email || "allindialabourpartyailp@gmail.com"}</span>

            <div className={styles.roleBadge}>
              <ShieldCheck size={14} />
              <span>{roleLabel}</span>
            </div>
          </div>

          <div className={styles.idCardDetails}>
            <div className={styles.idRow}>
              <div className={styles.idRowLabel}>
                <Activity size={14} />
                <span>Account Status</span>
              </div>
              <span className={styles.statusActive}>
                <span className={styles.statusDot} /> Active
              </span>
            </div>

            <div className={styles.idRow}>
              <div className={styles.idRowLabel}>
                <Phone size={14} />
                <span>Registered Mobile</span>
              </div>
              <strong className={styles.idRowValue}>{admin?.mobile || "Not specified"}</strong>
            </div>

            <div className={styles.idRow}>
              <div className={styles.idRowLabel}>
                <Calendar size={14} />
                <span>Created Date</span>
              </div>
              <strong className={styles.idRowValue}>
                {admin?.createdAt
                  ? new Date(admin.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })
                  : "August 2026"}
              </strong>
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Form Section */}
        <div className={styles.formContainer}>
          {activeTab === "info" ? (
            /* Tab 1: Profile Information */
            <form className={styles.cardBox} onSubmit={handleSaveInfo}>
              <div className={styles.cardBoxHeader}>
                <div>
                  <h3>Personal Information</h3>
                  <p>Update administrator name and contact details</p>
                </div>
              </div>

              <div className={styles.inputGrid}>
                <div className={styles.inputGroup}>
                  <label>
                    Full Name <span className={styles.req}>*</span>
                  </label>
                  <div className={styles.inputWrap}>
                    <User size={16} className={styles.inputIcon} />
                    <input
                      type="text"
                      name="name"
                      placeholder="e.g. AILP Administrator"
                      value={formData.name}
                      onChange={handleInfoChange}
                      required
                    />
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label>Email Address (Immutable)</label>
                  <div className={styles.inputWrap}>
                    <Mail size={16} className={styles.inputIcon} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      disabled
                      className={styles.disabledInput}
                    />
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label>Contact Mobile Number</label>
                  <div className={styles.inputWrap}>
                    <Phone size={16} className={styles.inputIcon} />
                    <input
                      type="tel"
                      name="mobile"
                      placeholder="e.g. +91 9967647612"
                      value={formData.mobile}
                      onChange={handleInfoChange}
                    />
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label>Portal Role</label>
                  <div className={styles.inputWrap}>
                    <ShieldCheck size={16} className={styles.inputIcon} />
                    <input
                      type="text"
                      value={roleLabel}
                      disabled
                      className={styles.disabledInput}
                    />
                  </div>
                </div>
              </div>

              <div className={styles.formFooter}>
                <button
                  type="button"
                  className={styles.resetBtn}
                  onClick={loadAdminProfile}
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
                  <span>{saving ? "Updating..." : "Save Profile Details"}</span>
                </button>
              </div>
            </form>
          ) : (
            /* Tab 2: Change Password */
            <form className={styles.cardBox} onSubmit={handleSavePassword}>
              <div className={styles.cardBoxHeader}>
                <div>
                  <h3>Change Password</h3>
                  <p>Ensure your account uses a strong password</p>
                </div>
              </div>

              <div className={styles.passwordStack}>
                <div className={styles.inputGroup}>
                  <label>
                    Current Password <span className={styles.req}>*</span>
                  </label>
                  <div className={styles.inputWrap}>
                    <Lock size={16} className={styles.inputIcon} />
                    <input
                      type={showCurrent ? "text" : "password"}
                      name="currentPassword"
                      placeholder="Enter current password"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      required
                    />
                    <button
                      type="button"
                      className={styles.eyeBtn}
                      onClick={() => setShowCurrent(!showCurrent)}
                    >
                      {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label>
                    New Password <span className={styles.req}>*</span>
                  </label>
                  <div className={styles.inputWrap}>
                    <KeyRound size={16} className={styles.inputIcon} />
                    <input
                      type={showNew ? "text" : "password"}
                      name="newPassword"
                      placeholder="Enter new password (min. 6 chars)"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      required
                    />
                    <button
                      type="button"
                      className={styles.eyeBtn}
                      onClick={() => setShowNew(!showNew)}
                    >
                      {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label>
                    Confirm New Password <span className={styles.req}>*</span>
                  </label>
                  <div className={styles.inputWrap}>
                    <Lock size={16} className={styles.inputIcon} />
                    <input
                      type={showNew ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="Re-enter new password"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className={styles.formFooter}>
                <button
                  type="submit"
                  className={styles.saveBtn}
                  disabled={saving}
                >
                  <KeyRound size={16} />
                  <span>{saving ? "Updating Password..." : "Update Password"}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}