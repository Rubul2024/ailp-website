/* ==========================================================
   Delete Newsletter Subscriber API
========================================================== */

import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Newsletter from "@/models/Newsletter";

import verifyAdmin from "@/utils/verifyAdmin";

/* ==========================================================
   Delete Subscriber
========================================================== */

export async function DELETE(request, { params }) {

  try {

    // Verify Admin

    const auth = verifyAdmin(request);

    if (!auth.success) {

      return NextResponse.json(
        auth,
        {
          status: 401,
        }
      );

    }

    // Connect Database

    await connectDB();

    // Find Subscriber

    const subscriber = await Newsletter.findById(params.id);

    if (!subscriber) {

      return NextResponse.json(

        {

          success: false,

          message: "Subscriber not found.",

        },

        {

          status: 404,

        }

      );

    }

    // Delete Subscriber

    await Newsletter.findByIdAndDelete(params.id);

    return NextResponse.json({

      success: true,

      message: "Subscriber deleted successfully.",

    });

  }

  catch (error) {

    console.error(error);

    return NextResponse.json(

      {

        success: false,

        message: "Server Error",

      },

      {

        status: 500,

      }

    );

  }

}
