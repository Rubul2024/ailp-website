/* ==========================================================
   Universal Image Upload API
   Production Ready
========================================================== */

import { NextResponse } from "next/server";

import uploadImage from "@/utils/uploadImage";

/* ==========================================================
   Allowed File Types
========================================================== */

const ALLOWED_TYPES = [

  "image/jpeg",

  "image/jpg",

  "image/png",

  "image/webp",

];

/* ==========================================================
   Maximum File Size
========================================================== */

const MAX_SIZE = 2 * 1024 * 1024;

/* ==========================================================
   POST
========================================================== */

export async function POST(request) {

  try {

    const formData = await request.formData();

    const file = formData.get("file");

    const folder =

      formData.get("folder") ||

      "AILP/uploads";

    if (!file) {

      return NextResponse.json(

        {

          success: false,

          message: "No image selected.",

        },

        {

          status: 400,

        }

      );

    }

    if (!ALLOWED_TYPES.includes(file.type)) {

      return NextResponse.json(

        {

          success: false,

          message:

            "Only JPG, JPEG, PNG and WEBP images are allowed.",

        },

        {

          status: 400,

        }

      );

    }

    if (file.size > MAX_SIZE) {

      return NextResponse.json(

        {

          success: false,

          message:

            "Maximum image size is 2 MB.",

        },

        {

          status: 400,

        }

      );

    }

    /* ==========================================
       Convert File to Base64
    ========================================== */

    const bytes = await file.arrayBuffer();

    const buffer = Buffer.from(bytes);

    const base64 =

      `data:${file.type};base64,${buffer.toString("base64")}`;

    /* ==========================================
       Upload to Cloudinary
    ========================================== */

    const upload = await uploadImage({

      file: base64,

      folder,

    });

    if (!upload.success) {

      return NextResponse.json(

        upload,

        {

          status: 500,

        }

      );

    }

    return NextResponse.json({

      success: true,

      message: "Image uploaded successfully.",

      image: {

        url: upload.url,

        publicId: upload.publicId,

        width: upload.width,

        height: upload.height,

        format: upload.format,

        bytes: upload.bytes,

      },

    });

  }

  catch (error) {

    console.error("Upload API Error:", error);

    return NextResponse.json(

      {

        success: false,

        message: "Internal Server Error",

      },

      {

        status: 500,

      }

    );

  }

}