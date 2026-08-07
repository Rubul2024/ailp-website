"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import styles from "./ProfileForm.module.css";

import ProgressCard from "./profile-form/ProgressCard";
import BasicInformation from "./profile-form/BasicInformation";
import PersonalInformation from "./profile-form/PersonalInformation";
import AddressInformation from "./profile-form/AddressInformation";
import ProfessionalInformation from "./profile-form/ProfessionalInformation";
import EmergencyContact from "./profile-form/EmergencyContact";
import IdentityUpload from "./profile-form/IdentityUpload";
import FormMessages from "./profile-form/FormMessages";
import SubmitButton from "./profile-form/SubmitButton";

export default function ProfileForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState("");

  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    /* Registration */

    fullName: "",

    email: "",

    mobile: "",

    /* Personal */

    fatherName: "",

    motherName: "",

    gender: "",

    dateOfBirth: "",

    /* Professional */

    occupation: "",

    education: "",

    bloodGroup: "",

    /* Address */

    country: "India",

    state: "",

    district: "",

    assembly: "",

    block: "",

    village: "",

    city: "",

    pincode: "",

    address: "",

    /* Emergency */

    emergencyName: "",

    emergencyMobile: "",

    relationship: "",

    /* Upload */

    photo: null,

    signature: null,
  });

  /* ==========================================
     Load Logged-in Member
  ========================================== */

  useEffect(() => {
    loadMember();
  }, []);

  async function loadMember() {
    try {
      const response = await fetch(
        "/api/member/me",

        {
          credentials: "include",
        },
      );

      const data = await response.json();

      if (!data.success) {
        return;
      }

      setFormData((previous) => ({
        ...previous,

        fullName: data.member.fullName || "",

        email: data.member.email || "",

        mobile: data.member.mobile || "",
      }));
    } catch (error) {
      console.error(error);
    }
  }

  /* ==========================================
     Input Change
  ========================================== */

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

  /* ==========================================
     File Change
  ========================================== */

  function handleFileChange(event) {
    const {
      name,

      files,
    } = event.target;

    setFormData((previous) => ({
      ...previous,

      [name]: files[0],
    }));
  }

  /* ==========================================
     Save Profile
  ========================================== */

  async function handleSubmit(event) {
    event.preventDefault();

    setLoading(true);

    setError("");

    setSuccess("");

    try {
      const response = await fetch(
        "/api/member/profile",

        {
          method: "POST",

          credentials: "include",

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

      setSuccess(
        `Membership Profile Completed Successfully.
Membership ID : ${data.membershipId}`,
      );

      setTimeout(() => {
        router.push("/member/dashboard");

        router.refresh();
      }, 2500);
    } catch {
      setError("Unable to save profile.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <ProgressCard formData={formData} />

      <BasicInformation formData={formData} />

      <PersonalInformation formData={formData} handleChange={handleChange} />

      <AddressInformation formData={formData} handleChange={handleChange} />

      <ProfessionalInformation
        formData={formData}
        handleChange={handleChange}
      />

      <EmergencyContact formData={formData} handleChange={handleChange} />

      <IdentityUpload
        formData={formData}
        setFormData={setFormData}
        handleFileChange={handleFileChange}
      />

      <FormMessages success={success} error={error} />

      <SubmitButton loading={loading} />
    </form>
  );
}
