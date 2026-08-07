/* ==========================================================
   Donation Model
========================================================== */

import mongoose from "mongoose";

const donationSchema = new mongoose.Schema(

  {

    bankName: {

      type: String,

      required: true,

      trim: true,

    },

    accountHolder: {

      type: String,

      required: true,

      trim: true,

    },

    accountNumber: {

      type: String,

      required: true,

      trim: true,

    },

    ifscCode: {

      type: String,

      required: true,

      trim: true,

      uppercase: true,

    },

    branch: {

      type: String,

      default: "",

      trim: true,

    },

    upiId: {

      type: String,

      default: "",

      trim: true,

      lowercase: true,

    },

    qrCode: {

      type: String,

      default: "",

    },

    donationMessage: {

      type: String,

      default: "",

      trim: true,

    },

    donationEnabled: {

      type: Boolean,

      default: true,

    },

  },

  {

    timestamps: true,

  }

);

const Donation =

  mongoose.models.Donation ||

  mongoose.model(

    "Donation",

    donationSchema

  );

export default Donation;