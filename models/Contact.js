/* ==========================================================
   Contact Model
========================================================== */

import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(

  {

    fullName: {

      type: String,

      required: true,

      trim: true,

    },

    email: {

      type: String,

      required: true,

      trim: true,

      lowercase: true,

    },

    mobile: {

      type: String,

      required: true,

      trim: true,

    },

    subject: {

      type: String,

      required: true,

      trim: true,

    },

    message: {

      type: String,

      required: true,

      trim: true,

    },

    isRead: {

      type: Boolean,

      default: false,

    },

  },

  {

    timestamps: true,

  }

);

const Contact =

  mongoose.models.Contact ||

  mongoose.model(

    "Contact",

    contactSchema

  );

export default Contact;