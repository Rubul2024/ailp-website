/* ==========================================================
   Health Check API
   Reports whether each backing service is reachable /
   configured. Only yes/no values — never secrets or
   error details.
========================================================== */

import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import { missingCloudinaryEnv } from "@/lib/cloudinary";

export const dynamic = "force-dynamic";

export async function GET() {
  let database = false;
  try {
    await connectDB();
    database = true;
  } catch (error) {
    console.error("Health check: database unavailable:", error);
  }

  const services = {
    database,
    photoStorage: missingCloudinaryEnv().length === 0,
    sessions: Boolean(process.env.JWT_SECRET),
  };

  const healthy = Object.values(services).every(Boolean);

  return NextResponse.json(
    {
      success: healthy,
      message: healthy ? "All services are configured." : "Some services are not configured.",
      services,
    },
    { status: healthy ? 200 : 503, headers: { "Cache-Control": "no-store" } }
  );
}
