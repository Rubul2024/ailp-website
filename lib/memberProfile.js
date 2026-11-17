/* ==========================================================
   Member Profile — shared rules
   Used by both the member portal UI and the member APIs so
   "what the ID card needs" is defined in exactly one place.
========================================================== */

/* Fields printed on the ID card that the member must supply. */
export const CARD_REQUIRED_FIELDS = [
  { key: "photo", label: "Profile photo" },
  { key: "fullName", label: "Full name" },
  { key: "mobile", label: "Mobile number" },
  { key: "gender", label: "Gender" },
  { key: "dateOfBirth", label: "Date of birth" },
  { key: "state", label: "State" },
  { key: "district", label: "District" },
];

/* Editable profile fields (everything the simplified form sends). */
export const PROFILE_EDITABLE_FIELDS = [
  "fullName",
  "mobile",
  "gender",
  "dateOfBirth",
  "bloodGroup",
  "state",
  "district",
  "assembly",
  "village",
  "pincode",
  "address",
];

export const GENDER_OPTIONS = ["Male", "Female", "Other"];

export const BLOOD_GROUP_OPTIONS = [
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
];

export const INDIAN_STATES = [
  "Andaman and Nicobar Islands",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chandigarh",
  "Chhattisgarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Ladakh",
  "Lakshadweep",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Puducherry",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

/* ==========================================================
   Helpers
========================================================== */

export function getPhotoUrl(photo) {
  if (!photo) return "";
  if (typeof photo === "string") return photo;
  return photo.url || "";
}

function hasValue(member, key) {
  if (!member) return false;
  if (key === "photo") return Boolean(getPhotoUrl(member.photo));
  const value = member[key];
  return value !== null && value !== undefined && String(value).trim() !== "";
}

/**
 * How ready a member is to generate their ID card.
 * @returns {{ ready: boolean, percent: number, missing: {key:string,label:string}[], done: number, total: number }}
 */
export function getCardReadiness(member) {
  const missing = CARD_REQUIRED_FIELDS.filter((f) => !hasValue(member, f.key));
  const total = CARD_REQUIRED_FIELDS.length;
  const done = total - missing.length;

  return {
    ready: missing.length === 0,
    percent: Math.round((done / total) * 100),
    missing,
    done,
    total,
  };
}

export function getInitials(name) {
  return (
    String(name || "")
      .split(" ")
      .filter(Boolean)
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "M"
  );
}

export function formatDate(date) {
  if (!date) return "—";
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return "—";
  return parsed.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function calculateAge(dateOfBirth) {
  if (!dateOfBirth) return null;
  const dob = new Date(dateOfBirth);
  if (Number.isNaN(dob.getTime())) return null;
  return Math.floor((Date.now() - dob.getTime()) / (1000 * 60 * 60 * 24 * 365.25));
}

export const STATUS_LABELS = {
  REGISTERED: "Registered",
  PROFILE_COMPLETED: "Profile complete",
  CARD_GENERATED: "ID card issued",
  VERIFIED: "Verified",
};
