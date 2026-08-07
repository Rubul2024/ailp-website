"use client";

import { useState } from "react";

import { Camera, PencilLine, Loader2, X, Upload } from "lucide-react";

import styles from "../ProfileForm.module.css";

export default function IdentityUpload({
  formData,

  setFormData,
}) {
  const [uploading, setUploading] = useState({
    photo: false,

    signature: false,
  });

  const [error, setError] = useState("");

  async function uploadImage(event, type) {
    const file = event.target.files[0];

    if (!file) return;

    setError("");

    /* ==============================
       Client Validation
    ============================== */

    const allowed = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

    if (!allowed.includes(file.type)) {
      setError("Only JPG, JPEG, PNG and WEBP images are allowed.");

      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setError("Maximum image size is 2 MB.");

      return;
    }

    setUploading((previous) => ({
      ...previous,

      [type]: true,
    }));

    try {
      const body = new FormData();

      body.append("file", file);

      body.append(
        "folder",

        type === "photo" ? "AILP/members/photos" : "AILP/members/signatures",
      );

      const response = await fetch(
        "/api/upload",

        {
          method: "POST",

          body,
        },
      );

      const data = await response.json();

      if (!data.success) {
        setError(data.message);

        return;
      }

      setFormData((previous) => ({
        ...previous,

        [type]: {
          url: data.image.url,

          publicId: data.image.publicId,

          width: data.image.width,

          height: data.image.height,
        },
      }));
    } catch (error) {
      console.error(error);

      setError("Image upload failed.");
    } finally {
      setUploading((previous) => ({
        ...previous,

        [type]: false,
      }));
    }
  }

  async function removeImage(type) {
    try {
      const currentImage = formData[type];

      if (currentImage?.publicId) {
        await fetch(
          "/api/upload/delete",

          {
            method: "POST",

            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify({
              publicId: currentImage.publicId,
            }),
          },
        );
      }

      setFormData((previous) => ({
        ...previous,

        [type]: {
          url: "",

          publicId: "",
        },
      }));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <div>
          <h2>Identity Upload</h2>

          <p>
            Upload your profile photo and signature. These images will appear on
            your Membership Card.
          </p>
        </div>
      </div>

      {error && <div className={styles.errorMessage}>{error}</div>}

      <div className={styles.uploadGrid}>
        {/* =====================================
            Profile Photo
        ===================================== */}

        <UploadCard
          title="Profile Photo"
          loading={uploading.photo}
          image={formData.photo}
          icon={<Camera size={44} />}
          onUpload={(event) => uploadImage(event, "photo")}
          onRemove={() => removeImage("photo")}
        />

        {/* =====================================
            Signature
        ===================================== */}

        <UploadCard
          title="Signature"
          loading={uploading.signature}
          image={formData.signature}
          icon={<PencilLine size={44} />}
          onUpload={(event) => uploadImage(event, "signature")}
          onRemove={() => removeImage("signature")}
        />
      </div>
    </section>
  );
}

/* ==========================================================
   Upload Card Component
========================================================== */

function UploadCard({
  title,

  loading,

  image,

  icon,

  onUpload,

  onRemove,
}) {
  return (
    <div className={styles.uploadCard}>
      <div className={styles.preview}>
        {loading ? (
          <Loader2 size={42} className={styles.spin} />
        ) : image?.url ? (
          <img src={image.url} alt={title} className={styles.previewImage} />
        ) : (
          icon
        )}
      </div>

      <label className={styles.uploadButton}>
        <Upload size={18} />

        {loading ? "Uploading..." : `Choose ${title}`}

        <input hidden type="file" accept="image/*" onChange={onUpload} />
      </label>

      {image?.url && (
        <button
          type="button"
          className={styles.removeButton}
          onClick={onRemove}
        >
          <X size={16} />
          Remove
        </button>
      )}
    </div>
  );
}
