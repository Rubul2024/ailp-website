/* ==========================================================
   Change Member Password API
========================================================== */

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import connectDB from "@/lib/mongodb";
import Member from "@/models/Member";
import verifyMember from "@/utils/verifyMember";

export async function PUT(request) {

  try {

    // Check Login

    const auth = verifyMember(request);

    if (!auth.success) {

      return NextResponse.json(auth, {
        status: 401,
      });

    }

    // Connect Database

    await connectDB();

    // Read Data

    const {

      currentPassword,

      newPassword,

    } = await request.json();

    // Find Member

    const member = await Member.findById(auth.memberId);

    if (!member) {

      return NextResponse.json({

        success: false,

        message: "Member not found."

      }, {

        status: 404

      });

    }

    // Verify Current Password

    const passwordMatched = await bcrypt.compare(

      currentPassword,

      member.password

    );

    if (!passwordMatched) {

      return NextResponse.json({

        success: false,

        message: "Current password is incorrect."

      }, {

        status: 400

      });

    }

    // Hash New Password

    const hashedPassword = await bcrypt.hash(

      newPassword,

      12

    );

    // Save Password

    member.password = hashedPassword;

    await member.save();

    return NextResponse.json({

      success: true,

      message: "Password changed successfully."

    });

  }

  catch (error) {

    console.error(error);

    return NextResponse.json({

      success: false,

      message: "Server Error"

    }, {

      status: 500

    });

  }

}