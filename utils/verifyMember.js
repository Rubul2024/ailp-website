/* ==========================================================
   Verify Member session cookie
========================================================== */

import jwt from "jsonwebtoken";

export default function verifyMember(request) {
  const token = request.cookies.get("memberToken")?.value;

  if (!token) {
    return { success: false, message: "Please login first." };
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const memberId = decoded.memberId || decoded.id || decoded._id;

    if (!memberId) {
      return { success: false, message: "Session expired. Please login again." };
    }

    return { success: true, memberId };
  } catch {
    return { success: false, message: "Session expired. Please login again." };
  }
}
