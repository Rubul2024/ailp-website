"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import {
  User,
  ImageIcon,
  Save,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Upload,
  Trash2,
  Users2,
  Plus,
  Pencil,
  X,
  Quote,
  BarChart3,
} from "lucide-react";
import styles from "./Leadership.module.css";

const EMPTY_SETTINGS = {
  heroImage: "",
  presidentName: "",
  presidentDesignation: "National President",
  presidentBadge: "NATIONAL PRESIDENT",
  presidentPhoto: "",
  presidentBio1: "",
  presidentBio2: "",
  presidentQuote: "",
  presidentSignatureTitle: "National President",
  presidentSignatureOrg: "All India Labour Party",
  statPresidentCount: "01",
  statStatesRepresented: "20+",
  statDistricts: "50+",
};

const EMPTY_MEMBER = {
  name: "",
  designation: "",
  photo: "",
  description: "",
  profileUrl: "",
  order: 0,
  showOnHome: true,
  showOnLeadershipPage: true,
  socials: { facebook: "", twitter: "", instagram: "", linkedin: "" },
};

function readImageFile(file, onDone, onError) {
  if (!file) return;

  if (!file.type.startsWith("image/")) {
    onError("Please select a valid image file (PNG, JPG, WEBP).");
    return;
  }

  if (file.size > 2 * 1024 * 1024) {
    onError("Image size must be less than 2MB.");
    return;
  }

  const reader = new FileReader();
  reader.onloadend = () => onDone(reader.result);
  reader.readAsDataURL(file);
}

