/* ==========================================================
   Admin Contact Messages API
========================================================== */

import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import verifyAdmin from "@/lib/verifyAdmin";

import Contact from "@/models/Contact";

/* ==========================================================
   GET All Contact Messages
========================================================== */

export async function GET(request) {
  try {
    // Verify Admin
    const auth = verifyAdmin(request);

    if (!auth.success) {
      return NextResponse.json(
        {
          success: false,
          message: auth.message,
        },
        {
          status: 401,
        }
      );
    }

    // Connect Database
    await connectDB();

    // URL Parameters
    const { searchParams } = new URL(request.url);

    const search = searchParams.get("search") || "";
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;

    const skip = (page - 1) * limit;

    // Search Filter
    const filter = search
      ? {
          $or: [
            {
              fullName: {
                $regex: search,
                $options: "i",
              },
            },
            {
              email: {
                $regex: search,
                $options: "i",
              },
            },
            {
              mobile: {
                $regex: search,
                $options: "i",
              },
            },
            {
              subject: {
                $regex: search,
                $options: "i",
              },
            },
          ],
        }
      : {};

    // Query Database
    const [contacts, total] = await Promise.all([
      Contact.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),

      Contact.countDocuments(filter),
    ]);

    return NextResponse.json({
      success: true,

      currentPage: page,

      totalPages: Math.ceil(total / limit),

      totalMessages: total,

      contacts,
    });
  } catch (error) {
    console.error("Contact API Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}