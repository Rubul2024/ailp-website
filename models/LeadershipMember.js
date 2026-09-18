/* ==========================================================
   Leadership Team Member Schema
   Used on the Home page "Leadership" section and the
   /leadership page "National Leadership" grid
========================================================== */
import mongoose from "mongoose";

const LeadershipMemberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    designation: { type: String, default: "", trim: true },
    photo: { type: String, default: "" },
    description: { type: String, default: "" },
    profileUrl: { type: String, default: "" },
    order: { type: Number, default: 0 },

    showOnHome: { type: Boolean, default: true },
    showOnLeadershipPage: { type: Boolean, default: true },

    socials: {
      facebook: { type: String, default: "" },
      twitter: { type: String, default: "" },
      instagram: { type: String, default: "" },
      linkedin: { type: String, default: "" },
    },
  },
  { timestamps: true }
);

export default mongoose.models.LeadershipMember ||
  mongoose.model("LeadershipMember", LeadershipMemberSchema);
