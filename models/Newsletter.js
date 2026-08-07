/* ==========================================================
   Newsletter Model
========================================================== */

import mongoose from "mongoose";

const newsletterSchema = new mongoose.Schema(

  {

    email: {

      type: String,

      required: true,

      unique: true,

      trim: true,

      lowercase: true,

    },

    isSubscribed: {

      type: Boolean,

      default: true,

    },

  },

  {

    timestamps: true,

  }

);

const Newsletter =

  mongoose.models.Newsletter ||

  mongoose.model(

    "Newsletter",

    newsletterSchema

  );

export default Newsletter;