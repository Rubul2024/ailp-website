/* ==========================================================
   Newsletter Subscriber Schema
========================================================== */
import mongoose from "mongoose";

const NewsletterSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    status: {
      type: String,
      enum: ["Active", "Unsubscribed"],
      default: "Active",
    },
    source: {
      type: String,
      default: "Website Footer",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Newsletter ||
  mongoose.model("Newsletter", NewsletterSchema);