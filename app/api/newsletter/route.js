/* ==========================================================
   Newsletter Subscribe API
========================================================== */

import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Newsletter from "@/models/Newsletter";

export async function POST(request) {

  try {

    // Connect Database

    await connectDB();

    // Read Request

    const { email } = await request.json();

    // Validate Email

    if (!email) {

      return NextResponse.json(

        {

          success: false,

          message: "Email is required.",

        },

        {

          status: 400,

        }

      );

    }

    // Convert to Lowercase

    const normalizedEmail = email.trim().toLowerCase();

    // Check Existing Subscriber

    const existingSubscriber = await Newsletter.findOne({

      email: normalizedEmail,

    });

    if (existingSubscriber) {

      return NextResponse.json(

        {

          success: false,

          message: "This email is already subscribed.",

        },

        {

          status: 409,

        }

      );

    }

    // Save Subscriber

    const subscriber = await Newsletter.create({

      email: normalizedEmail,

    });

    return NextResponse.json(

      {

        success: true,

        message: "Thank you for subscribing!",

        subscriber,

      },

      {

        status: 201,

      }

    );

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