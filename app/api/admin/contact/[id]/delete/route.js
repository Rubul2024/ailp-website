/* ==========================================================
   Delete Contact Message API
========================================================== */

import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Contact from "@/models/Contact";

import verifyAdmin from "@/utils/verifyAdmin";

/* ==========================================================
   Delete Contact Message
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

    // Find Contact Message

    const contact = await Contact.findById(params.id);

    if (!contact) {

      return NextResponse.json(

        {

          success: false,

          message: "Contact message not found.",

        },

        {

          status: 404,

        }

      );

    }

    // Delete Contact Message

    await Contact.findByIdAndDelete(params.id);

    return NextResponse.json({

      success: true,

      message: "Contact message deleted successfully.",

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