export default function AdminLeadershipPage() {
  const [activeTab, setActiveTab] = useState("settings");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const [settings, setSettings] = useState(EMPTY_SETTINGS);
  const heroInputRef = useRef(null);
  const presidentPhotoInputRef = useRef(null);

  const [members, setMembers] = useState([]);
  const [memberForm, setMemberForm] = useState(EMPTY_MEMBER);
  const [editingMemberId, setEditingMemberId] = useState(null);
  const [memberFormOpen, setMemberFormOpen] = useState(false);
  const memberPhotoInputRef = useRef(null);

  /* ==========================================
     Load Data
  ========================================== */

  const loadSettings = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/leadership/settings", {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      });
      const data = await res.json();
      if (res.ok && data.success && data.settings) {
        setSettings({ ...EMPTY_SETTINGS, ...data.settings });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Unable to load leadership settings." });
    }
  }, []);

  const loadMembers = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/leadership/members", {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setMembers(data.members || []);
      }
    } catch (err) {
      setMessage({ type: "error", text: "Unable to load leadership team members." });
    }
  }, []);

  const loadAll = useCallback(async () => {
    setLoading(true);
    setMessage({ type: "", text: "" });
    await Promise.all([loadSettings(), loadMembers()]);
    setLoading(false);
  }, [loadSettings, loadMembers]);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  /* ==========================================
     Settings Form
  ========================================== */

  const handleSettingsChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleHeroImageUpload = (e) => {
    const file = e.target.files?.[0];
    readImageFile(
      file,
      (dataUrl) => setSettings((prev) => ({ ...prev, heroImage: dataUrl })),
      (err) => setMessage({ type: "error", text: err })
    );
  };

  const handlePresidentPhotoUpload = (e) => {
    const file = e.target.files?.[0];
    readImageFile(
      file,
      (dataUrl) => setSettings((prev) => ({ ...prev, presidentPhoto: dataUrl })),
      (err) => setMessage({ type: "error", text: err })
    );
  };

  const handleSettingsSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: "", text: "" });

    try {
      const res = await fetch("/api/admin/leadership/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(settings),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setMessage({ type: "success", text: data.message || "Leadership settings saved!" });
        if (data.settings) {
          setSettings({ ...EMPTY_SETTINGS, ...data.settings });
        }
      } else {
        setMessage({ type: "error", text: data.message || "Failed to save leadership settings." });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Server error occurred while saving settings." });
    } finally {
      setSaving(false);
    }
  };

  /* ==========================================
     Member Form
  ========================================== */

  const openAddMemberForm = () => {
    setEditingMemberId(null);
    setMemberForm(EMPTY_MEMBER);
    setMemberFormOpen(true);
  };

  const openEditMemberForm = (member) => {
    setEditingMemberId(member._id);
    setMemberForm({
      name: member.name || "",
      designation: member.designation || "",
      photo: member.photo || "",
      description: member.description || "",
      profileUrl: member.profileUrl || "",
      order: member.order ?? 0,
      showOnHome: member.showOnHome ?? true,
      showOnLeadershipPage: member.showOnLeadershipPage ?? true,
      socials: {
        facebook: member.socials?.facebook || "",
        twitter: member.socials?.twitter || "",
        instagram: member.socials?.instagram || "",
        linkedin: member.socials?.linkedin || "",
      },
    });
    setMemberFormOpen(true);
  };

  const closeMemberForm = () => {
    setMemberFormOpen(false);
    setEditingMemberId(null);
    setMemberForm(EMPTY_MEMBER);
  };

  const handleMemberChange = (e) => {
    const { name, value, type, checked } = e.target;
    setMemberForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleMemberSocialChange = (e) => {
    const { name, value } = e.target;
    setMemberForm((prev) => ({ ...prev, socials: { ...prev.socials, [name]: value } }));
  };

  const handleMemberPhotoUpload = (e) => {
    const file = e.target.files?.[0];
    readImageFile(
      file,
      (dataUrl) => setMemberForm((prev) => ({ ...prev, photo: dataUrl })),
      (err) => setMessage({ type: "error", text: err })
    );
  };

  const handleMemberSubmit = async (e) => {
    e.preventDefault();

    if (!memberForm.name.trim()) {
      setMessage({ type: "error", text: "Member name is required." });
      return;
    }

    setSaving(true);
    setMessage({ type: "", text: "" });

    try {
      const url = editingMemberId
        ? `/api/admin/leadership/members/${editingMemberId}`
        : "/api/admin/leadership/members";
      const method = editingMemberId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(memberForm),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setMessage({ type: "success", text: data.message || "Leadership member saved!" });
        closeMemberForm();
        loadMembers();
      } else {
        setMessage({ type: "error", text: data.message || "Failed to save leadership member." });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Server error occurred while saving the member." });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteMember = async (member) => {
    if (!window.confirm(`Remove "${member.name}" from the leadership team?`)) return;

    try {
      const res = await fetch(`/api/admin/leadership/members/${member._id}/delete`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setMessage({ type: "success", text: "Leadership member deleted." });
        setMembers((prev) => prev.filter((m) => m._id !== member._id));
      } else {
        setMessage({ type: "error", text: data.message || "Failed to delete member." });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Server error occurred while deleting the member." });
    }
  };

  return (
    <div className={styles.container}>
      {/* Top Banner */}
      <div className={styles.banner}>
        <div>
          <h2 className={styles.bannerTitle}>Leadership Management</h2>
          <p className={styles.bannerSubtitle}>
            Manage the leadership hero image, National President spotlight and team members.
          </p>
        </div>

        <div className={styles.tabPillGroup}>
          <button
            type="button"
            className={`${styles.tabPill} ${activeTab === "settings" ? styles.tabActive : ""}`}
            onClick={() => setActiveTab("settings")}
          >
            <User size={16} />
            <span>President & Hero</span>
          </button>
          <button
            type="button"
            className={`${styles.tabPill} ${activeTab === "members" ? styles.tabActive : ""}`}
            onClick={() => setActiveTab("members")}
          >
            <Users2 size={16} />
            <span>Team Members</span>
          </button>
        </div>
      </div>

      {message.text && (
        <div className={message.type === "success" ? styles.successAlert : styles.errorAlert}>
          {message.type === "success" ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          <span>{message.text}</span>
        </div>
      )}

      {/* ================================================
          TAB 1: President & Hero Settings
      ================================================ */}

      {activeTab === "settings" && (
        <form className={styles.formCard} onSubmit={handleSettingsSubmit}>
          <div className={styles.formHeader}>
            <div className={styles.formHeaderText}>
              <h3>Leadership Page Hero</h3>
              <p>Shown at the top of the public /leadership page</p>
            </div>
          </div>

          <div className={styles.inputGrid}>
            <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
              <label>Hero Image</label>
              <input
                type="file"
                ref={heroInputRef}
                accept="image/png, image/jpeg, image/jpg, image/webp"
                onChange={handleHeroImageUpload}
                style={{ display: "none" }}
              />
              <ImageUploadBox
                image={settings.heroImage}
                onChange={() => heroInputRef.current?.click()}
                onRemove={() => setSettings((prev) => ({ ...prev, heroImage: "" }))}
                label="Click to upload the leadership hero photo"
              />
            </div>

            <div className={styles.inputGroup}>
              <label>National President Count</label>
              <div className={styles.inputWrap}>
                <BarChart3 size={16} className={styles.inputIcon} />
                <input
                  type="text"
                  name="statPresidentCount"
                  value={settings.statPresidentCount}
                  onChange={handleSettingsChange}
                  placeholder="01"
                />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label>States Represented</label>
              <div className={styles.inputWrap}>
                <BarChart3 size={16} className={styles.inputIcon} />
                <input
                  type="text"
                  name="statStatesRepresented"
                  value={settings.statStatesRepresented}
                  onChange={handleSettingsChange}
                  placeholder="20+"
                />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label>Districts</label>
              <div className={styles.inputWrap}>
                <BarChart3 size={16} className={styles.inputIcon} />
                <input
                  type="text"
                  name="statDistricts"
                  value={settings.statDistricts}
                  onChange={handleSettingsChange}
                  placeholder="50+"
                />
              </div>
            </div>
          </div>

          <div className={styles.formHeader}>
            <div className={styles.formHeaderText}>
              <h3>National President Spotlight</h3>
              <p>Shown in the "Leadership that puts people first" section</p>
            </div>
          </div>

          <div className={styles.inputGrid}>
            <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
              <label>President Photo</label>
              <input
                type="file"
                ref={presidentPhotoInputRef}
                accept="image/png, image/jpeg, image/jpg, image/webp"
                onChange={handlePresidentPhotoUpload}
                style={{ display: "none" }}
              />
              <ImageUploadBox
                image={settings.presidentPhoto}
                onChange={() => presidentPhotoInputRef.current?.click()}
                onRemove={() => setSettings((prev) => ({ ...prev, presidentPhoto: "" }))}
                label="Click to upload the President's photo"
              />
            </div>

            <div className={styles.inputGroup}>
              <label>President Name</label>
              <div className={styles.inputWrap}>
                <User size={16} className={styles.inputIcon} />
                <input
                  type="text"
                  name="presidentName"
                  value={settings.presidentName}
                  onChange={handleSettingsChange}
                  placeholder="e.g., Ramesh Kumar"
                />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label>Badge Text</label>
              <div className={styles.inputWrap}>
                <User size={16} className={styles.inputIcon} />
                <input
                  type="text"
                  name="presidentBadge"
                  value={settings.presidentBadge}
                  onChange={handleSettingsChange}
                  placeholder="NATIONAL PRESIDENT"
                />
              </div>
            </div>

            <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
              <label>Bio Paragraph 1</label>
              <div className={styles.inputWrap}>
                <textarea
                  rows={3}
                  name="presidentBio1"
                  value={settings.presidentBio1}
                  onChange={handleSettingsChange}
                  placeholder="The President of the All India Labour Party provides leadership to the organisation..."
                />
              </div>
            </div>

            <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
              <label>Bio Paragraph 2</label>
              <div className={styles.inputWrap}>
                <textarea
                  rows={3}
                  name="presidentBio2"
                  value={settings.presidentBio2}
                  onChange={handleSettingsChange}
                  placeholder="Through public participation, organisational development..."
                />
              </div>
            </div>

            <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
              <label>Pull Quote</label>
              <div className={styles.inputWrap}>
                <Quote size={16} className={styles.inputIcon} />
                <input
                  type="text"
                  name="presidentQuote"
                  value={settings.presidentQuote}
                  onChange={handleSettingsChange}
                  placeholder="Together, with dignity, opportunity and justice, we can build a stronger India."
                />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label>Signature Title</label>
              <div className={styles.inputWrap}>
                <input
                  type="text"
                  name="presidentSignatureTitle"
                  value={settings.presidentSignatureTitle}
                  onChange={handleSettingsChange}
                />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label>Signature Organisation</label>
              <div className={styles.inputWrap}>
                <input
                  type="text"
                  name="presidentSignatureOrg"
                  value={settings.presidentSignatureOrg}
                  onChange={handleSettingsChange}
                />
              </div>
            </div>
          </div>

          <div className={styles.formFooter}>
            <button
              type="button"
              className={styles.resetBtn}
              onClick={loadAll}
              disabled={loading || saving}
            >
              <RefreshCw size={15} className={loading ? styles.spin : ""} />
              <span>Reset</span>
            </button>

            <button type="submit" className={styles.saveBtn} disabled={saving || loading}>
              <Save size={16} />
              <span>{saving ? "Saving..." : "Save Leadership Settings"}</span>
            </button>
          </div>
        </form>
      )}

      {/* ================================================
          TAB 2: Team Members
      ================================================ */}

      {activeTab === "members" && (
        <div className={styles.formCard}>
          <div className={styles.formHeader}>
            <div className={styles.formHeaderText}>
              <h3>Leadership Team Members</h3>
              <p>Shown on the homepage "Leadership" section and the /leadership team grid</p>
            </div>

            {!memberFormOpen && (
              <button type="button" className={styles.saveBtn} onClick={openAddMemberForm}>
                <Plus size={16} />
                <span>Add Member</span>
              </button>
            )}
          </div>

          {memberFormOpen && (
            <form className={styles.memberFormBox} onSubmit={handleMemberSubmit}>
              <div className={styles.formHeader}>
                <div className={styles.formHeaderText}>
                  <h3>{editingMemberId ? "Edit Member" : "New Member"}</h3>
                </div>
                <button type="button" className={styles.iconBtn} onClick={closeMemberForm}>
                  <X size={16} />
                </button>
              </div>

              <div className={styles.inputGrid}>
                <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                  <label>Photo</label>
                  <input
                    type="file"
                    ref={memberPhotoInputRef}
                    accept="image/png, image/jpeg, image/jpg, image/webp"
                    onChange={handleMemberPhotoUpload}
                    style={{ display: "none" }}
                  />
                  <ImageUploadBox
                    image={memberForm.photo}
                    onChange={() => memberPhotoInputRef.current?.click()}
                    onRemove={() => setMemberForm((prev) => ({ ...prev, photo: "" }))}
                    label="Click to upload this member's photo"
                    compact
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label>
                    Name <span className={styles.req}>*</span>
                  </label>
                  <div className={styles.inputWrap}>
                    <input
                      type="text"
                      name="name"
                      value={memberForm.name}
                      onChange={handleMemberChange}
                      required
                    />
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label>Designation</label>
                  <div className={styles.inputWrap}>
                    <input
                      type="text"
                      name="designation"
                      value={memberForm.designation}
                      onChange={handleMemberChange}
                      placeholder="e.g., Vice President"
                    />
                  </div>
                </div>

                <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                  <label>Description</label>
                  <div className={styles.inputWrap}>
                    <textarea
                      rows={2}
                      name="description"
                      value={memberForm.description}
                      onChange={handleMemberChange}
                    />
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label>Profile Link (optional)</label>
                  <div className={styles.inputWrap}>
                    <input
                      type="text"
                      name="profileUrl"
                      value={memberForm.profileUrl}
                      onChange={handleMemberChange}
                      placeholder="https://..."
                    />
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label>Display Order</label>
                  <div className={styles.inputWrap}>
                    <input
                      type="number"
                      name="order"
                      value={memberForm.order}
                      onChange={handleMemberChange}
                    />
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label>Facebook</label>
                  <div className={styles.inputWrap}>
                    <input
                      type="text"
                      name="facebook"
                      value={memberForm.socials.facebook}
                      onChange={handleMemberSocialChange}
                    />
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label>Twitter / X</label>
                  <div className={styles.inputWrap}>
                    <input
                      type="text"
                      name="twitter"
                      value={memberForm.socials.twitter}
                      onChange={handleMemberSocialChange}
                    />
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label>Instagram</label>
                  <div className={styles.inputWrap}>
                    <input
                      type="text"
                      name="instagram"
                      value={memberForm.socials.instagram}
                      onChange={handleMemberSocialChange}
                    />
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label>LinkedIn</label>
                  <div className={styles.inputWrap}>
                    <input
                      type="text"
                      name="linkedin"
                      value={memberForm.socials.linkedin}
                      onChange={handleMemberSocialChange}
                    />
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      name="showOnHome"
                      checked={memberForm.showOnHome}
                      onChange={handleMemberChange}
                    />
                    <span>Show on Homepage</span>
                  </label>
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      name="showOnLeadershipPage"
                      checked={memberForm.showOnLeadershipPage}
                      onChange={handleMemberChange}
                    />
                    <span>Show on Leadership Page</span>
                  </label>
                </div>
              </div>

              <div className={styles.formFooter}>
                <button type="button" className={styles.resetBtn} onClick={closeMemberForm}>
                  Cancel
                </button>
                <button type="submit" className={styles.saveBtn} disabled={saving}>
                  <Save size={16} />
                  <span>{saving ? "Saving..." : editingMemberId ? "Update Member" : "Add Member"}</span>
                </button>
              </div>
            </form>
          )}

          <div className={styles.membersGrid}>
            {members.length === 0 && !loading && (
              <div className={styles.emptyState}>
                <Users2 size={32} />
                <span>No leadership team members added yet.</span>
              </div>
            )}

            {members.map((member) => (
              <div key={member._id} className={styles.memberCard}>
                <div className={styles.memberCardPhoto}>
                  {member.photo ? (
                    <img src={member.photo} alt={member.name} />
                  ) : (
                    <User size={28} />
                  )}
                </div>

                <div className={styles.memberCardInfo}>
                  <strong>{member.name}</strong>
                  <span>{member.designation}</span>

                  <div className={styles.memberBadges}>
                    {member.showOnHome && <span className={styles.miniBadge}>Home</span>}
                    {member.showOnLeadershipPage && (
                      <span className={styles.miniBadge}>Leadership Page</span>
                    )}
                  </div>
                </div>

                <div className={styles.memberCardActions}>
                  <button
                    type="button"
                    className={styles.changeBtn}
                    onClick={() => openEditMemberForm(member)}
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    type="button"
                    className={styles.removeBtn}
                    onClick={() => handleDeleteMember(member)}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ImageUploadBox({ image, onChange, onRemove, label, compact }) {
  return (
    <div className={styles.uploadArea}>
      {image ? (
        <div className={styles.uploadedPreview}>
          <div className={compact ? styles.uploadedImgWrapCompact : styles.uploadedImgWrap}>
            <img src={image} alt="Uploaded" />
          </div>
          <div className={styles.uploadedMeta}>
            <strong>Image Ready</strong>
            <span>Click save to apply changes</span>
            <div className={styles.uploadedBtnGroup}>
              <button type="button" className={styles.changeBtn} onClick={onChange}>
                <Upload size={14} /> Change Image
              </button>
              <button type="button" className={styles.removeBtn} onClick={onRemove}>
                <Trash2 size={14} /> Remove
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.dropzone} onClick={onChange}>
          <div className={styles.uploadIconCircle}>
            <ImageIcon size={22} />
          </div>
          <div className={styles.dropzoneText}>
            <strong>{label}</strong>
            <span>PNG, JPG, or WEBP up to 2MB</span>
          </div>
        </div>
      )}
    </div>
  );
}
