/* ==========================================================
   Cloudinary Configuration
   Requires CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and
   CLOUDINARY_API_SECRET in the environment (locally in
   .env.local, in production in Vercel → Settings →
   Environment Variables).
========================================================== */

import { v2 as cloudinary } from "cloudinary";

const REQUIRED_ENV = ["CLOUDINARY_CLOUD_NAME", "CLOUDINARY_API_KEY", "CLOUDINARY_API_SECRET"];

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME?.trim(),
  api_key: process.env.CLOUDINARY_API_KEY?.trim(),
  api_secret: process.env.CLOUDINARY_API_SECRET?.trim(),
  secure: true,
});

/** Names of required Cloudinary variables that are missing or empty. */
export function missingCloudinaryEnv() {
  return REQUIRED_ENV.filter((name) => !process.env[name]?.trim());
}

/** Error thrown when uploads are attempted without credentials. */
export class StorageNotConfiguredError extends Error {
  constructor(missing) {
    super(`Cloudinary is not configured. Missing: ${missing.join(", ")}`);
    this.name = "StorageNotConfiguredError";
    this.code = "STORAGE_NOT_CONFIGURED";
    this.missing = missing;
  }
}

/** Throw a clear, loggable error before calling Cloudinary without credentials. */
export function assertCloudinaryConfigured() {
  const missing = missingCloudinaryEnv();
  if (missing.length) throw new StorageNotConfiguredError(missing);
}

export default cloudinary;
