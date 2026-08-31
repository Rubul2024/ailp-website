/* ==========================================================
   Public Donation Settings API (Dynamic, Real-time)
========================================================== */
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import DonationSetting from "@/models/DonationSetting";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    await connectDB();
    const settings = await DonationSetting.findOne().lean();

    return NextResponse.json(
      {
        success: true,
        settings: settings || null,
      },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      }
    );
  } catch (error) {
    console.error("Public Donation Settings Error:", error);
    return NextResponse.json(
      { success: false, message: "Unable to load donation details" },
      { status: 500 }
    );
  }
}