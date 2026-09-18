/* ==========================================================
   Admin Leadership Member Delete API
========================================================== */
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import verifyAdmin from "@/lib/verifyAdmin";
import LeadershipMember from "@/models/LeadershipMember";

export async function DELETE(request, { params }) {
  try {
    const auth = verifyAdmin(request);
    if (!auth.success) {
      return NextResponse.json({ success: false, message: auth.message }, { status: 401 });
    }

    await connectDB();

    const member = await LeadershipMember.findById(params.id);
    if (!member) {
      return NextResponse.json(
        { success: false, message: "Leadership member not found." },
        { status: 404 }
      );
    }

    await LeadershipMember.findByIdAndDelete(params.id);

    return NextResponse.json({
      success: true,
      message: "Leadership member deleted successfully.",
    });
  } catch (error) {
    console.error("Leadership Member DELETE Error:", error);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}
