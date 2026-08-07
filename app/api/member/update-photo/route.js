/* ==========================================================
   Update Member Profile Photo
========================================================== */

import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";

import Member from "@/models/Member";

import verifyMember from "@/utils/verifyMember";

import uploadImageToCloudinary from "@/utils/uploadImageToCloudinary";

export async function PUT(request) {

  try {

    // Verify Login

    const auth = verifyMember(request);

    if (!auth.success) {

      return NextResponse.json(
        auth,
        {
          status: 401,
        }
      );

    }

    // Connect Database

    await connectDB();

    // Read Form Data

    const formData = await request.formData();

    const photo = formData.get("photo");

    if (!photo) {

      return NextResponse.json(

        {

          success: false,

          message: "Please select a photo.",

        },

        {

          status: 400,

        }

      );

    }

    // Upload New Photo

    const photoUrl = await uploadImageToCloudinary(

      photo,

      "ailp/members",

      auth.memberId

    );

    // Find Member

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

    // Save New Photo

    member.photo = photoUrl;

    await member.save();

    return NextResponse.json({

      success: true,

      message: "Profile photo updated successfully.",

      photo: photoUrl,

    });

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