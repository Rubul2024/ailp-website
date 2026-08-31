/* ==========================================================
   Verify Admin JWT Helper (Production Grade)
   Supports Super Admin & Admin Roles
========================================================== */
import jwt from "jsonwebtoken";

export default function verifyAdmin(request) {
  try {
    const token = request.cookies.get("adminToken")?.value;

    if (!token) {
      return {
        success: false,
        message: "Authentication token missing. Please sign in.",
      };
    }

    if (!process.env.JWT_SECRET) {
      console.error("FATAL: JWT_SECRET environment variable is missing.");
      return {
        success: false,
        message: "Server configuration error.",
      };
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.adminId) {
      return {
        success: false,
        message: "Malformed administrator token.",
      };
    }

    const allowedRoles = ["admin", "super-admin"];
    if (!allowedRoles.includes(decoded.role)) {
      return {
        success: false,
        message: "Access restricted: Insufficient administrator permissions.",
      };
    }

    return {
      success: true,
      admin: decoded,
    };
  } catch (error) {
    return {
      success: false,
      message: error.name === "TokenExpiredError" ? "Session expired. Please log in again." : "Invalid credentials.",
    };
  }
}