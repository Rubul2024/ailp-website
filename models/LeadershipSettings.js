/* ==========================================================
   Leadership Page Settings Schema (Singleton)
   Hero image, National President spotlight & stats
========================================================== */
import mongoose from "mongoose";

const LeadershipSettingsSchema = new mongoose.Schema(
  {
    heroImage: { type: String, default: "" },

    presidentName: { type: String, default: "" },
    presidentDesignation: { type: String, default: "National President" },
    presidentBadge: { type: String, default: "NATIONAL PRESIDENT" },
    presidentPhoto: { type: String, default: "" },
    presidentBio1: { type: String, default: "" },
    presidentBio2: { type: String, default: "" },
    presidentQuote: { type: String, default: "" },
    presidentSignatureTitle: { type: String, default: "National President" },
    presidentSignatureOrg: { type: String, default: "All India Labour Party" },

    statPresidentCount: { type: String, default: "01" },
    statStatesRepresented: { type: String, default: "20+" },
    statDistricts: { type: String, default: "50+" },
  },
  { timestamps: true }
);

export default mongoose.models.LeadershipSettings ||
  mongoose.model("LeadershipSettings", LeadershipSettingsSchema);
