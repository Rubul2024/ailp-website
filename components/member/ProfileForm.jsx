"use client";

/* ==========================================================
   AILP MEMBER PROFILE
   All India Labour Party

   Modern Professional Member Portal

   This file handles:
   - Member profile loading
   - Real profile completion
   - Accordion sections
   - Form state
   - File uploads
   - Profile submission

   IMPORTANT:
   API logic is preserved.
========================================================== */

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { useRouter } from "next/navigation";

import {
  User,
  Users,
  MapPin,
  BriefcaseBusiness,
  PhoneCall,
  Camera,
  CheckCircle2,
  ChevronDown,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import styles from "./ProfileForm.module.css";


/* ==========================================================
   PROFILE COMPONENTS
========================================================== */

import ProgressCard from "./profile-form/ProgressCard";

import BasicInformation from "./profile-form/BasicInformation";
import PersonalInformation from "./profile-form/PersonalInformation";
import AddressInformation from "./profile-form/AddressInformation";
import ProfessionalInformation from "./profile-form/ProfessionalInformation";
import EmergencyContact from "./profile-form/EmergencyContact";
import IdentityUpload from "./profile-form/IdentityUpload";

import FormMessages from "./profile-form/FormMessages";
import SubmitButton from "./profile-form/SubmitButton";


/* ==========================================================
   PROFILE FIELDS
==========================================================

   Exactly 20 fields are counted.

   Registration information is intentionally excluded
   because these details already exist.

========================================================== */

const PROFILE_FIELDS = [
  /* Personal */

  "fatherName",
  "motherName",
  "gender",
  "dateOfBirth",

  /* Professional */

  "occupation",
  "education",
  "bloodGroup",

  /* Address */

  "state",
  "district",
  "assembly",
  "block",
  "village",
  "city",
  "pincode",
  "address",

  /* Emergency */

  "emergencyName",
  "emergencyMobile",
  "relationship",

  /* Identity */

  "photo",
  "signature",
];


/* ==========================================================
   PROFILE SECTIONS
========================================================== */

const PROFILE_SECTIONS = [
  {
    id: "basic",

    title: "Basic Information",

    description:
      "Your basic membership details",

    icon: User,

    color: "blue",
  },

  {
    id: "personal",

    title: "Personal Information",

    description:
      "Your personal and family details",

    icon: Users,

    color: "purple",
  },

  {
    id: "address",

    title: "Address Information",

    description:
      "Your residential address details",

    icon: MapPin,

    color: "orange",
  },

  {
    id: "professional",

    title: "Professional Information",

    description:
      "Your educational and professional background",

    icon: BriefcaseBusiness,

    color: "green",
  },

  {
    id: "emergency",

    title: "Emergency Contact",

    description:
      "Your emergency contact details",

    icon: PhoneCall,

    color: "red",
  },

  {
    id: "identity",

    title: "Identity Upload",

    description:
      "Your profile photograph and signature",

    icon: Camera,

    color: "indigo",
  },
];


/* ==========================================================
   COMPONENT
========================================================== */

export default function ProfileForm() {
  const router = useRouter();


  /* ========================================================
     STATE
  ======================================================== */

  const [loading, setLoading] =
    useState(false);

  const [profileLoading, setProfileLoading] =
    useState(true);

  const [success, setSuccess] =
    useState("");

  const [error, setError] =
    useState("");


  /* ========================================================
     ACCORDION

     null = all sections collapsed
  ======================================================== */

  const [openSection, setOpenSection] =
    useState(null);


  /* ========================================================
     FORM DATA
  ======================================================== */

  const [formData, setFormData] =
    useState({
      /* Registration */

      fullName: "",
      email: "",
      mobile: "",
      membershipId: "",

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


  /* ==========================================================
     LOAD MEMBER PROFILE
  ========================================================== */

  useEffect(() => {
    loadMember();
  }, []);


  async function loadMember() {
    setProfileLoading(true);

    try {
      const response =
        await fetch(
          "/api/member/profile",
          {
            method: "GET",

            credentials: "include",

            cache: "no-store",
          }
        );

      const data =
        await response.json();


      if (
        !response.ok ||
        !data.success
      ) {
        setError(
          data.message ||
            "Unable to load your profile."
        );

        return;
      }


      const member =
        data.member;


      setFormData((previous) => ({
        ...previous,

        /* Registration */

        fullName:
          member.fullName || "",

        email:
          member.email || "",

        mobile:
          member.mobile || "",

        membershipId:
          member.membershipId || "",


        /* Personal */

        fatherName:
          member.fatherName || "",

        motherName:
          member.motherName || "",

        gender:
          member.gender || "",

        dateOfBirth:
          member.dateOfBirth
            ? new Date(
                member.dateOfBirth
              )
                .toISOString()
                .substring(0, 10)
            : "",


        /* Professional */

        occupation:
          member.occupation || "",

        education:
          member.education || "",

        bloodGroup:
          member.bloodGroup || "",


        /* Address */

        country:
          member.country ||
          "India",

        state:
          member.state || "",

        district:
          member.district || "",

        assembly:
          member.assembly || "",

        block:
          member.block || "",

        village:
          member.village || "",

        city:
          member.city || "",

        pincode:
          member.pincode || "",

        address:
          member.address || "",


        /* Emergency */

        emergencyName:
          member.emergencyName || "",

        emergencyMobile:
          member.emergencyMobile || "",

        relationship:
          member.relationship || "",


        /*
          Existing Cloudinary URLs are not placed
          into these fields.

          These fields are reserved for new
          File objects selected by the user.
        */

        photo: null,

        signature: null,
      }));

    } catch (loadError) {
      console.error(
        "Load Member Profile Error:",
        loadError
      );

      setError(
        "Unable to load your profile."
      );

    } finally {
      setProfileLoading(false);
    }
  }


  /* ==========================================================
     HANDLE NORMAL INPUT
  ========================================================== */

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


  /* ==========================================================
     HANDLE FILE
  ========================================================== */

  function handleFileChange(event) {
    const {
      name,
      files,
    } = event.target;


    if (
      !files ||
      !files[0]
    ) {
      return;
    }


    const file =
      files[0];


    /* --------------------------------------------------------
       Validate image
    -------------------------------------------------------- */

    if (
      !file.type.startsWith(
        "image/"
      )
    ) {
      setError(
        "Please select a valid image file."
      );

      return;
    }


    /* --------------------------------------------------------
       Maximum 5 MB
    -------------------------------------------------------- */

    const maxSize =
      5 * 1024 * 1024;


    if (
      file.size >
      maxSize
    ) {
      setError(
        "Image size must be less than 5 MB."
      );

      return;
    }


    setError("");


    setFormData((previous) => ({
      ...previous,

      [name]: file,
    }));
  }


  /* ==========================================================
     REAL PROFILE COMPLETION
  ========================================================== */

  const completionData =
    useMemo(() => {
      const completedFields =
        PROFILE_FIELDS.filter(
          (field) => {
            const value =
              formData[field];


            return (
              value !== null &&
              value !== undefined &&
              String(value).trim() !== ""
            );
          }
        );


      const completed =
        completedFields.length;


      const total =
        PROFILE_FIELDS.length;


      const remaining =
        total - completed;


      const percentage =
        total > 0
          ? Math.round(
              (completed / total) *
                100
            )
          : 0;


      return {
        completed,
        remaining,
        total,
        percentage,
      };
    }, [formData]);


  /* ==========================================================
     SECTION COMPLETION
  ========================================================== */

  function isSectionComplete(
    sectionId
  ) {
    const sectionFields = {
      basic: [
        "fullName",
        "email",
        "mobile",
        "membershipId",
      ],

      personal: [
        "fatherName",
        "motherName",
        "gender",
        "dateOfBirth",
      ],

      address: [
        "state",
        "district",
        "assembly",
        "block",
        "village",
        "city",
        "pincode",
        "address",
      ],

      professional: [
        "occupation",
        "education",
        "bloodGroup",
      ],

      emergency: [
        "emergencyName",
        "emergencyMobile",
        "relationship",
      ],

      identity: [
        "photo",
        "signature",
      ],
    };


    const fields =
      sectionFields[
        sectionId
      ] || [];


    if (!fields.length) {
      return false;
    }


    return fields.every(
      (field) => {
        const value =
          formData[field];


        return (
          value !== null &&
          value !== undefined &&
          String(value).trim() !== ""
        );
      }
    );
  }


  /* ==========================================================
     TOGGLE ACCORDION
  ========================================================== */

  function toggleSection(
    sectionId
  ) {
    setOpenSection(
      (previous) =>
        previous === sectionId
          ? null
          : sectionId
    );
  }


  /* ==========================================================
     SUBMIT PROFILE
  ========================================================== */

  async function handleSubmit(
    event
  ) {
    event.preventDefault();


    if (loading) {
      return;
    }


    setLoading(true);

    setSuccess("");

    setError("");


    try {
      /* ======================================================
         Multipart FormData
      ====================================================== */

      const uploadData =
        new FormData();


      Object.entries(
        formData
      ).forEach(
        ([key, value]) => {
          if (
            value !== null &&
            value !== undefined &&
            value !== ""
          ) {
            uploadData.append(
              key,
              value
            );
          }
        }
      );


      /* ======================================================
         API
      ====================================================== */

      const response =
        await fetch(
          "/api/member/profile",
          {
            method: "POST",

            credentials: "include",

            body: uploadData,
          }
        );


      /* ======================================================
         Safely read response
      ====================================================== */

      const contentType =
        response.headers.get(
          "content-type"
        );


      let data = {};


      if (
        contentType &&
        contentType.includes(
          "application/json"
        )
      ) {
        data =
          await response.json();

      } else {
        const text =
          await response.text();


        console.error(
          "Non-JSON API Response:",
          text
        );


        throw new Error(
          "Server returned an invalid response."
        );
      }


      /* ======================================================
         API ERROR
      ====================================================== */

      if (
        !response.ok ||
        !data.success
      ) {
        setError(
          data.message ||
            "Unable to save profile."
        );

        return;
      }


      /* ======================================================
         SUCCESS
      ====================================================== */

      if (
        data.membershipId
      ) {
        setSuccess(
          `Profile saved successfully. Membership ID: ${data.membershipId}`
        );

      } else {
        setSuccess(
          "Profile updated successfully."
        );
      }


      /* ======================================================
         Reload
      ====================================================== */

      await loadMember();


      /* ======================================================
         Redirect
      ====================================================== */

      setTimeout(() => {
        router.push(
          "/member/dashboard"
        );

        router.refresh();
      }, 1800);

    } catch (submitError) {
      console.error(
        "Profile Submit Error:",
        submitError
      );


      setError(
        submitError.message ||
          "Unable to save profile."
      );

    } finally {
      setLoading(false);
    }
  }


  /* ==========================================================
     LOADING SCREEN
  ========================================================== */

  if (profileLoading) {
    return (
      <div
        className={
          styles.loadingContainer
        }
      >

        <div
          className={
            styles.loadingSpinner
          }
        />

        <p>
          Loading your membership
          profile...
        </p>

      </div>
    );
  }


  /* ==========================================================
     RENDER SECTION CONTENT
  ========================================================== */

  function renderSectionContent(
    sectionId
  ) {
    switch (
      sectionId
    ) {

      case "basic":
        return (
          <BasicInformation
            formData={formData}
          />
        );


      case "personal":
        return (
          <PersonalInformation
            formData={formData}
            handleChange={
              handleChange
            }
          />
        );


      case "address":
        return (
          <AddressInformation
            formData={formData}
            handleChange={
              handleChange
            }
          />
        );


      case "professional":
        return (
          <ProfessionalInformation
            formData={formData}
            handleChange={
              handleChange
            }
          />
        );


      case "emergency":
        return (
          <EmergencyContact
            formData={formData}
            handleChange={
              handleChange
            }
          />
        );


      case "identity":
        return (
          <IdentityUpload
            formData={formData}
            setFormData={
              setFormData
            }
            handleFileChange={
              handleFileChange
            }
          />
        );


      default:
        return null;
    }
  }


  /* ==========================================================
     RENDER PAGE
  ========================================================== */

  return (
    <form
      onSubmit={handleSubmit}
      className={
        styles.profilePage
      }
      noValidate
    >

      {/* ====================================================
          PAGE HERO
      ==================================================== */}

      <div
        className={
          styles.profileHero
        }
      >

        <div
          className={
            styles.heroTop
          }
        >

          <div
            className={
              styles.heroIdentity
            }
          >

            <div
              className={
                styles.heroIcon
              }
            >
              <ShieldCheck
                size={25}
              />
            </div>


            <div>
              <span
                className={
                  styles.heroEyebrow
                }
              >
                AILP MEMBER PORTAL
              </span>

              <h1>
                My Profile
              </h1>

              <p>
                Keep your membership
                information accurate,
                complete and up to date.
              </p>
            </div>

          </div>


          <div
            className={
              styles.heroMemberBadge
            }
          >

            <span>
              Membership ID
            </span>

            <strong>
              {formData.membershipId ||
                "Not Generated"}
            </strong>

          </div>

        </div>


        {/* ==================================================
            Profile Progress
        ================================================== */}

        <ProgressCard
          percentage={
            completionData.percentage
          }
          completed={
            completionData.completed
          }
          remaining={
            completionData.remaining
          }
          total={
            completionData.total
          }
        />

      </div>


      {/* ====================================================
          INTRODUCTION
      ==================================================== */}

      <div
        className={
          styles.profileIntro
        }
      >

        <div>
          <span
            className={
              styles.introBadge
            }
          >
            <Sparkles
              size={14}
            />

            PROFILE SETUP
          </span>

          <h2>
            Complete your membership profile
          </h2>

          <p>
            Review each section below and
            provide the required information.
            Completed sections are marked
            automatically.
          </p>
        </div>


        <div
          className={
            styles.introStats
          }
        >

          <div>
            <strong>
              {completionData.completed}
            </strong>

            <span>
              Completed
            </span>
          </div>


          <div>
            <strong>
              {completionData.remaining}
            </strong>

            <span>
              Remaining
            </span>
          </div>

        </div>

      </div>


      {/* ====================================================
          ACCORDION
      ==================================================== */}

      <div
        className={
          styles.accordionList
        }
      >

        {PROFILE_SECTIONS.map(
          (section) => {
            const Icon =
              section.icon;

            const isOpen =
              openSection ===
              section.id;

            const completed =
              isSectionComplete(
                section.id
              );


            return (
              <section
                key={section.id}
                className={`
                  ${styles.accordionItem}
                  ${
                    isOpen
                      ? styles.accordionItemOpen
                      : ""
                  }
                  ${
                    completed
                      ? styles.accordionItemComplete
                      : ""
                  }
                `}
              >

                {/* ==========================================
                    SECTION HEADER
                ========================================== */}

                <button
                  type="button"
                  className={
                    styles.accordionHeader
                  }
                  onClick={() =>
                    toggleSection(
                      section.id
                    )
                  }
                  aria-expanded={
                    isOpen
                  }
                >

                  <div
                    className={`
                      ${styles.sectionIcon}
                      ${
                        styles[
                          `icon${section.color}`
                        ]
                      }
                    `}
                  >
                    <Icon
                      size={22}
                    />
                  </div>


                  <div
                    className={
                      styles.sectionInfo
                    }
                  >

                    <h3>
                      {section.title}
                    </h3>

                    <p>
                      {
                        section.description
                      }
                    </p>

                  </div>


                  <div
                    className={
                      styles.sectionStatus
                    }
                  >

                    {completed ? (
                      <>
                        <span
                          className={
                            styles.completedBadge
                          }
                        >
                          <CheckCircle2
                            size={16}
                          />

                          Completed
                        </span>
                      </>
                    ) : (
                      <span
                        className={
                          styles.pendingBadge
                        }
                      >
                        <ShieldCheck
                          size={16}
                        />

                        Complete
                      </span>
                    )}

                  </div>


                  <div
                    className={`
                      ${styles.chevron}
                      ${
                        isOpen
                          ? styles.chevronOpen
                          : ""
                      }
                    `}
                  >
                    <ChevronDown
                      size={20}
                    />
                  </div>

                </button>


                {/* ==========================================
                    SECTION CONTENT
                ========================================== */}

                {isOpen && (
                  <div
                    className={
                      styles.accordionContent
                    }
                  >

                    {renderSectionContent(
                      section.id
                    )}

                  </div>
                )}

              </section>
            );
          }
        )}

      </div>


      {/* ====================================================
          MESSAGES
      ==================================================== */}

      <FormMessages
        success={success}
        error={error}
      />


      {/* ====================================================
          SAVE AREA
      ==================================================== */}

      <div
        className={
          styles.profileSaveBar
        }
      >

        <div
          className={
            styles.saveInfo
          }
        >

          <div
            className={
              styles.saveSecurityIcon
            }
          >
            <ShieldCheck
              size={19}
            />
          </div>


          <div>
            <strong>
              Your information is secure
            </strong>

            <span>
              Review your details before
              saving your profile.
            </span>
          </div>

        </div>


        <SubmitButton
          loading={loading}
        />

      </div>

    </form>
  );
}