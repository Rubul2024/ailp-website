/* ==========================================================
   Admin - View All Members API
========================================================== */

import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import verifyAdmin from "@/lib/verifyAdmin";

import Member from "@/models/Member";

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

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;
    const search = searchParams.get("search") || "";

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
              membershipId: {
                $regex: search,
                $options: "i",
              },
            },
          ],
        }
      : {};

    // Query Database
    const [members, totalMembers] = await Promise.all([
      Member.find(filter)
        .select("-password")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),

      Member.countDocuments(filter),
    ]);

    return NextResponse.json({
      success: true,

      currentPage: page,

      totalPages: Math.ceil(totalMembers / limit),

      totalMembers,

      members,
    });
  } catch (error) {
    console.error("Members API Error:", error);

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