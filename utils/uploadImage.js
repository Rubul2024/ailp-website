/* ==========================================================
   Upload Image Utility
   Production Ready
========================================================== */

import cloudinary from "@/lib/cloudinary";

/* ==========================================================
   Upload Image
========================================================== */

export default async function uploadImage({

  file,

  folder = "AILP",

  publicId = null,

}) {

  try {

    const options = {

      folder,

      resource_type: "image",

      overwrite: true,

      invalidate: true,

      quality: "auto",

      fetch_format: "auto",

    };

    // Reuse existing public ID when replacing an image
    if (publicId) {

      options.public_id = publicId;

    }

    const result = await cloudinary.uploader.upload(

      file,

      options

    );

    return {

      success: true,

      url: result.secure_url,

      publicId: result.public_id,

      width: result.width,

      height: result.height,

      format: result.format,

      bytes: result.bytes,

    };

  }

  catch (error) {

    console.error("Cloudinary Upload Error:", error);

    return {

      success: false,

      message: "Unable to upload image.",

      error: error.message,

    };

  }

}