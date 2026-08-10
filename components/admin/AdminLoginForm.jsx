"use client";

/* ==========================================================
   Admin Login Form
   All India Labour Party
========================================================== */

import { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";

import styles from "./AdminLoginForm.module.css";

export default function AdminLoginForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  /* ==========================================================
     Handle Input Change
  ========================================================== */

  function handleChange(event) {
    const {
      name,
      value,
      type,
      checked,
    } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  }

  /* ==========================================================
     Handle Login
  ========================================================== */

  async function handleSubmit(event) {
    event.preventDefault();

    setLoading(true);

    setError("");

    try {
      const response = await fetch(
        "/api/admin/login",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!data.success) {
        setError(data.message);

        setLoading(false);

        return;
      }

      router.push("/admin/dashboard");

      router.refresh();
    } catch (error) {
      console.error(error);

      setError(
        "Unable to login. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.card}>
      {/* ======================================
          Header
      ====================================== */}

      <div className={styles.header}>
        <h2>Admin Login</h2>

        <p>
          Sign in to access the
          administration panel.
        </p>
      </div>

      {/* ======================================
          Form
      ====================================== */}

      <form
        className={styles.form}
        onSubmit={handleSubmit}
      >
        {/* Email */}

        <div className={styles.inputGroup}>
          <Mail size={20} />

          <input
            type="email"
            name="email"
            placeholder="Admin Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password */}

        <div
          className={
            styles.passwordGroup
          }
        >
          <Lock size={20} />

          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button
            type="button"
            className={
              styles.eyeButton
            }
            onClick={() =>
              setShowPassword(
                !showPassword
              )
            }
          >
            {showPassword ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>
        </div>

        {/* Remember */}

        <div className={styles.options}>
          <label>
            <input
              type="checkbox"
              name="remember"
              checked={
                formData.remember
              }
              onChange={handleChange}
            />

            Remember Me
          </label>

          <Link
            href="/admin/forgot-password"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Error */}

        {error && (
          <div
            className={styles.error}
          >
            {error}
          </div>
        )}

        {/* Button */}

        <button
          type="submit"
          disabled={loading}
          className={
            styles.loginButton
          }
        >
          {loading ? (
            "Signing In..."
          ) : (
            <>
              Login

              <ArrowRight
                size={18}
              />
            </>
          )}
        </button>
      </form>

      {/* Footer */}

      <div className={styles.footer}>
        <p>
          All India Labour Party
          <br />
          Admin Portal
        </p>
      </div>
    </div>
  );
}