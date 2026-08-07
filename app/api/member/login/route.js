import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import connectDB from "@/lib/mongodb";
import Member from "@/models/Member";

export async function POST(request) {
  try {
    await connectDB();

    const { email, password } = await request.json();

    // Find Member

    const member = await Member.findOne({
      email: email.toLowerCase(),
    });

    if (!member) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password.",
        },
        {
          status: 401,
        },
      );
    }

    // Compare Password

    const isMatch = await bcrypt.compare(password, member.password);

    if (!isMatch) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password.",
        },
        {
          status: 401,
        },
      );
    }

    // Generate JWT

    const token = jwt.sign(
      {
        memberId: member._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    // Response

    const response = NextResponse.json({
      success: true,
      message: "Login Successful",
    });

    // Cookie

    response.cookies.set("memberToken", token, {
      httpOnly: true,

      secure: process.env.NODE_ENV === "production",

      sameSite: "strict",

      maxAge: 60 * 60 * 24 * 7,

      path: "/",
    });

    return response;
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Server Error",
      },
      {
        status: 500,
      },
    );
  }
}
