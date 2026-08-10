/* ==========================================================
   Donation Model
   All India Labour Party
   Production Ready
========================================================== */

import mongoose from "mongoose";

/* ==========================================================
   Donation Schema
========================================================== */

const donationSchema = new mongoose.Schema(
  {
    /* ======================================================
       Donor Information
    ====================================================== */

    fullName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 150,
    },

    mobile: {
      type: String,
      required: true,
      trim: true,
      maxlength: 20,
    },

    address: {
      type: String,
      trim: true,
      maxlength: 300,
      default: "",
    },

    /*
      PAN is optional.

      Keep this field server-side and do not expose
      it unnecessarily in public APIs.
    */

    pan: {
      type: String,
      trim: true,
      uppercase: true,
      maxlength: 20,
      default: "",
    },

    /* ======================================================
       Donation Amount
    ====================================================== */

    amount: {
      type: Number,
      required: true,
      min: 1,
    },

    currency: {
      type: String,
      default: "INR",
      uppercase: true,
    },

    /* ======================================================
       Payment Information
    ====================================================== */

    paymentProvider: {
      type: String,
      default: "razorpay",
    },

    paymentMethod: {
      type: String,
      default: "",
    },

    razorpayOrderId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    razorpayPaymentId: {
      type: String,
      default: "",
      index: true,
    },

    razorpaySignature: {
      type: String,
      default: "",
    },

    /* ======================================================
       Payment Status
    ====================================================== */

    status: {
      type: String,

      enum: [
        "PENDING",
        "AUTHORIZED",
        "CAPTURED",
        "FAILED",
        "REFUNDED",
        "CANCELLED",
      ],

      default: "PENDING",

      index: true,
    },

    /* ======================================================
       Failure Information
    ====================================================== */

    failureReason: {
      type: String,
      default: "",
    },

    failureCode: {
      type: String,
      default: "",
    },

    /* ======================================================
       Transaction Information
    ====================================================== */

    transactionId: {
      type: String,
      default: "",
      index: true,
    },

    bankTransactionId: {
      type: String,
      default: "",
    },

    /* ======================================================
       Source
    ====================================================== */

    source: {
      type: String,
      enum: [
        "ONLINE",
        "UPI",
        "BANK_TRANSFER",
      ],
      default: "ONLINE",
    },

    /* ======================================================
       Webhook
    ====================================================== */

    webhookProcessed: {
      type: Boolean,
      default: false,
    },

    lastWebhookEvent: {
      type: String,
      default: "",
    },

    /* ======================================================
       Receipt
    ====================================================== */

    receiptNumber: {
      type: String,
      unique: true,
      sparse: true,
      index: true,
    },

    /* ======================================================
       Notes
    ====================================================== */

    notes: {
      type: String,
      default: "",
      maxlength: 500,
    },
  },

  {
    timestamps: true,
  }
);

/* ==========================================================
   Prevent Model Re-Compilation
========================================================== */

const Donation =
  mongoose.models.Donation ||
  mongoose.model("Donation", donationSchema);

export default Donation;