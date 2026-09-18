/* ==========================================================
   Public Leadership API (Dynamic, Real-time)
========================================================== */
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import LeadershipSettings from "@/models/LeadershipSettings";
import LeadershipMember from "@/models/LeadershipMember";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    await connectDB();

    const [settings, members] = await Promise.all([
      LeadershipSettings.findOne().lean(),
      LeadershipMember.find().sort({ order: 1, createdAt: 1 }).lean(),
    ]);

    return NextResponse.json(
      {
        success: true,
        settings: settings || null,
        members: members || [],
      },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      }
    );
  } catch (error) {
    console.error("Public Leadership API Error:", error);
    return NextResponse.json(
      { success: false, message: "Unable to load leadership details" },
      { status: 500 }
    );
  }
}
