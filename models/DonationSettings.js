import mongoose from "mongoose";

const DonationSettingsSchema = new mongoose.Schema(
  {
    bankName: { type: String, default: "" },
    accountHolder: { type: String, default: "" },
    accountNumber: { type: String, default: "" },
    ifscCode: { type: String, default: "" },
    branch: { type: String, default: "" },
    upiId: { type: String, default: "" },
    qrCode: { type: String, default: "" },
    donationMessage: { type: String, default: "" },
    donationEnabled: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.DonationSettings ||
  mongoose.model("DonationSettings", DonationSettingsSchema);
