/* ==========================================================
   Verify Admin JWT
========================================================== */

import jwt from "jsonwebtoken";

export default function verifyAdmin(request) {
  try {
    const token = request.cookies.get("adminToken")?.value;

    if (!token) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    if (!process.env.JWT_SECRET) {
      return {
        success: false,
        message: "JWT Secret Missing",
      };
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    if (decoded.role !== "admin") {
      return {
        success: false,
        message: "Access Denied",
      };
    }

    return {
      success: true,
      admin: decoded,
    };
  } catch (error) {
    return {
      success: false,
      message: "Invalid or Expired Token",
    };
  }
}