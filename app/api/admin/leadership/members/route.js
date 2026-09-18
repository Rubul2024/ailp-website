/* ==========================================================
   Admin Leadership Members API
========================================================== */
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import verifyAdmin from "@/lib/verifyAdmin";
import LeadershipMember from "@/models/LeadershipMember";
import uploadImageToCloudinary from "@/utils/uploadImageToCloudinary";

export async function GET(request) {
  try {
    const auth = verifyAdmin(request);
    if (!auth.success) {
      return NextResponse.json({ success: false, message: auth.message }, { status: 401 });
    }

    await connectDB();
    const members = await LeadershipMember.find().sort({ order: 1, createdAt: 1 });

    return NextResponse.json({ success: true, members });
  } catch (error) {
    console.error("Leadership Members GET Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const auth = verifyAdmin(request);
    if (!auth.success) {
      return NextResponse.json({ success: false, message: auth.message }, { status: 401 });
    }

    await connectDB();

    const body = await request.json();
    const {
      name,
      designation,
      photo,
      description,
      profileUrl,
      order,
      showOnHome,
      showOnLeadershipPage,
      socials,
    } = body;

    if (!name || !name.trim()) {
      return NextResponse.json(
        { success: false, message: "Member name is required." },
        { status: 400 }
      );
    }

    let finalPhoto = "";
    if (photo) {
      if (typeof photo === "string" && photo.startsWith("data:image")) {
        const uploaded = await uploadImageToCloudinary(
          photo,
          "ailp/leadership",
          `leadership_member_${Date.now()}`
        );
        finalPhoto = uploaded.url;
      } else {
        finalPhoto = String(photo);
      }
    }

    const member = await LeadershipMember.create({
      name: name.trim(),
      designation: designation ? designation.trim() : "",
      photo: finalPhoto,
      description: description ? description.trim() : "",
      profileUrl: profileUrl ? profileUrl.trim() : "",
      order: Number.isFinite(Number(order)) ? Number(order) : 0,
      showOnHome: showOnHome !== undefined ? Boolean(showOnHome) : true,
      showOnLeadershipPage: showOnLeadershipPage !== undefined ? Boolean(showOnLeadershipPage) : true,
      socials: {
        facebook: socials?.facebook || "",
        twitter: socials?.twitter || "",
        instagram: socials?.instagram || "",
        linkedin: socials?.linkedin || "",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Leadership member added successfully!",
      member,
    });
  } catch (error) {
    console.error("Leadership Members POST Error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to add leadership member." },
      { status: 500 }
    );
  }
}
