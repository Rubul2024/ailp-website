/* ==========================================================
   Member Registration API
   Backend Module 3 - Lesson 3B
========================================================== */
import generateMemberId from "@/utils/generateMemberId";
import { NextResponse } from "next/server";

import generateQRCode from "@/utils/generateQRCode";
import uploadImageToCloudinary from "@/utils/uploadImageToCloudinary";
import generateMembershipCard from "@/utils/generateMembershipCard";
import uploadPdfToCloudinary from "@/utils/uploadPdfToCloudinary";
import bcrypt from "bcryptjs";

import connectDB from "@/lib/mongodb";
import Member from "@/models/Member";

export async function POST(request) {
  try {
    /* ==========================================
       Connect Database
    ========================================== */

    await connectDB();

    /* ==========================================
       Read Request Body
    ========================================== */

    const data = await request.json();

    const {
      fullName,
      fatherName,
      gender,
      dateOfBirth,
      mobile,
      email,
      password,
      photo,
      address,
      villageCity,
      district,
      state,
      pincode,
      occupation,
    } = data;

    /* ==========================================
       Required Validation
    ========================================== */
if (
  !fullName ||
  !email ||
  !mobile ||
  !password
) {
  return NextResponse.json(
    {
      success: false,
      message: "Please fill all required fields.",
    },
    {
      status: 400,
    }
  );
}

    /* ==========================================
       Check Duplicate Mobile
    ========================================== */

    const existingMember = await Member.findOne({
      email: email.toLowerCase(),
    });

    if (existingMember) {
      return Response.json(
        {
          success: false,
          message: "Email is already registered.",
        },
        {
          status: 409,
        },
      );
    }

    /* ==========================================
       Generate Membership ID
    ========================================== */

    const memberId = await generateMemberId();

    const qrImage = await generateQRCode(memberId);

    const qrCode = await uploadImageToCloudinary(
      qrImage,
      "ailp/qrcodes",
      memberId,
    );

    const pdfBuffer = await generateMembershipCard({
      memberId,

      fullName,

      mobile,

      district,

      state,
    });

    const cardPdf = await uploadPdfToCloudinary(
      pdfBuffer,

      memberId,
    );

    /* ==========================================
       Create Member
    ========================================== */
const hashedPassword = await bcrypt.hash(password, 10);
   const member = await Member.create({
  membershipId: memberId,

  fullName,

  email: email.toLowerCase(),

  mobile,

  password: hashedPassword,

  membershipStatus: "REGISTERED",

  profileCompleted: false,

  joinDate: new Date(),
});
   

    /* ==========================================
       Success Response
    ========================================== */

    return NextResponse.json(
      {
        success: true,
        message: "Membership application submitted successfully.",
        member: {
          memberId: member.memberId,
          fullName: member.fullName,
          status: member.status,
        },
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      {
        status: 500,
      },
    );
  }
}
