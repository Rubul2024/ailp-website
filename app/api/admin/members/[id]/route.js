/* ==========================================================
   View Single Member API
========================================================== */

import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Member from "@/models/Member";

import verifyAdmin from "@/utils/verifyAdmin";

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

    // Find Member

    const member = await Member.findById(params.id)

      .select("-password");

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

    return NextResponse.json({

      success: true,

      member,

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