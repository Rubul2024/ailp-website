/* ==========================================================
   Get Donation Information API
========================================================== */

import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Donation from "@/models/Donation";

/* ==========================================================
   Get Donation Information
========================================================== */

export async function GET() {

  try {

    // Connect Database

    await connectDB();

    // Find Donation Record

    const donation = await Donation.findOne().lean();

    if (!donation) {

      return NextResponse.json({

        success: true,

        donation: null,

      });

    }

    return NextResponse.json({

      success: true,

      donation,

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