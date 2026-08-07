"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Eye, EyeOff, ShieldCheck, CheckCircle } from "lucide-react";

import styles from "./AdminLogin.module.css";

export default function AdminLoginPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "",

    password: "",
  });

  function handleChange(event) {
    const {
      name,

      value,
    } = event.target;

    setFormData((previous) => ({
      ...previous,

      [name]: value,
    }));
  }

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
            "Content-Type": "application/json",
          },

          body: JSON.stringify(formData),
        },
      );

      const data = await response.json();

      if (!data.success) {
        setError(data.message);

        return;
      }

      router.push("/admin/dashboard");
    } catch {
      setError("Unable to login. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        {/* Left Panel */}

        <div className={styles.left}>
          <div className={styles.logo}>
            <ShieldCheck size={46} />
          </div>

          <h1>All India Labour Party</h1>

          <p>
            Secure Administration Portal
            <br />
            Manage members, donations, contact enquiries and newsletters from
            one professional dashboard.
          </p>

          <div className={styles.features}>
            <div className={styles.feature}>
              <CheckCircle size={20} />
              Member Management
            </div>

            <div className={styles.feature}>
              <CheckCircle size={20} />
              Donation Information
            </div>

            <div className={styles.feature}>
              <CheckCircle size={20} />
              Contact Messages
            </div>

            <div className={styles.feature}>
              <CheckCircle size={20} />
              Newsletter Subscribers
            </div>
          </div>
        </div>

        {/* Right Panel */}

        <div className={styles.right}>
          <h2 className={styles.loginTitle}>Admin Login</h2>

          <p className={styles.loginSub}>
            Enter your administrator credentials
          </p>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.group}>
              <label className={styles.label}>Email Address</label>

              <input
                className={styles.input}
                type="email"
                name="email"
                placeholder="admin@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.group}>
              <label className={styles.label}>Password</label>

              <div className={styles.passwordBox}>
                <input
                  className={styles.passwordInput}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter Password"
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
            </div>

            {error && <div className={styles.error}>{error}</div>}

            <button
              type="submit"
              className={styles.loginButton}
              disabled={loading}
            >
              {loading ? "Signing In..." : "Login"}
            </button>
          </form>

          <div className={styles.footer}>
            © 2026 <strong>AILP Admin Panel</strong>
          </div>
        </div>
      </div>
    </main>
  );
}
