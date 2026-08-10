/* ==========================================================
   AILP Contact Model
   All India Labour Party
========================================================== */

import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 150,
    },

    phone: {
      type: String,
      trim: true,
      maxlength: 20,
      default: "",
    },

    subject: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },

    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 3000,
    },

    status: {
      type: String,

      enum: [
        "NEW",
        "READ",
        "REPLIED",
        "CLOSED",
      ],

      default: "NEW",
      index: true,
    },
  },

  {
    timestamps: true,
  }
);

export default
  mongoose.models.Contact ||
  mongoose.model("Contact", ContactSchema);