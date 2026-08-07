import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Member from "@/models/Member";
import verifyMember from "@/utils/verifyMember";

export async function GET(request) {
  try {
    await connectDB();

    const auth = verifyMember(request);

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

    console.log("Authenticated Member ID:", auth.memberId);

    const member = await Member.findById(auth.memberId).select({
      fullName: 1,
      email: 1,
      mobile: 1,
      membershipId: 1,
      membershipStatus: 1,
      profileCompleted: 1,
      joinDate: 1,
      photo: 1,
      state: 1,
      district: 1,
      _id: 0,
    });

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
  } catch (error) {
    console.error("========== MEMBER API ERROR ==========");
    console.error(error);
    console.error("Name:", error.name);
    console.error("Message:", error.message);
    console.error("Stack:", error.stack);

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}