/* ==========================================================
   View Single Contact Message API
========================================================== */

import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Contact from "@/models/Contact";

import verifyAdmin from "@/utils/verifyAdmin";

/* ==========================================================
   Get Single Contact Message
========================================================== */

export async function GET(request, { params }) {

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

    // Find Contact

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

    // Automatically mark as Read

    if (!contact.isRead) {

      contact.isRead = true;

      await contact.save();

    }

    return NextResponse.json({

      success: true,

      contact,

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