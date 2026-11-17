/* ==========================================================
   Member session cookie — shared by login and registration
========================================================== */

import jwt from "jsonwebtoken";

const DAY = 60 * 60 * 24;

/** Sign a member session and attach it to `response` as an HTTP-only cookie. */
export function setMemberSession(response, member, { remember = false } = {}) {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not configured.");
  }

  const maxAge = remember ? 30 * DAY : 7 * DAY;
  const token = jwt.sign({ memberId: member._id, email: member.email }, process.env.JWT_SECRET, {
    expiresIn: maxAge,
  });

  response.cookies.set("memberToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge,
  });

  return response;
}
