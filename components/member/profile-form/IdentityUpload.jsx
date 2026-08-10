"use client";

/* ==========================================================
   Identity Upload
   All India Labour Party
   Modern Professional Member Portal
========================================================== */

import {
  useEffect,
  useState,
} from "react";

import {
  Camera,
  PenLine,
  Upload,
  FileCheck2,
  X,
} from "lucide-react";

import styles from "../ProfileForm.module.css";

export default function IdentityUpload({
  formData,
  setFormData,
  handleFileChange,
}) {
  /* ========================================================
     Preview State
  ======================================================== */

  const [photoPreview, setPhotoPreview] =
    useState(null);

  const [signaturePreview, setSignaturePreview] =
    useState(null);

  /* ========================================================
     Profile Photo Preview
  ======================================================== */

  useEffect(() => {
    if (!(formData.photo instanceof File)) {
      setPhotoPreview(null);

      return;
    }

    const objectUrl =
      URL.createObjectURL(formData.photo);

    setPhotoPreview(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [formData.photo]);

  /* ========================================================
     Signature Preview
  ======================================================== */

  useEffect(() => {
    if (!(formData.signature instanceof File)) {
      setSignaturePreview(null);

      return;
    }

    const objectUrl =
      URL.createObjectURL(formData.signature);

    setSignaturePreview(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [formData.signature]);

  /* ========================================================
     Remove Photo
  ======================================================== */

  function removePhoto() {
    setFormData((previous) => ({
      ...previous,
      photo: null,
    }));
  }

  /* ========================================================
     Remove Signature
  ======================================================== */

  function removeSignature() {
    setFormData((previous) => ({
      ...previous,
      signature: null,
    }));
  }

  /* ========================================================
     Render
  ======================================================== */

  return (
    <section className={styles.profileSection}>
      {/* ==================================================
          Section Header
      ================================================== */}

      <div className={styles.sectionHeader}>
        <div className={styles.sectionHeaderContent}>
          {/* Section Icon */}

          <div className={styles.sectionIcon}>
            <Camera size={21} />
          </div>

          <div>
            <h2>
              Profile Photo & Signature
            </h2>

            <p>
              Upload a clear profile photograph and your
              signature for your AILP membership record.
            </p>
          </div>
        </div>
      </div>

      {/* ==================================================
          Upload Grid
      ================================================== */}

      <div className={styles.uploadGrid}>
        {/* =================================================
            Profile Photo
        ================================================= */}

        <div className={styles.uploadCard}>
          {photoPreview ? (
            <>
              {/* Photo Preview */}

              <img
                src={photoPreview}
                alt="Profile photo preview"
                className={styles.imagePreview}
              />

              {/* Selected Message */}

              <div className={styles.uploadCardInfo}>
                <h3>
                  Profile Photo Selected
                </h3>

                <p>
                  Your new profile photo is ready to
                  upload.
                </p>
              </div>

              {/* Actions */}

              <div className={styles.uploadActions}>
                <label
                  htmlFor="photo"
                  className={styles.uploadButton}
                >
                  <Upload size={16} />

                  <span>
                    Change Photo
                  </span>
                </label>

                <button
                  type="button"
                  className={styles.removeButton}
                  onClick={removePhoto}
                  aria-label="Remove profile photo"
                >
                  <X size={16} />
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Empty State Icon */}

              <div className={styles.uploadIcon}>
                <Camera size={25} />
              </div>

              <h3>
                Profile Photo
              </h3>

              <p>
                Upload a recent passport-style
                photograph.
              </p>

              <label
                htmlFor="photo"
                className={styles.uploadButton}
              >
                <Upload size={16} />

                <span>
                  Choose Photo
                </span>
              </label>
            </>
          )}

          {/* Hidden File Input */}

          <input
            id="photo"
            name="photo"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileChange}
            className={styles.fileInput}
          />

          {/* File Information */}

          <span className={styles.uploadHint}>
            JPG, PNG or WebP • Maximum 5 MB
          </span>
        </div>

        {/* =================================================
            Signature
        ================================================= */}

        <div className={styles.uploadCard}>
          {signaturePreview ? (
            <>
              {/* Signature Preview */}

              <img
                src={signaturePreview}
                alt="Signature preview"
                className={styles.signaturePreview}
              />

              {/* Selected Message */}

              <div className={styles.uploadCardInfo}>
                <h3>
                  Signature Selected
                </h3>

                <p>
                  Your signature is ready to upload.
                </p>
              </div>

              {/* Actions */}

              <div className={styles.uploadActions}>
                <label
                  htmlFor="signature"
                  className={styles.uploadButton}
                >
                  <Upload size={16} />

                  <span>
                    Change Signature
                  </span>
                </label>

                <button
                  type="button"
                  className={styles.removeButton}
                  onClick={removeSignature}
                  aria-label="Remove signature"
                >
                  <X size={16} />
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Empty State Icon */}

              <div className={styles.uploadIcon}>
                <PenLine size={25} />
              </div>

              <h3>
                Signature
              </h3>

              <p>
                Upload a clear image of your
                handwritten signature.
              </p>

              <label
                htmlFor="signature"
                className={styles.uploadButton}
              >
                <Upload size={16} />

                <span>
                  Choose Signature
                </span>
              </label>
            </>
          )}

          {/* Hidden File Input */}

          <input
            id="signature"
            name="signature"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileChange}
            className={styles.fileInput}
          />

          {/* File Information */}

          <span className={styles.uploadHint}>
            JPG, PNG or WebP • Maximum 5 MB
          </span>
        </div>
      </div>

      {/* ==================================================
          Upload Guidelines
      ================================================== */}

      <div className={styles.uploadNotice}>
        <FileCheck2 size={18} />

        <div>
          <strong>
            Upload Guidelines
          </strong>

          <span>
            Use clear, readable images. Avoid blurry,
            dark or heavily cropped photographs and
            signatures.
          </span>
        </div>
      </div>
    </section>
  );
}