"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  CreditCard,
  LayoutDashboard,
  HeartHandshake,
  ArrowRight,
  AlertCircle,
} from "lucide-react";
import styles from "./Login.module.css";

export default function MemberLoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    identifier: "workwithrubul23@gmail.com",
    password: "",
    rememberMe: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.identifier || !formData.password) {
      setError("Please enter your registered email/phone and password.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email: formData.identifier,
          password: formData.password,
          rememberMe: formData.rememberMe,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Invalid credentials. Please verify and try again.");
      }

      router.push("/member/dashboard");
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.loginContainer}>
        {/* ================= LEFT BRAND HERO PANEL ================= */}
        <div className={styles.leftBrandPanel}>
          <div className={styles.brandHeader}>
            <span className={styles.portalPill}>
              <span className={styles.pulseDot} />
              AILP Member Portal
            </span>
          </div>

          <div className={styles.heroTextGroup}>
            <h1 className={styles.welcomeTitle}>
              Welcome <span className={styles.saffronHighlight}>Back.</span>
            </h1>
            <p className={styles.welcomeDesc}>
              Access your member dashboard, manage your membership, download your digital ID card, and stay connected with the All India Labour Party.
            </p>
          </div>

          {/* Feature Highlights Grid */}
          <div className={styles.featureGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <ShieldCheck size={18} />
              </div>
              <div className={styles.featureContent}>
                <h4>Secure Member Login</h4>
                <p>Protected with authorized party security protocol.</p>
              </div>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <CreditCard size={18} />
              </div>
              <div className={styles.featureContent}>
                <h4>Digital Membership Card</h4>
                <p>Instant access to certified digital PVC credentials.</p>
              </div>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <LayoutDashboard size={18} />
              </div>
              <div className={styles.featureContent}>
                <h4>Member Dashboard</h4>
                <p>Manage profile records and constituency details.</p>
              </div>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <HeartHandshake size={18} />
              </div>
              <div className={styles.featureContent}>
                <h4>Support the Movement</h4>
                <p>Track party fund contributions with 80G benefits.</p>
              </div>
            </div>
          </div>

          <div className={styles.partyMottoFooter}>
            <Link href="/about" className={styles.mottoLink}>
              <span>Together for Employment, Equality & Social Justice.</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* ================= RIGHT FORM PANEL ================= */}
        <div className={styles.rightFormPanel}>
          <div className={styles.formHeader}>
            <span className={styles.formCategoryBadge}>Member Login</span>
            <h2 className={styles.formTitle}>
              Sign in to your <span className={styles.blueHighlight}>AILP account</span>
            </h2>
            <p className={styles.formSubtitle}>
              Enter your registered email address or mobile number and password to continue.
            </p>
          </div>

          {error && (
            <div className={styles.errorMessage}>
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className={styles.formBody}>
            {/* Identifier Input */}
            <div className={styles.inputGroup}>
              <label htmlFor="identifier" className={styles.inputLabel}>
                Registered Email or Mobile Number
              </label>
              <div className={styles.inputWrapper}>
                <Mail size={18} className={styles.fieldIcon} />
                <input
                  id="identifier"
                  type="text"
                  name="identifier"
                  placeholder="name@domain.com / 10-digit mobile"
                  value={formData.identifier}
                  onChange={handleChange}
                  required
                  className={styles.fieldInput}
                />
              </div>
            </div>

            {/* Password Input */}
            <div className={styles.inputGroup}>
              <label htmlFor="password" className={styles.inputLabel}>
                Password
              </label>
              <div className={styles.inputWrapper}>
                <Lock size={18} className={styles.fieldIcon} />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your account password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className={styles.fieldInput}
                />
                <button
                  type="button"
                  className={styles.eyeToggleBtn}
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Options */}
            <div className={styles.optionsRow}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className={styles.checkboxInput}
                />
                <span>Remember Me</span>
              </label>

              <Link href="/member/forgot-password" className={styles.forgotLink}>
                Forgot Password?
              </Link>
            </div>

            {/* Submit Login CTA */}
            <button
              type="submit"
              disabled={loading}
              className={styles.submitLoginBtn}
            >
              <span>{loading ? "Authenticating..." : "Login"}</span>
              <ArrowRight size={16} />
            </button>
          </form>

          {/* Registration Redirect */}
          <div className={styles.registerRedirectRow}>
            <span>Don&apos;t have an account?</span>
            <Link href="/member/register" className={styles.registerLink}>
              Register
            </Link>
          </div>

          <div className={styles.securitySealText}>
            <ShieldCheck size={14} />
            <span>Your login information is securely encrypted & protected.</span>
          </div>
        </div>
      </div>
    </div>
  );
}