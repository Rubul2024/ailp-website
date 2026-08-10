"use client";

import { useState } from "react";

import Link from "next/link";

import { useRouter } from "next/navigation";

import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

import styles from "./LoginForm.module.css";

export default function LoginForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "",

    password: "",

    remember: false,
  });

  function handleChange(event) {
    const {
      name,

      value,

      type,

      checked,
    } = event.target;

    setFormData((previous) => ({
      ...previous,

      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setLoading(true);

    setError("");

    try {
      const response = await fetch("/api/member/login", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        credentials: "include",

        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!data.success) {
        setError(data.message);

        setLoading(false);

        return;
      }

      router.push("/member/dashboard");

      router.refresh();
    } catch {
      setError("Unable to login.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h2>Member Login</h2>

        <p>Sign in to your member account.</p>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <Mail size={20} />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.passwordGroup}>
          <Lock size={20} />

          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button
            type="button"
            className={styles.eyeButton}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <div className={styles.options}>
          <label>
            <input
              type="checkbox"
              name="remember"
              checked={formData.remember}
              onChange={handleChange}
            />
            Remember Me
          </label>

          <Link href="/forgot-password">Forgot Password?</Link>
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <button className={styles.loginButton} disabled={loading}>
          {loading ? (
            "Signing In..."
          ) : (
            <>
              Login
              <ArrowRight size={18} />
            </>
          )}
        </button>
      </form>

      <div className={styles.footer}>
        Don't have an account?
        <Link href="/member/register">Register</Link>
      </div>
    </div>
  );
}
