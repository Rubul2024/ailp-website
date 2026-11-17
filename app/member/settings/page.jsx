"use client";

/* ==========================================================
   Settings — password and account
========================================================== */

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { AlertCircle, Eye, EyeOff, KeyRound, Loader2, LogOut, UserRound } from "lucide-react";

import { useMember } from "@/components/member/MemberContext";
import { formatDate } from "@/lib/memberProfile";
import ui from "@/components/member/ui.module.css";
import styles from "./Settings.module.css";

function PasswordInput({ id, label, value, onChange, autoComplete, hint }) {
  const [show, setShow] = useState(false);
  return (
    <div className={ui.field}>
      <label htmlFor={id} className={ui.label}>
        {label}
      </label>
      <div className={styles.pwWrap}>
        <input
          id={id}
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={ui.input}
          autoComplete={autoComplete}
        />
        <button type="button" className={styles.eye} onClick={() => setShow((v) => !v)} aria-label={show ? "Hide password" : "Show password"}>
          {show ? <EyeOff size={17} /> : <Eye size={17} />}
        </button>
      </div>
      {hint && <span className={ui.help}>{hint}</span>}
    </div>
  );
}

export default function SettingsPage() {
  const router = useRouter();
  const { member } = useMember();
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [signingOut, setSigningOut] = useState(false);

  async function changePassword(e) {
    e.preventDefault();
    setError("");

    if (!current || !next || !confirm) return setError("Please fill in all three fields.");
    if (next.length < 8) return setError("New password must be at least 8 characters.");
    if (next !== confirm) return setError("New passwords do not match.");
    if (next === current) return setError("New password must be different from the current one.");

    setSaving(true);
    try {
      const res = await fetch("/api/member/change-password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ currentPassword: current, newPassword: next }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) throw new Error(data.message || "Unable to change password.");

      setCurrent("");
      setNext("");
      setConfirm("");
      toast.success("Password changed");
    } catch (err) {
      setError(err.message || "Unable to change password. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  async function signOut() {
    setSigningOut(true);
    try {
      await fetch("/api/member/logout", { method: "POST", credentials: "include" });
    } finally {
      router.replace("/member/login");
      router.refresh();
    }
  }

  return (
    <div className={styles.page}>
      <div className={ui.pageHead}>
        <div>
          <h1 className={ui.pageTitle}>Settings</h1>
          <p className={ui.pageSub}>Manage your password and account.</p>
        </div>
      </div>

      <section className={ui.card}>
        <div className={ui.cardHead}>
          <div>
            <h2 className={ui.cardTitle}>
              <KeyRound size={18} /> Change password
            </h2>
            <p className={ui.cardHint}>Use at least 8 characters.</p>
          </div>
        </div>

        <form onSubmit={changePassword} noValidate className={`${ui.cardPad} ${styles.pwForm}`}>
          <PasswordInput id="current" label="Current password" value={current} onChange={setCurrent} autoComplete="current-password" />
          <PasswordInput id="new" label="New password" value={next} onChange={setNext} autoComplete="new-password" />
          <PasswordInput id="confirm" label="Confirm new password" value={confirm} onChange={setConfirm} autoComplete="new-password" />

          {error && (
            <div className={`${ui.alert} ${ui.alertError}`} role="alert">
              <AlertCircle size={18} /> {error}
            </div>
          )}

          <div>
            <button type="submit" className={`${ui.btn} ${ui.btnPrimary}`} disabled={saving}>
              {saving && <Loader2 size={16} className={ui.spin} />}
              {saving ? "Updating…" : "Update password"}
            </button>
          </div>
        </form>
      </section>

      <section className={ui.card}>
        <div className={ui.cardHead}>
          <h2 className={ui.cardTitle}>
            <UserRound size={18} /> Account
          </h2>
          <Link href="/member/profile" className={styles.link}>
            Edit profile
          </Link>
        </div>

        <dl className={styles.facts}>
          <div>
            <dt>Email</dt>
            <dd>{member?.email || "—"}</dd>
          </div>
          <div>
            <dt>Mobile</dt>
            <dd>{member?.mobile || "—"}</dd>
          </div>
          <div>
            <dt>Member ID</dt>
            <dd>{member?.membershipId || "Pending"}</dd>
          </div>
          <div>
            <dt>Member since</dt>
            <dd>{formatDate(member?.joinDate || member?.createdAt)}</dd>
          </div>
        </dl>

        <div className={styles.signOut}>
          <div>
            <strong>Sign out</strong>
            <span>Sign out of the member portal on this device.</span>
          </div>
          <button type="button" className={`${ui.btn} ${ui.btnDanger}`} onClick={signOut} disabled={signingOut}>
            <LogOut size={16} /> {signingOut ? "Signing out…" : "Sign out"}
          </button>
        </div>
      </section>
    </div>
  );
}
