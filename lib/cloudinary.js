/* ==========================================================
   Cloudinary Configuration

   Provide credentials in ONE of two ways (locally in .env.local,
   in production in Vercel → Settings → Environment Variables):

   1. CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET
   2. CLOUDINARY_URL=cloudinary://<api_key>:<api_secret>@<cloud_name>

   Separate variables take precedence over CLOUDINARY_URL.
========================================================== */

import { v2 as cloudinary } from "cloudinary";

const REQUIRED_ENV = ["CLOUDINARY_CLOUD_NAME", "CLOUDINARY_API_KEY", "CLOUDINARY_API_SECRET"];

function parseCloudinaryUrl(value) {
  if (!value) return {};
  try {
    const url = new URL(value.trim());
    if (url.protocol !== "cloudinary:") return {};
    return {
      cloud_name: url.hostname,
      api_key: decodeURIComponent(url.username),
      api_secret: decodeURIComponent(url.password),
    };
  } catch {
    return {};
  }
}

function resolveCredentials() {
  const fromUrl = parseCloudinaryUrl(process.env.CLOUDINARY_URL);
  return {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME?.trim() || fromUrl.cloud_name || "",
    api_key: process.env.CLOUDINARY_API_KEY?.trim() || fromUrl.api_key || "",
    api_secret: process.env.CLOUDINARY_API_SECRET?.trim() || fromUrl.api_secret || "",
  };
}

const credentials = resolveCredentials();

cloudinary.config({ ...credentials, secure: true });

/** Names of required Cloudinary settings that are missing (from either source). */
export function missingCloudinaryEnv() {
  const { cloud_name, api_key, api_secret } = credentials;
  return REQUIRED_ENV.filter((_, i) => ![cloud_name, api_key, api_secret][i]);
}

/** Error thrown when uploads are attempted without credentials. */
export class StorageNotConfiguredError extends Error {
  constructor(missing) {
    super(
      `Cloudinary is not configured. Missing: ${missing.join(", ")} (or set CLOUDINARY_URL).`
    );
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
