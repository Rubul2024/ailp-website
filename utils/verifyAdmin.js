/* ==========================================================
   Verify Admin Authentication
========================================================== */

import jwt from "jsonwebtoken";

export default function verifyAdmin(request) {
  try {
    const token = request.cookies.get("adminToken")?.value;

    if (!token) {
      return {
        success: false,

        status: 401,

        message: "Please login as Admin.",
      };
    }

    const decoded = jwt.verify(
      token,

      process.env.JWT_SECRET,
    );

    return {
      success: true,

      admin: {
        id: decoded.adminId,

        email: decoded.email,

        role: decoded.role,
      },
    };
  } catch {
    return {
      success: false,

      status: 401,

      message: "Admin session expired. Please login again.",
    };
  }
}
