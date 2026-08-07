/* ==========================================================
   Member Model
   All India Labour Party
   Production Ready
========================================================== */

import mongoose from "mongoose";

/* ==========================================================
   Member Schema
========================================================== */

const memberSchema = new mongoose.Schema(
  {
    /* ======================================================
       AUTHENTICATION
    ====================================================== */

    fullName: {
      type: String,

      required: [true, "Full Name is required"],

      trim: true,

      minlength: 3,

      maxlength: 100,
    },

    email: {
      type: String,

      required: [true, "Email is required"],

      unique: true,

      lowercase: true,

      trim: true,
    },

    mobile: {
      type: String,

      required: [true, "Mobile Number is required"],

      unique: true,

      trim: true,
    },

    password: {
      type: String,

      required: [true, "Password is required"],
    },

    lastLogin: {
      type: Date,

      default: null,
    },

    isActive: {
      type: Boolean,

      default: true,
    },

    /* ======================================================
       MEMBERSHIP
    ====================================================== */

    membershipId: {
      type: String,

      unique: true,

      default: null,
    },

    joinDate: {
      type: Date,

      default: null,
    },

    membershipStatus: {
      type: String,

      enum: ["REGISTERED", "PROFILE_COMPLETED", "CARD_GENERATED", "VERIFIED"],

      default: "REGISTERED",
    },

    profileCompleted: {
      type: Boolean,

      default: false,
    },
    profilePercentage: {
      type: Number,

      default: 0,
    },

    /* ======================================================
       PERSONAL INFORMATION
    ====================================================== */

    fatherName: {
      type: String,

      default: "",

      trim: true,
    },

    motherName: {
      type: String,

      default: "",

      trim: true,
    },

    gender: {
      type: String,

      enum: ["", "Male", "Female", "Other"],

      default: "",
    },

    dateOfBirth: {
      type: Date,

      default: null,
    },

    maritalStatus: {
      type: String,

      default: "",
    },

    occupation: {
      type: String,

      default: "",
    },

    education: {
      type: String,

      default: "",
    },

    bloodGroup: {
      type: String,

      default: "",
    },

    /* ======================================================
       ADDRESS
    ====================================================== */

    country: {
      type: String,

      default: "India",
    },

    state: {
      type: String,

      default: "",
    },

    district: {
      type: String,

      default: "",
    },

    assembly: {
      type: String,

      default: "",
    },

    block: {
      type: String,

      default: "",
    },

    village: {
      type: String,

      default: "",
    },

    city: {
      type: String,

      default: "",
    },

    pincode: {
      type: String,

      default: "",
    },

    address: {
      type: String,

      default: "",
    },

    /* ======================================================
       IDENTITY
    ====================================================== */

    photo: {
      url: {
        type: String,

        default: "",
      },

      publicId: {
        type: String,

        default: "",
      },

      width: {
        type: Number,

        default: 0,
      },

      height: {
        type: Number,

        default: 0,
      },

      format: {
        type: String,

        default: "",
      },
    },

    signature: {
      url: {
        type: String,

        default: "",
      },

      publicId: {
        type: String,

        default: "",
      },

      width: {
        type: Number,

        default: 0,
      },

      height: {
        type: Number,

        default: 0,
      },

      format: {
        type: String,

        default: "",
      },
    },

    /* ======================================================
       EMERGENCY CONTACT
    ====================================================== */

    emergencyName: {
      type: String,

      default: "",
    },

    emergencyMobile: {
      type: String,

      default: "",
    },

    relationship: {
      type: String,

      default: "",
    },

    /* ======================================================
       MEMBERSHIP CARD
    ====================================================== */

    cardGenerated: {
      type: Boolean,

      default: false,
    },

    cardUrl: {
      type: String,

      default: "",
    },

    qrCode: {
      type: String,

      default: "",
    },

    cardGeneratedAt: {
      type: Date,

      default: null,
    },

    /* ======================================================
       DONATION SUMMARY
    ====================================================== */

    totalDonation: {
      type: Number,

      default: 0,
    },

    donationCount: {
      type: Number,

      default: 0,
    },

    lastDonation: {
      type: Date,

      default: null,
    },
    highestDonation: {
      type: Number,

      default: 0,
    },
    /* ======================================================
       ADMIN VERIFICATION
    ====================================================== */

    verified: {
      type: Boolean,

      default: false,
    },

    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "Admin",

      default: null,
    },

    verifiedDate: {
      type: Date,

      default: null,
    },
  },

  {
    timestamps: true,
  },
);

/* ==========================================================
   Indexes
========================================================== */

memberSchema.index({
  state: 1,

  district: 1,
});

memberSchema.index({
  membershipStatus: 1,
});

/* ==========================================================
   Export Model
========================================================== */

const Member =
  mongoose.models.Member ||
  mongoose.model(
    "Member",

    memberSchema,
  );

export default Member;
