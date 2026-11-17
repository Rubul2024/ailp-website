"use client";

/* ==========================================================
   Member Registration
========================================================== */

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  ArrowRight,
  Check,
  CheckCircle2,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import AuthShell from "@/components/member/AuthShell";
import styles from "@/components/member/MemberAuth.module.css";

const STEPS = [
  { title: "Create your account", text: "Takes less than a minute — just your name, mobile and email." },
  { title: "Complete your profile", text: "Add your photo and a few details for your ID card." },
  { title: "Get your digital ID card", text: "Download your official, QR-verified membership card." },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function passwordStrength(pw) {
  if (!pw) return { level: 0, label: "" };
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) score++;
  if (/\d/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw) || pw.length >= 12) score++;
  if (pw.length < 8) score = Math.min(score, 1);
  return { level: Math.max(score, 1), label: ["", "Weak", "Fair", "Good", "Strong"][Math.max(score, 1)] };
}

function validate(form) {
  const e = {};
  const name = form.fullName.trim();
  const mobile = form.mobile.replace(/\D/g, "");

  if (name.length < 2) e.fullName = "Enter your full name.";
  else if (!/^[\p{L} .'-]+$/u.test(name)) e.fullName = "Use letters only in your name.";

  if (!/^[6-9]\d{9}$/.test(mobile)) e.mobile = "Enter a valid 10-digit Indian mobile number.";

  if (!EMAIL_RE.test(form.email.trim())) e.email = "Enter a valid email address.";

  if (form.password.length < 8) e.password = "Use at least 8 characters.";
  else if (!/[A-Za-z]/.test(form.password) || !/\d/.test(form.password)) e.password = "Include at least one letter and one number.";

  if (!form.confirmPassword) e.confirmPassword = "Re-enter your password.";
  else if (form.confirmPassword !== form.password) e.confirmPassword = "Passwords don't match.";

  if (!form.acceptTerms) e.acceptTerms = "Please accept the terms to continue.";

  return e;
}

const FIELD_ORDER = ["fullName", "mobile", "email", "password", "confirmPassword", "acceptTerms"];

export default function MemberRegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    fullName: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
    website: "", // bot trap
  });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const strength = passwordStrength(form.password);
  const busy = loading || done;

  function update(e) {
    const { name, value, type, checked } = e.target;
    let next = type === "checkbox" ? checked : value;
    if (name === "mobile") next = value.replace(/\D/g, "").slice(0, 10);
    setForm((prev) => ({ ...prev, [name]: next }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    if (formError) setFormError("");
  }

  // Validate a single field when the member leaves it (only once it has content).
  function blurCheck(e) {
    const { name } = e.target;
    if (!form[name]) return;
    const found = validate(form);
    if (found[name]) setErrors((prev) => ({ ...prev, [name]: found[name] }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (busy) return;

    const found = validate(form);
    setErrors(found);
    setFormError("");
    const first = FIELD_ORDER.find((k) => found[k]);
    if (first) {
      document.getElementById(first)?.focus();
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          fullName: form.fullName.trim().replace(/\s+/g, " "),
          mobile: form.mobile,
          email: form.email.trim(),
          password: form.password,
          confirmPassword: form.confirmPassword,
          acceptTerms: form.acceptTerms,
          website: form.website,
        }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.success) {
        if (data.field) {
          setErrors((prev) => ({ ...prev, [data.field]: data.message }));
          document.getElementById(data.field)?.focus();
        } else {
          setFormError(data.message || "We couldn't create your account. Please try again.");
        }
        setLoading(false);
        return;
      }

      setDone(true);
      router.replace("/member/dashboard");
      router.refresh();
    } catch {
      setFormError("Can't reach the server. Check your internet connection and try again.");
      setLoading(false);
    }
  }

  const fieldProps = (name) => ({
    id: name,
    name,
    value: form[name],
    onChange: update,
    onBlur: blurCheck,
    disabled: busy,
    "aria-invalid": Boolean(errors[name]),
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
  });

  const errorText = (name) =>
    errors[name] ? (
      <p id={`${name}-error`} className={styles.fieldError}>
        {errors[name]}
      </p>
    ) : null;

  const controlClass = (name) => `${styles.control} ${errors[name] ? styles.controlError : ""}`;

  return (
    <AuthShell
      kicker="Become a member"
      brandTitle="Join the movement for workers' rights and social justice."
      items={STEPS}
      numbered
      title="Create your account"
      subtitle="Join the All India Labour Party. It only takes a minute."
      wide
    >
      <form onSubmit={handleSubmit} noValidate className={styles.form}>
        {formError && (
          <div className={styles.alert} role="alert">
            <AlertCircle size={18} aria-hidden="true" />
            <span>{formError}</span>
          </div>
        )}

        {done && (
          <div className={styles.successBox} role="status">
            <CheckCircle2 size={18} aria-hidden="true" />
            <span>Account created. Opening your dashboard…</span>
          </div>
        )}

        {/* Full name */}
        <div className={styles.field}>
          <label htmlFor="fullName" className={styles.label}>
            Full name
          </label>
          <div className={controlClass("fullName")}>
            <UserRound size={18} className={styles.icon} aria-hidden="true" />
            <input {...fieldProps("fullName")} type="text" autoComplete="name" placeholder="As on your ID card" maxLength={100} />
          </div>
          {errorText("fullName")}
        </div>

        {/* Mobile */}
        <div className={styles.field}>
          <label htmlFor="mobile" className={styles.label}>
            Mobile number
          </label>
          <div className={controlClass("mobile")}>
            <span className={styles.prefix} aria-hidden="true">
              +91
            </span>
            <input
              {...fieldProps("mobile")}
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              placeholder="98765 43210"
              maxLength={10}
            />
          </div>
          {errorText("mobile") || <p className={styles.hint}>You can also sign in with this number.</p>}
        </div>

        {/* Email */}
        <div className={styles.field}>
          <label htmlFor="email" className={styles.label}>
            Email address
          </label>
          <div className={controlClass("email")}>
            <Mail size={18} className={styles.icon} aria-hidden="true" />
            <input
              {...fieldProps("email")}
              type="email"
              inputMode="email"
              autoComplete="email"
              autoCapitalize="none"
              spellCheck={false}
              placeholder="you@example.com"
              maxLength={120}
            />
          </div>
          {errorText("email")}
        </div>

        {/* Password */}
        <div className={styles.field}>
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <div className={controlClass("password")}>
            <Lock size={18} className={styles.icon} aria-hidden="true" />
            <input
              {...fieldProps("password")}
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="At least 8 characters"
              maxLength={128}
            />
            <button
              type="button"
              className={styles.reveal}
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Hide passwords" : "Show passwords"}
              aria-pressed={showPassword}
              disabled={busy}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errorText("password") ||
            (form.password ? (
              <div className={styles.strength} data-level={strength.level} aria-live="polite">
                <span className={styles.strengthBars} aria-hidden="true">
                  <span />
                  <span />
                  <span />
                  <span />
                </span>
                <span className={styles.strengthLabel}>{strength.label}</span>
              </div>
            ) : (
              <p className={styles.hint}>Use 8+ characters with a mix of letters and numbers.</p>
            ))}
        </div>

        {/* Confirm password */}
        <div className={styles.field}>
          <label htmlFor="confirmPassword" className={styles.label}>
            Confirm password
          </label>
          <div className={controlClass("confirmPassword")}>
            <Lock size={18} className={styles.icon} aria-hidden="true" />
            <input
              {...fieldProps("confirmPassword")}
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Re-enter your password"
              maxLength={128}
            />
          </div>
          {errorText("confirmPassword") ||
            (form.confirmPassword && form.confirmPassword === form.password && (
              <p className={styles.match}>
                <Check size={14} aria-hidden="true" /> Passwords match
              </p>
            ))}
        </div>

        {/* Bot trap — humans never see or fill this */}
        <div className={styles.trap} aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={update} />
        </div>

        {/* Terms */}
        <div className={`${styles.field} ${errors.acceptTerms ? styles.termsError : ""}`}>
          <label className={styles.terms}>
            <input
              id="acceptTerms"
              name="acceptTerms"
              type="checkbox"
              checked={form.acceptTerms}
              onChange={update}
              disabled={busy}
              aria-invalid={Boolean(errors.acceptTerms)}
              aria-describedby={errors.acceptTerms ? "acceptTerms-error" : undefined}
            />
            <span>
              I agree to the{" "}
              <Link href="/terms" target="_blank">
                Terms &amp; Conditions
              </Link>{" "}
              and{" "}
              <Link href="/privacy-policy" target="_blank">
                Privacy Policy
              </Link>
              .
            </span>
          </label>
          {errorText("acceptTerms")}
        </div>

        <button type="submit" className={styles.submit} disabled={busy}>
          {busy ? (
            <>
              <Loader2 size={18} className={styles.spin} aria-hidden="true" />
              {done ? "Opening your dashboard…" : "Creating your account…"}
            </>
          ) : (
            <>
              Create account <ArrowRight size={18} aria-hidden="true" />
            </>
          )}
        </button>
      </form>

      <div className={styles.divider}>
        <span>Already a member?</span>
      </div>

      <Link href="/member/login" className={styles.secondary}>
        Sign in
      </Link>

      <p className={styles.secure}>
        <ShieldCheck size={15} aria-hidden="true" />
        Protected with encrypted, secure sessions
      </p>
    </AuthShell>
  );
}
