"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, ShieldCheck, AlertCircle, Loader2, Info } from "lucide-react";

import AuthLayout from "@/components/auth/AuthLayout";
import AuthInput from "@/components/auth/AuthInput";
import AuthPasswordInput from "@/components/auth/AuthPasswordInput";

import styles from "./AdminLogin.module.css";

export default function AdminLoginPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (loading) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!data.success) {
        setError(data.message || "Invalid email or password.");
        return;
      }

      router.push("/admin/dashboard");
      router.refresh();
    } catch {
      setError("Unable to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      variant="admin"
      imageSrc="/images/hero/hero.jpg"
      imageCaption="Secure Administration Portal — All India Labour Party."
    >
      <span className={styles.badge}>
        <ShieldCheck size={12} aria-hidden="true" />
        Administrator Access
      </span>

      <h1 className={styles.heading}>Admin sign in</h1>
      <p className={styles.subheading}>
        Enter your administrator credentials to continue. This area is restricted to authorized personnel.
      </p>

      {error && (
        <div className={styles.errorMessage} role="alert" aria-live="assertive">
          <AlertCircle size={18} aria-hidden="true" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className={styles.formBody} noValidate>
        <AuthInput
          id="admin-email"
          name="email"
          label="Email Address"
          icon={Mail}
          type="email"
          placeholder="admin@example.com"
          value={formData.email}
          onChange={handleChange}
          autoComplete="username"
          required
        />

        <AuthPasswordInput
          id="admin-password"
          name="password"
          label="Password"
          placeholder="Enter your administrator password"
          value={formData.password}
          onChange={handleChange}
          autoComplete="current-password"
          required
        />

        <button type="submit" disabled={loading} className={styles.submitLoginBtn}>
          {loading ? (
            <>
              <Loader2 size={18} className={styles.spinner} aria-hidden="true" />
              <span>Signing in...</span>
            </>
          ) : (
            <span>Continue</span>
          )}
        </button>
      </form>

      <div className={styles.securityNotice}>
        <Info size={14} aria-hidden="true" />
        <span>
          This is a restricted administrative system. Unauthorized access attempts are logged and may be
          subject to action under applicable law.
        </span>
      </div>
    </AuthLayout>
  );
}
