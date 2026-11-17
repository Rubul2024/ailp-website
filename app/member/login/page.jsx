"use client";

/* ==========================================================
   Member Login
========================================================== */

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  AlertCircle,
  ArrowRight,
  BadgeCheck,
  Eye,
  EyeOff,
  HeartHandshake,
  IdCard,
  Loader2,
  Lock,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import AuthShell from "@/components/member/AuthShell";
import styles from "@/components/member/MemberAuth.module.css";

/* Only allow redirects back into the member portal. */
function safeNext(value) {
  if (!value || !value.startsWith("/member/") || value.startsWith("//") || value.startsWith("/member/login")) {
    return "/member/dashboard";
  }
  return value;
}

function validate({ identifier, password }) {
  const errors = {};
  const id = identifier.trim();

  if (!id) {
    errors.identifier = "Enter your email or mobile number.";
  } else if (id.includes("@")) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(id)) errors.identifier = "Enter a valid email address.";
  } else if (id.replace(/\D/g, "").length < 10) {
    errors.identifier = "Enter a valid 10-digit mobile number.";
  }

  if (!password) errors.password = "Enter your password.";

  return errors;
}

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = safeNext(params.get("next"));

  const [form, setForm] = useState({ identifier: "", password: "", remember: true });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [capsLock, setCapsLock] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  function update(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    if (formError) setFormError("");
  }

  function checkCaps(e) {
    if (typeof e.getModifierState === "function") setCapsLock(e.getModifierState("CapsLock"));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (loading || success) return;

    const found = validate(form);
    setErrors(found);
    setFormError("");
    if (Object.keys(found).length) {
      document.getElementById(found.identifier ? "identifier" : "password")?.focus();
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          identifier: form.identifier.trim(),
          password: form.password,
          remember: form.remember,
        }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Unable to sign in. Please try again.");
      }

      setSuccess(true);
      router.replace(next);
      router.refresh();
    } catch (err) {
      setFormError(
        err instanceof TypeError ? "Can't reach the server. Check your internet connection and try again." : err.message
      );
      setForm((prev) => ({ ...prev, password: "" }));
      setLoading(false);
    }
  }

  const busy = loading || success;

  return (
    <form onSubmit={handleSubmit} noValidate className={styles.form} aria-describedby={formError ? "form-error" : undefined}>
      {formError && (
        <div id="form-error" className={styles.alert} role="alert">
          <AlertCircle size={18} aria-hidden="true" />
          <span>{formError}</span>
        </div>
      )}

      <div className={styles.field}>
        <label htmlFor="identifier" className={styles.label}>
          Email or mobile number
        </label>
        <div className={`${styles.control} ${errors.identifier ? styles.controlError : ""}`}>
          <UserRound size={18} className={styles.icon} aria-hidden="true" />
          <input
            id="identifier"
            name="identifier"
            type="text"
            autoComplete="username"
            autoCapitalize="none"
            spellCheck={false}
            placeholder="you@example.com or 98765 43210"
            value={form.identifier}
            onChange={update}
            disabled={busy}
            aria-invalid={Boolean(errors.identifier)}
            aria-describedby={errors.identifier ? "identifier-error" : undefined}
          />
        </div>
        {errors.identifier && (
          <p id="identifier-error" className={styles.fieldError}>
            {errors.identifier}
          </p>
        )}
      </div>

      <div className={styles.field}>
        <div className={styles.labelRow}>
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <Link href="/forgot-password" className={styles.textLink}>
            Forgot password?
          </Link>
        </div>
        <div className={`${styles.control} ${errors.password ? styles.controlError : ""}`}>
          <Lock size={18} className={styles.icon} aria-hidden="true" />
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="Enter your password"
            value={form.password}
            onChange={update}
            onKeyUp={checkCaps}
            onKeyDown={checkCaps}
            onBlur={() => setCapsLock(false)}
            disabled={busy}
            aria-invalid={Boolean(errors.password)}
            aria-describedby={errors.password ? "password-error" : capsLock ? "caps-hint" : undefined}
          />
          <button
            type="button"
            className={styles.reveal}
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            aria-pressed={showPassword}
            disabled={busy}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {errors.password ? (
          <p id="password-error" className={styles.fieldError}>
            {errors.password}
          </p>
        ) : (
          capsLock && (
            <p id="caps-hint" className={styles.capsHint}>
              Caps Lock is on
            </p>
          )
        )}
      </div>

      <label className={styles.remember}>
        <input type="checkbox" name="remember" checked={form.remember} onChange={update} disabled={busy} />
        <span>Keep me signed in for 30 days</span>
      </label>

      <button type="submit" className={styles.submit} disabled={busy}>
        {busy ? (
          <>
            <Loader2 size={18} className={styles.spin} aria-hidden="true" />
            {success ? "Opening your dashboard…" : "Signing in…"}
          </>
        ) : (
          <>
            Sign in <ArrowRight size={18} aria-hidden="true" />
          </>
        )}
      </button>
    </form>
  );
}

const HIGHLIGHTS = [
  { icon: IdCard, title: "Digital ID card", text: "Download your official membership card anytime." },
  { icon: BadgeCheck, title: "Verified membership", text: "QR-verified identity recognised across the party." },
  { icon: HeartHandshake, title: "Stay involved", text: "Update your details and support the movement." },
];

export default function MemberLoginPage() {
  return (
    <AuthShell
      kicker="Official member portal"
      brandTitle="Together for employment, equality & social justice."
      items={HIGHLIGHTS}
      title="Sign in to your account"
      subtitle="Welcome back. Enter your details to open your member dashboard."
    >
      <Suspense fallback={<div className={styles.formFallback} />}>
        <LoginForm />
      </Suspense>

      <div className={styles.divider}>
        <span>New to AILP?</span>
      </div>

      <Link href="/member/register" className={styles.secondary}>
        Become a member
      </Link>

      <p className={styles.secure}>
        <ShieldCheck size={15} aria-hidden="true" />
        Secured with encrypted, HTTP-only sessions
      </p>
    </AuthShell>
  );
}
