/* ==========================================================
   Delete Member API
========================================================== */

import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Member from "@/models/Member";

import verifyAdmin from "@/lib/verifyAdmin";

export async function DELETE(request, { params }) {

  try {

    // Verify Admin

    const auth = verifyAdmin(request);

    if (!auth.success) {

      return NextResponse.json(
        { success: false, message: auth.message },
        {
          status: 401,
        }
      );

    }

    // Connect Database

    await connectDB();

    // Find Member

    const { id } = await params;

    const member = await Member.findById(id);

    if (!member) {

      return NextResponse.json(

        {

          success: false,

          message: "Member not found.",

        },

        {

          status: 404,

        }

      );

    }

    // Delete Member

    await Member.findByIdAndDelete(id);

    return NextResponse.json({

      success: true,

      message: "Member deleted successfully.",

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