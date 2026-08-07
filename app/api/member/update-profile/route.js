/* ==========================================================
   Update Member Profile API
========================================================== */

import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Member from "@/models/Member";

import verifyMember from "@/utils/verifyMember";

export async function PUT(request) {

  try {

    // Check Member Login

    const auth = verifyMember(request);

    if (!auth.success) {

      return NextResponse.json(
        auth,
        {
          status: 401,
        }
      );

    }

    // Connect MongoDB

    await connectDB();

    // Read Data From Frontend

    const {

      mobile,

      address,

      villageCity,

      district,

      state,

      pincode,

      occupation,

    } = await request.json();

    // Find Logged-in Member

    const member = await Member.findById(auth.memberId);

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

    // Update Fields

    member.mobile = mobile;
    member.address = address;
    member.villageCity = villageCity;
    member.district = district;
    member.state = state;
    member.pincode = pincode;
    member.occupation = occupation;

    // Save

    await member.save();

    return NextResponse.json({

      success: true,

      message: "Profile Updated Successfully.",

      member,

    });

  } catch (error) {

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