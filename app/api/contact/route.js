/* ==========================================================
   AILP Contact API
   POST /api/contact
========================================================== */

import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";

import Contact from "@/models/Contact";

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      name,
      email,
      phone,
      subject,
      message,
      website,
    } = body;

    /* ==========================================
       Honeypot Spam Protection
    ========================================== */

    if (website) {
      return NextResponse.json(
        {
          success: true,
          message: "Message submitted successfully.",
        },
        {
          status: 200,
        }
      );
    }

    /* ==========================================
       Required Fields
    ========================================== */

    if (
      !name ||
      !email ||
      !subject ||
      !message
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please fill in all required fields.",
        },
        {
          status: 400,
        }
      );
    }

    /* ==========================================
       Basic Email Validation
    ========================================== */

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please enter a valid email address.",
        },
        {
          status: 400,
        }
      );
    }

    /* ==========================================
       Length Validation
    ========================================== */

    if (name.trim().length < 2) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please enter your full name.",
        },
        {
          status: 400,
        }
      );
    }

    if (message.trim().length < 10) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please provide a little more detail in your message.",
        },
        {
          status: 400,
        }
      );
    }

    /* ==========================================
       Connect MongoDB
    ========================================== */

    await connectDB();

    /* ==========================================
       Save Contact
    ========================================== */

    const contact = await Contact.create({
      name: name.trim(),

      email: email.trim().toLowerCase(),

      phone: phone?.trim() || "",

      subject: subject.trim(),

      message: message.trim(),
    });

    return NextResponse.json(
      {
        success: true,

        message:
          "Your message has been submitted successfully.",

        contactId: contact._id,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "CONTACT_API_ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,

        message:
          "Unable to submit your message right now. Please try again later.",
      },
      {
        status: 500,
      }
    );
  }
}