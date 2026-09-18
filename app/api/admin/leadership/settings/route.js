/* ==========================================================
   Admin Leadership Settings API
   Hero image, National President spotlight & stats
========================================================== */
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import verifyAdmin from "@/lib/verifyAdmin";
import LeadershipSettings from "@/models/LeadershipSettings";
import uploadImageToCloudinary from "@/utils/uploadImageToCloudinary";

async function resolveImage(value, publicId) {
  if (!value) return "";

  if (typeof value === "string" && value.startsWith("data:image")) {
    const uploaded = await uploadImageToCloudinary(value, "ailp/leadership", publicId);
    return uploaded.url;
  }

  return String(value);
}

export async function GET(request) {
  try {
    const auth = verifyAdmin(request);
    if (!auth.success) {
      return NextResponse.json({ success: false, message: auth.message }, { status: 401 });
    }

    await connectDB();
    const settings = await LeadershipSettings.findOne().lean();

    return NextResponse.json({ success: true, settings: settings || null });
  } catch (error) {
    console.error("Leadership Settings GET Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const auth = verifyAdmin(request);
    if (!auth.success) {
      return NextResponse.json({ success: false, message: auth.message }, { status: 401 });
    }

    await connectDB();

    const body = await request.json();
    const {
      heroImage,
      presidentName,
      presidentDesignation,
      presidentBadge,
      presidentPhoto,
      presidentBio1,
      presidentBio2,
      presidentQuote,
      presidentSignatureTitle,
      presidentSignatureOrg,
      statPresidentCount,
      statStatesRepresented,
      statDistricts,
    } = body;

    const [finalHeroImage, finalPresidentPhoto] = await Promise.all([
      resolveImage(heroImage, "leadership_hero"),
      resolveImage(presidentPhoto, "leadership_president"),
    ]);

    const updated = await LeadershipSettings.findOneAndUpdate(
      {},
      {
        $set: {
          heroImage: finalHeroImage,
          presidentName: presidentName ? presidentName.trim() : "",
          presidentDesignation: presidentDesignation ? presidentDesignation.trim() : "National President",
          presidentBadge: presidentBadge ? presidentBadge.trim() : "NATIONAL PRESIDENT",
          presidentPhoto: finalPresidentPhoto,
          presidentBio1: presidentBio1 ? presidentBio1.trim() : "",
          presidentBio2: presidentBio2 ? presidentBio2.trim() : "",
          presidentQuote: presidentQuote ? presidentQuote.trim() : "",
          presidentSignatureTitle: presidentSignatureTitle ? presidentSignatureTitle.trim() : "National President",
          presidentSignatureOrg: presidentSignatureOrg ? presidentSignatureOrg.trim() : "All India Labour Party",
          statPresidentCount: statPresidentCount ? statPresidentCount.trim() : "01",
          statStatesRepresented: statStatesRepresented ? statStatesRepresented.trim() : "20+",
          statDistricts: statDistricts ? statDistricts.trim() : "50+",
        },
      },
      { upsert: true, new: true }
    );

    return NextResponse.json({
      success: true,
      message: "Leadership settings updated successfully!",
      settings: updated,
    });
  } catch (error) {
    console.error("Leadership Settings PUT Error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to update leadership settings." },
      { status: 500 }
    );
  }
}
