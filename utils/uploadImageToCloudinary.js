/* ==========================================================
   Upload Image To Cloudinary
   Supports:
   - Base64
   - Buffer
========================================================== */

import { Readable } from "stream";
import cloudinary from "@/lib/cloudinary";

/* ==========================================================
   Upload Helper
========================================================== */

export default async function uploadImageToCloudinary(
  image,
  folder,
  publicId
) {
  /* ==========================================
     Base64 Upload (Existing QR Code Support)
  ========================================== */

  if (typeof image === "string") {
    const result = await cloudinary.uploader.upload(image, {
      folder,
      public_id: publicId,
      overwrite: true,
    });

    return {
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format,
    };
  }

  /* ==========================================
     Buffer Upload (Profile Photo / Signature)
  ========================================== */

  if (Buffer.isBuffer(image)) {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder,
          public_id: publicId,
          overwrite: true,
          resource_type: "image",
        },
        (error, result) => {
          if (error) {
            return reject(error);
          }

          resolve({
            url: result.secure_url,
            publicId: result.public_id,
            width: result.width,
            height: result.height,
            format: result.format,
          });
        }
      );

      Readable.from(image).pipe(stream);
    });
  }

  throw new Error("Unsupported image format.");
}