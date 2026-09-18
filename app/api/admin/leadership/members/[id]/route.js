/* ==========================================================
   Admin Leadership Member Update API
========================================================== */
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import verifyAdmin from "@/lib/verifyAdmin";
import LeadershipMember from "@/models/LeadershipMember";
import uploadImageToCloudinary from "@/utils/uploadImageToCloudinary";

export async function PUT(request, { params }) {
  try {
    const auth = verifyAdmin(request);
    if (!auth.success) {
      return NextResponse.json({ success: false, message: auth.message }, { status: 401 });
    }

    await connectDB();

    const { id } = await params;
    const existing = await LeadershipMember.findById(id);
    if (!existing) {
      return NextResponse.json(
        { success: false, message: "Leadership member not found." },
        { status: 404 }
      );
    }

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

    let finalPhoto = existing.photo;
    if (photo !== undefined) {
      if (typeof photo === "string" && photo.startsWith("data:image")) {
        const uploaded = await uploadImageToCloudinary(
          photo,
          "ailp/leadership",
          `leadership_member_${id}`
        );
        finalPhoto = uploaded.url;
      } else {
        finalPhoto = photo || "";
      }
    }

    const updated = await LeadershipMember.findByIdAndUpdate(
      id,
      {
        $set: {
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
        },
      },
      { new: true }
    );

    return NextResponse.json({
      success: true,
      message: "Leadership member updated successfully!",
      member: updated,
    });
  } catch (error) {
    console.error("Leadership Member PUT Error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to update leadership member." },
      { status: 500 }
    );
  }
}
