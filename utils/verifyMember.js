/* ==========================================================
   Verify Member
========================================================== */

import jwt from "jsonwebtoken";

export default function verifyMember(request) {

  try {

const token = request.cookies.get("memberToken")?.value;

console.log("Token Exists:", !!token);

    if (!token) {

      return {

        success: false,

        message: "Please login first.",

      };

    }

    const decoded = jwt.verify(

      token,

      process.env.JWT_SECRET

    );

    console.log("Decoded Token:", decoded);

    return {

      success: true,

      memberId: decoded.memberId,

    };

  }

  catch (error) {

    console.error("JWT Verify Error:", error);

    return {

      success: false,

      message: "Session expired. Please login again.",

    };

  }

}