import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      success: false,
      message:
        "Online payment is temporarily unavailable. Please use the available donation methods.",
    },
    { status: 503 }
  );
}