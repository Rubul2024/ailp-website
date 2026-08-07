/* ==========================================================
   Delete Image API
   Production Ready
========================================================== */

import { NextResponse } from "next/server";

import cloudinary from "@/lib/cloudinary";

/* ==========================================================
   POST
========================================================== */

export async function POST(request) {
  try {
    const { publicId } = await request.json();

    if (!publicId) {
      return NextResponse.json(
        {
          success: false,

          message: "Image ID is required.",
        },

        {
          status: 400,
        },
      );
    }

    const result = await cloudinary.uploader.destroy(
      publicId,

      {
        resource_type: "image",
      },
    );

    if (result.result !== "ok" && result.result !== "not found") {
      return NextResponse.json(
        {
          success: false,

          message: "Unable to delete image.",
        },

        {
          status: 500,
        },
      );
    }

    return NextResponse.json({
      success: true,

      message: "Image deleted successfully.",
    });
  } catch (error) {
    console.error(
      "Delete Image Error:",

      error,
    );

    return NextResponse.json(
      {
        success: false,

        message: "Internal Server Error",
      },

      {
        status: 500,
      },
    );
  }
}
