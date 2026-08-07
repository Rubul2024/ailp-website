/* ==========================================================
   Upload PDF To Cloudinary
========================================================== */

import cloudinary from "@/lib/cloudinary";

export default async function uploadPdfToCloudinary(
  pdfBuffer,
  publicId
) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: "ailp/cards",

          public_id: publicId,

          resource_type: "raw",

          overwrite: true,
        },

        (error, result) => {
          if (error) return reject(error);

          resolve(result.secure_url);
        }
      )
      .end(pdfBuffer);
  });
}