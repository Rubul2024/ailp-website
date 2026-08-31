/* ==========================================================
   Admin Profile & Password Update API (Production Fix)
========================================================== */
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/mongodb";
import verifyAdmin from "@/lib/verifyAdmin";
import Admin from "@/models/Admin";

export const dynamic = "force-dynamic";

/* ==========================================
   GET: Current Admin Details
========================================== */
export async function GET(request) {
  try {
    const auth = verifyAdmin(request);
    if (!auth.success) {
      return NextResponse.json({ success: false, message: auth.message }, { status: 401 });
    }

    await connectDB();
    const admin = await Admin.findById(auth.admin.adminId).select("-password").lean();

    if (!admin) {
      return NextResponse.json({ success: false, message: "Account not found." }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      admin,
    });
  } catch (error) {
    console.error("Admin Profile GET Error:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}

/* ==========================================
   PATCH: Update Profile Info or Password
========================================== */
export async function PATCH(request) {
  try {
    const auth = verifyAdmin(request);
    if (!auth.success) {
      return NextResponse.json({ success: false, message: auth.message }, { status: 401 });
    }

    await connectDB();
    const body = await request.json();
    const { action, name, mobile, avatar, currentPassword, newPassword } = body;

    // Explicitly include +password so bcrypt has a valid hash to compare
    const admin = await Admin.findById(auth.admin.adminId).select("+password");
    if (!admin) {
      return NextResponse.json({ success: false, message: "Administrator account not found." }, { status: 404 });
    }

    // Action 1: Change Password
    if (action === "CHANGE_PASSWORD") {
      if (!currentPassword || !newPassword) {
        return NextResponse.json(
          { success: false, message: "Please provide both current and new passwords." },
          { status: 400 }
        );
      }

      if (newPassword.length < 6) {
        return NextResponse.json(
          { success: false, message: "New password must be at least 6 characters long." },
          { status: 400 }
        );
      }

      if (!admin.password) {
        return NextResponse.json(
          { success: false, message: "Stored password hash missing from database." },
          { status: 500 }
        );
      }

      // Safe Bcrypt Compare
      const isMatch = await bcrypt.compare(String(currentPassword), String(admin.password));
      if (!isMatch) {
        return NextResponse.json(
          { success: false, message: "Incorrect current password. Please verify and try again." },
          { status: 400 }
        );
      }

      // Hash & Save New Password
      const salt = await bcrypt.genSalt(10);
      admin.password = await bcrypt.hash(newPassword, salt);
      await admin.save();

      return NextResponse.json({
        success: true,
        message: "Password updated successfully!",
      });
    }

    // Action 2: Update Profile Details
    if (name) admin.name = name.trim();
    if (mobile !== undefined) admin.mobile = mobile.trim();
    if (avatar !== undefined) admin.avatar = avatar;

    await admin.save();

    return NextResponse.json({
      success: true,
      message: "Administrator profile updated successfully.",
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        mobile: admin.mobile,
        avatar: admin.avatar,
        role: admin.role,
        isActive: admin.isActive,
      },
    });
  } catch (error) {
    console.error("Admin Profile PATCH Error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to update profile." },
      { status: 500 }
    );
  }
}