"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, ShieldCheck, ArrowRight, AlertCircle, Loader2 } from "lucide-react";

import AuthLayout from "@/components/auth/AuthLayout";
import AuthInput from "@/components/auth/AuthInput";
import AuthPasswordInput from "@/components/auth/AuthPasswordInput";

import styles from "./Login.module.css";

export default function MemberLoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
    rememberMe: false,
  });

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
    if (loading) return;
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
          remember: formData.rememberMe,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Invalid email/mobile number or password.");
      }

      router.push("/member/dashboard");
      router.refresh();
    } catch (err) {
      setError(err.message || "Invalid email/mobile number or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      variant="member"
      imageSrc="/images/hero/hero.jpg"
      imageCaption="Together for Employment, Equality & Social Justice."
    >
      <h1 className={styles.heading}>Welcome back</h1>
      <p className={styles.subheading}>Sign in to access your All India Labour Party member dashboard.</p>

      {error && (
        <div className={styles.errorMessage} role="alert" aria-live="assertive">
          <AlertCircle size={18} aria-hidden="true" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className={styles.formBody} noValidate>
        <AuthInput
          id="identifier"
          name="identifier"
          label="Email or Mobile Number"
          icon={Mail}
          type="text"
          placeholder="name@domain.com / 10-digit mobile"
          value={formData.identifier}
          onChange={handleChange}
          autoComplete="username"
          required
        />

        <AuthPasswordInput
          id="password"
          name="password"
          label="Password"
          labelAction={
            <Link href="/forgot-password" className={styles.forgotLink}>
              Forgot password?
            </Link>
          }
          placeholder="Enter your account password"
          value={formData.password}
          onChange={handleChange}
          autoComplete="current-password"
          required
        />

        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleChange}
            className={styles.checkboxInput}
          />
          <span>Remember me</span>
        </label>

        <button type="submit" disabled={loading} className={styles.submitLoginBtn}>
          {loading ? (
            <>
              <Loader2 size={18} className={styles.spinner} aria-hidden="true" />
              <span>Signing in...</span>
            </>
          ) : (
            <>
              <span>Continue</span>
              <ArrowRight size={16} aria-hidden="true" />
            </>
          )}
        </button>
      </form>

      <div className={styles.registerRedirectRow}>
        <span>Need an account?</span>
        <Link href="/member/register" className={styles.registerLink}>
          Create one
        </Link>
      </div>

      <div className={styles.securitySealText}>
        <ShieldCheck size={14} aria-hidden="true" />
        <span>Your login information is securely encrypted &amp; protected.</span>
      </div>
    </AuthLayout>
  );
}
