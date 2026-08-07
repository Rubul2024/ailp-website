/* ==========================================================
   Upload Base64 Image To Cloudinary
========================================================== */

import cloudinary from "@/lib/cloudinary";

export default async function uploadImageToCloudinary(
  image,
  folder,
  publicId
) {
  const result = await cloudinary.uploader.upload(image, {
    folder,
    public_id: publicId,
    overwrite: true,
  });

  return result.secure_url;
}