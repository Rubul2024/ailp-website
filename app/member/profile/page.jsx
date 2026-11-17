"use client";

/* ==========================================================
   My Profile — only the details the ID card needs.
========================================================== */

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  AlertCircle,
  Camera,
  CheckCircle2,
  IdCard,
  Loader2,
  MapPin,
  Save,
  UserRound,
} from "lucide-react";

import { useMember } from "@/components/member/MemberContext";
import {
  BLOOD_GROUP_OPTIONS,
  GENDER_OPTIONS,
  INDIAN_STATES,
  getCardReadiness,
  getInitials,
  getPhotoUrl,
} from "@/lib/memberProfile";
import ui from "@/components/member/ui.module.css";
import styles from "./Profile.module.css";

const EMPTY = {
  fullName: "",
  mobile: "",
  gender: "",
  dateOfBirth: "",
  bloodGroup: "",
  state: "",
  district: "",
  assembly: "",
  village: "",
  pincode: "",
  address: "",
};

function toForm(member) {
  const form = { ...EMPTY };
  for (const key of Object.keys(EMPTY)) {
    form[key] = member?.[key] ? String(member[key]) : "";
  }
  form.dateOfBirth = member?.dateOfBirth ? new Date(member.dateOfBirth).toISOString().slice(0, 10) : "";
  return form;
}

/* Downscale photos in the browser so uploads are fast and always
   under the 2 MB server limit. */
async function prepareImage(file) {
  const bitmap = await createImageBitmap(file);
  const max = 900;
  const scale = Math.min(1, max / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d").drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close?.();
  const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.88));
  if (!blob) throw new Error("Could not process this image.");
  return new File([blob], "photo.jpg", { type: "image/jpeg" });
}

