import mongoose from "mongoose";

const DonationSchema = new mongoose.Schema(
  {
    donorName: { type: String, required: true, trim: true },
    email: { type: String, trim: true, lowercase: true, default: "" },
    phone: { type: String, trim: true, default: "" },
    amount: { type: Number, required: true, min: 1 },

    member: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
      default: null,
    },

    proofImage: {
      url: { type: String, required: true },
      publicId: { type: String, default: "" },
    },

    utrNumber: { type: String, trim: true, default: "" },
    message: { type: String, trim: true, default: "" },

    status: {
      type: String,
      enum: ["pending", "verified", "rejected"],
      default: "pending",
    },

    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      default: null,
    },
    verifiedAt: { type: Date, default: null },
    rejectionReason: { type: String, default: "" },
  },
  { timestamps: true }
);

DonationSchema.index({ status: 1, createdAt: -1 });
DonationSchema.index({ member: 1 });

export default mongoose.models.Donation || mongoose.model("Donation", DonationSchema);
