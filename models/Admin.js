/* ==========================================================
   Admin Model
   All India Labour Party
   Production Ready
========================================================== */

import mongoose from "mongoose";

/* ==========================================================
   Admin Schema
========================================================== */

const adminSchema = new mongoose.Schema(
  {
    /* ======================================================
       Full Name
    ====================================================== */

    name: {
      type: String,
      required: [true, "Admin name is required"],
      trim: true,
      minlength: 2,
      maxlength: 100,
    },

    /* ======================================================
       Email
    ====================================================== */

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    /* ======================================================
       Password
    ====================================================== */

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 8,

      // Never return password unless explicitly requested
      select: false,
    },

    /* ======================================================
       Mobile
    ====================================================== */

    mobile: {
      type: String,
      default: "",
      trim: true,
    },

    /* ======================================================
       Profile Photo
    ====================================================== */

    avatar: {
      type: String,
      default: "",
    },

    /* ======================================================
       Role
    ====================================================== */

    role: {
      type: String,
      enum: [
        "super-admin",
        "admin",
      ],
      default: "admin",
    },

    /* ======================================================
       Account Status
    ====================================================== */

    isActive: {
      type: Boolean,
      default: true,
    },

    /* ======================================================
       Last Login
    ====================================================== */

    lastLogin: {
      type: Date,
      default: null,
    },

    /* ======================================================
       Login Count
    ====================================================== */

    loginCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

/* ==========================================================
   Indexes
========================================================== */

adminSchema.index({
  email: 1,
});

adminSchema.index({
  role: 1,
});

adminSchema.index({
  isActive: 1,
});

/* ==========================================================
   Export Model
========================================================== */

const Admin =
  mongoose.models.Admin ||
  mongoose.model(
    "Admin",
    adminSchema
  );

export default Admin;