async function postProfile(body) {
  const res = await fetch("/api/member/profile", {
    method: "POST",
    credentials: "include",
    body,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.success) {
    throw new Error(data.message || "Something went wrong. Please try again.");
  }
  return data;
}

export default function ProfilePage() {
  const { member, loading, error: loadError, setMember } = useMember();
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [today] = useState(() => new Date().toISOString().slice(0, 10));
  const fileRef = useRef(null);
  const hydrated = useRef(false);

  useEffect(() => {
    if (member && !hydrated.current) {
      setForm(toForm(member));
      hydrated.current = true;
    }
  }, [member]);

  const saved = useMemo(() => toForm(member), [member]);
  const dirty = Object.keys(EMPTY).some((k) => form[k] !== saved[k]);

  // Readiness reflects what is on screen, including unsaved edits.
  const readiness = getCardReadiness({ ...member, ...form });
  const missingKeys = new Set(readiness.missing.map((m) => m.key));

  useEffect(() => {
    if (!dirty) return;
    const warn = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  function update(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handlePhoto(e) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please choose an image file (JPG or PNG).");
      return;
    }
    if (file.size > 15 * 1024 * 1024) {
      toast.error("That image is too large. Please choose one under 15 MB.");
      return;
    }

    setUploading(true);
    try {
      const body = new FormData();
      body.append("photo", await prepareImage(file));
      const data = await postProfile(body);
      setMember(data.member);
      toast.success("Photo updated");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (saving) return;
    setError("");

    if (form.fullName.trim().length < 2) return setError("Please enter your full name.");
    if (form.mobile.replace(/\D/g, "").length < 10) return setError("Please enter a valid mobile number.");
    if (form.pincode && !/^\d{6}$/.test(form.pincode)) return setError("Pincode must be 6 digits.");

    setSaving(true);
    try {
      const body = new FormData();
      for (const [key, value] of Object.entries(form)) body.append(key, value.trim());
      const data = await postProfile(body);
      setMember(data.member);
      setForm(toForm(data.member));
      toast.success(data.message || "Profile saved");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className={ui.loading}>
        <div className={ui.spinner} />
        Loading your profile…
      </div>
    );
  }

  if (!member) {
    return (
      <div className={`${ui.alert} ${ui.alertError}`}>
        <AlertCircle size={18} /> {loadError || "Unable to load your profile. Please refresh the page."}
      </div>
    );
  }

  const photoUrl = getPhotoUrl(member.photo);
  const fieldClass = (key) => `${ui.input} ${missingKeys.has(key) ? styles.needs : ""}`;
  const selectClass = (key) => `${ui.select} ${missingKeys.has(key) ? styles.needs : ""}`;

  return (
    <form onSubmit={handleSubmit} noValidate className={styles.page}>
      <div className={ui.pageHead}>
        <div>
          <h1 className={ui.pageTitle}>My Profile</h1>
          <p className={ui.pageSub}>These details are printed on your AILP ID card.</p>
        </div>
      </div>

      {/* Readiness banner */}
      {readiness.ready ? (
        <div className={`${styles.banner} ${styles.bannerDone}`}>
          <CheckCircle2 size={22} />
          <div>
            <strong>Your profile is complete</strong>
            <span>
              {member.cardGenerated
                ? "Your ID card uses these details."
                : "You can now generate your ID card."}
            </span>
          </div>
          <Link href="/member/card" className={`${ui.btn} ${ui.btnSecondary}`}>
            <IdCard size={16} /> {member.cardGenerated ? "View ID card" : "Get ID card"}
          </Link>
        </div>
      ) : (
        <div className={styles.banner}>
          <IdCard size={22} />
          <div>
            <strong>
              {readiness.missing.length} more {readiness.missing.length === 1 ? "detail" : "details"} needed for
              your ID card
            </strong>
            <span className={styles.chips}>
              {readiness.missing.map((m) => (
                <em key={m.key}>{m.label}</em>
              ))}
            </span>
          </div>
        </div>
      )}

      <section className={`${ui.card} ${styles.sheet}`}>
        {/* Identity row */}
        <div className={styles.identity}>
          <div className={`${styles.avatar} ${missingKeys.has("photo") ? styles.avatarNeeds : ""}`}>
            {photoUrl ? <img src={photoUrl} alt="Your profile photo" /> : <span>{getInitials(member.fullName)}</span>}
            {uploading && (
              <span className={styles.avatarBusy}>
                <Loader2 size={22} className={ui.spin} />
              </span>
            )}
            <button
              type="button"
              className={styles.cameraBtn}
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              aria-label={photoUrl ? "Change photo" : "Add photo"}
            >
              <Camera size={16} />
            </button>
            <input ref={fileRef} type="file" accept="image/*" hidden onChange={handlePhoto} />
          </div>

          <div className={styles.identityText}>
            <h2>{member.fullName}</h2>
            <p>{member.email}</p>
            <span className={`${ui.pill} ${member.membershipId ? ui.pillAccent : ui.pillWarn}`}>
              {member.membershipId || "Membership ID pending"}
            </span>
            {!photoUrl && (
              <button type="button" className={`${ui.btn} ${ui.btnGhost} ${styles.addPhoto}`} onClick={() => fileRef.current?.click()}>
                Add a clear, front-facing photo
              </button>
            )}
          </div>
        </div>

        {/* Personal details */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>
            <UserRound size={17} /> Personal details
          </h3>

          <div className={ui.formGrid}>
            <label className={`${ui.field} ${ui.span2}`}>
              <span className={ui.label}>
                Full name <span className={ui.req}>*</span>
              </span>
              <input name="fullName" value={form.fullName} onChange={update} className={fieldClass("fullName")} autoComplete="name" maxLength={100} />
            </label>

            <label className={ui.field}>
              <span className={ui.label}>
                Mobile number <span className={ui.req}>*</span>
              </span>
              <input name="mobile" value={form.mobile} onChange={update} className={fieldClass("mobile")} inputMode="tel" autoComplete="tel" maxLength={16} />
            </label>

            <label className={ui.field}>
              <span className={ui.label}>Email</span>
              <input value={member.email || ""} readOnly className={ui.input} />
            </label>

            <label className={ui.field}>
              <span className={ui.label}>
                Gender <span className={ui.req}>*</span>
              </span>
              <select name="gender" value={form.gender} onChange={update} className={selectClass("gender")}>
                <option value="">Select</option>
                {GENDER_OPTIONS.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </label>

            <label className={ui.field}>
              <span className={ui.label}>
                Date of birth <span className={ui.req}>*</span>
              </span>
              <input type="date" name="dateOfBirth" value={form.dateOfBirth} onChange={update} className={fieldClass("dateOfBirth")} max={today} />
            </label>

            <label className={ui.field}>
              <span className={ui.label}>Blood group</span>
              <select name="bloodGroup" value={form.bloodGroup} onChange={update} className={ui.select}>
                <option value="">Not specified</option>
                {BLOOD_GROUP_OPTIONS.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        {/* Address */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>
            <MapPin size={17} /> Address
          </h3>

          <div className={ui.formGrid}>
            <label className={ui.field}>
              <span className={ui.label}>
                State <span className={ui.req}>*</span>
              </span>
              <select name="state" value={form.state} onChange={update} className={selectClass("state")}>
                <option value="">Select state</option>
                {form.state && !INDIAN_STATES.includes(form.state) && <option value={form.state}>{form.state}</option>}
                {INDIAN_STATES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>

            <label className={ui.field}>
              <span className={ui.label}>
                District <span className={ui.req}>*</span>
              </span>
              <input name="district" value={form.district} onChange={update} className={fieldClass("district")} placeholder="e.g. Barpeta" maxLength={80} />
            </label>

            <label className={ui.field}>
              <span className={ui.label}>Assembly constituency</span>
              <input name="assembly" value={form.assembly} onChange={update} className={ui.input} placeholder="Optional" maxLength={80} />
            </label>

            <label className={ui.field}>
              <span className={ui.label}>Village / Town</span>
              <input name="village" value={form.village} onChange={update} className={ui.input} placeholder="Optional" maxLength={80} />
            </label>

            <label className={ui.field}>
              <span className={ui.label}>Pincode</span>
              <input name="pincode" value={form.pincode} onChange={update} className={ui.input} inputMode="numeric" maxLength={6} placeholder="6 digits" autoComplete="postal-code" />
            </label>

            <label className={`${ui.field} ${ui.span2}`}>
              <span className={ui.label}>Full address</span>
              <textarea name="address" value={form.address} onChange={update} className={ui.textarea} rows={2} maxLength={300} placeholder="House no., street, post office (optional)" />
            </label>
          </div>
        </div>

        {error && (
          <div className={`${ui.alert} ${ui.alertError} ${styles.formError}`} role="alert">
            <AlertCircle size={18} /> {error}
          </div>
        )}

        <div className={styles.saveBar}>
          <span className={styles.saveHint}>{dirty ? "You have unsaved changes" : "All changes saved"}</span>
          <div className={styles.saveActions}>
            {dirty && (
              <button type="button" className={`${ui.btn} ${ui.btnSecondary}`} onClick={() => setForm(saved)} disabled={saving}>
                Discard
              </button>
            )}
            <button type="submit" className={`${ui.btn} ${ui.btnPrimary}`} disabled={!dirty || saving}>
              {saving ? <Loader2 size={16} className={ui.spin} /> : <Save size={16} />}
              {saving ? "Saving…" : "Save changes"}
            </button>
          </div>
        </div>
      </section>
    </form>
  );
}
