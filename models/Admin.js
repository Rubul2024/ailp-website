/* ==========================================================
   Admin Model
   Production Ready
========================================================== */

import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    /* ==========================================
       Full Name
    ========================================== */

    name: {
      type: String,
      required: [true, "Admin name is required"],
      trim: true,
      minlength: 2,
      maxlength: 100,
    },

    /* ==========================================
       Email
    ========================================== */

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    /* ==========================================
       Password
    ========================================== */

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 8,
    },

    /* ==========================================
       Role
    ========================================== */

    role: {
      type: String,
      enum: ["super-admin", "admin"],
      default: "admin",
    },

    /* ==========================================
       Active Status
    ========================================== */

    isActive: {
      type: Boolean,
      default: true,
    },

    /* ==========================================
       Last Login
    ========================================== */

    lastLogin: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

/* ==========================================================
   Export Model
========================================================== */

const Admin =
  mongoose.models.Admin || mongoose.model("Admin", adminSchema);

export default Admin;