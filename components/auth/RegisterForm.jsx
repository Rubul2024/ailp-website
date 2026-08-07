"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { User, Mail, Phone, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

import styles from "./RegisterForm.module.css";

export default function RegisterForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",

    mobile: "",

    email: "",

    password: "",

    confirmPassword: "",
  });

  /* ==========================================
     Handle Input Change
  ========================================== */

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,

      [name]: value,
    }));
  }

  /* ==========================================
     Register
  ========================================== */

  async function handleSubmit(event) {
    event.preventDefault();

    setLoading(true);

    setError("");

    setSuccess("");

    try {
      const response = await fetch(
        "/api/auth/register",

        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(formData),
        },
      );

      const data = await response.json();

      if (!data.success) {
        setError(data.message);

        setLoading(false);

        return;
      }

      setSuccess(data.message);

      setTimeout(() => {
        router.push("/login");
      }, 1800);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.card}>
      {/* Header */}

      <div className={styles.header}>
        <h2>Create Your Account</h2>

        <p>
          Join the All India Labour Party and become a part of the movement.
        </p>
      </div>

      {/* Form */}

      <form className={styles.form} onSubmit={handleSubmit}>
        {/* Full Name */}

        <div className={styles.inputGroup}>
          <User size={20} />

          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>

        {/* Mobile */}

        <div className={styles.inputGroup}>
          <Phone size={20} />

          <input
            type="tel"
            name="mobile"
            placeholder="Mobile Number"
            value={formData.mobile}
            onChange={handleChange}
            required
          />
        </div>

        {/* Email */}

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

        {/* Password */}

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

        {/* Confirm Password */}

        <div className={styles.passwordGroup}>
          <Lock size={20} />

          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <button
            type="button"
            className={styles.eyeButton}
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Error */}

        {error && <div className={styles.error}>{error}</div>}

        {/* Success */}

        {success && <div className={styles.success}>{success}</div>}

        {/* Button */}

        <button
          type="submit"
          disabled={loading}
          className={styles.submitButton}
        >
          {loading ? (
            "Creating Account..."
          ) : (
            <>
              Create Account
              <ArrowRight size={18} />
            </>
          )}
        </button>
      </form>

      {/* Footer */}

      <div className={styles.footer}>
        Already have an account?
        <Link href="/login">Login</Link>
      </div>
    </div>
  );
}
