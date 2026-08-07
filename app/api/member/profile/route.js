/* ==========================================================
   Member Profile API
   Production Ready
========================================================== */

import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";

import Member from "@/models/Member";

import verifyMember from "@/utils/verifyMember";

import generateMembershipId from "@/utils/generateMembershipId";

export async function POST(request) {
  try {
    /* ==========================================
       Connect Database
    ========================================== */

    await connectDB();

    /* ==========================================
       Verify Logged In Member
    ========================================== */

    const auth = verifyMember(request);

    if (!auth.success) {
      return NextResponse.json(
        {
          success: false,
          message: auth.message,
        },
        {
          status: 401,
        },
      );
    }

    /* ==========================================
       Read Request
    ========================================== */

    const body = await request.json();

    /* ==========================================
       Find Member
    ========================================== */

    const member = await Member.findById(auth.memberId);

    if (!member) {
      return NextResponse.json(
        {
          success: false,
          message: "Member not found.",
        },
        {
          status: 404,
        },
      );
    }

    /* ==========================================
       Personal Information
    ========================================== */

    member.fullName = body.fullName;
    member.fatherName = body.fatherName;
    member.motherName = body.motherName;
    member.gender = body.gender;
    member.dateOfBirth = body.dateOfBirth;
    member.mobile = body.mobile;

    /* ==========================================
       Address
    ========================================== */

    member.country = body.country;
    member.state = body.state;
    member.district = body.district;
    member.assembly = body.assembly;
    member.block = body.block;
    member.village = body.village;
    member.city = body.city;
    member.pincode = body.pincode;
    member.address = body.address;

    /* ==========================================
       Professional
    ========================================== */

    member.occupation = body.occupation;
    member.education = body.education;
    member.bloodGroup = body.bloodGroup;

    /* ==========================================
       Emergency Contact
    ========================================== */

    member.emergencyName = body.emergencyName;
    member.relationship = body.relationship;
    member.emergencyMobile = body.emergencyMobile;

    /* ==========================================
       Generate Membership Details
    ========================================== */

    if (!member.membershipId) {
      member.membershipId = await generateMembershipId();

      member.membershipStatus = "ACTIVE";

      member.profileCompleted = true;

      member.joiningDate = new Date();
    }

    /* ==========================================
       Save
    ========================================== */

    await member.save();

    /* ==========================================
       Response
    ========================================== */

    return NextResponse.json({
      success: true,

      message: "Profile updated successfully.",

      membershipId: member.membershipId,
    });
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
