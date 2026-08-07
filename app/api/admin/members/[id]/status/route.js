/* ==========================================================
   Update Member Status API
========================================================== */

import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Member from "@/models/Member";

import verifyAdmin from "@/utils/verifyAdmin";

export async function PUT(request, { params }) {

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

    // Read Request

    const { status } = await request.json();

    // Allowed Status Values

    const allowedStatus = [

      "Active",

      "Inactive",

      "Suspended",

    ];

    if (!allowedStatus.includes(status)) {

      return NextResponse.json(

        {

          success: false,

          message: "Invalid member status.",

        },

        {

          status: 400,

        }

      );

    }

    // Find Member

    const member = await Member.findById(params.id);

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

    // Update Status

    member.status = status;

    await member.save();

    return NextResponse.json({

      success: true,

      message: "Member status updated successfully.",

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