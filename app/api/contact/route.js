/* ==========================================================
   Contact Form API
========================================================== */

import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Contact from "@/models/Contact";

export async function POST(request) {

  try {

    // Connect Database

    await connectDB();

    // Read Request

    const {

      fullName,

      email,

      mobile,

      subject,

      message,

    } = await request.json();

    // Validation

    if (

      !fullName ||

      !email ||

      !mobile ||

      !subject ||

      !message

    ) {

      return NextResponse.json(

        {

          success: false,

          message: "All fields are required.",

        },

        {

          status: 400,

        }

      );

    }

    // Save Contact

    const contact = await Contact.create({

      fullName,

      email,

      mobile,

      subject,

      message,

    });

    return NextResponse.json(

      {

        success: true,

        message: "Your message has been sent successfully.",

        contact,

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